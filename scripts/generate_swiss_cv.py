from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageOps
from docx import Document
from docx.enum.section import WD_SECTION
from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT, WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK, WD_LINE_SPACING
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Inches, Pt, RGBColor
from reportlab.graphics.barcode import qr


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "output" / "cv"
ASSET_DIR = OUT_DIR / "assets"
PORTRAIT_SOURCE = ROOT / "public" / "myHeroPortrait.jpg"
PORTFOLIO_URL = "https://viktoryevtushenko.com"

FONT = "Aptos"
INK = "17202A"
MUTED = "53606D"
ACCENT = "006B6B"
LIGHT = "E7EEEE"
LINE = "D9E0E3"
WHITE = "FFFFFF"


def rgb(hex_value: str) -> RGBColor:
    return RGBColor.from_string(hex_value)


def set_cell_shading(cell, fill: str) -> None:
    tc_pr = cell._tc.get_or_add_tcPr()
    shd = tc_pr.find(qn("w:shd"))
    if shd is None:
        shd = OxmlElement("w:shd")
        tc_pr.append(shd)
    shd.set(qn("w:fill"), fill)


def set_cell_border(cell, **edges) -> None:
    tc_pr = cell._tc.get_or_add_tcPr()
    tc_borders = tc_pr.first_child_found_in("w:tcBorders")
    if tc_borders is None:
        tc_borders = OxmlElement("w:tcBorders")
        tc_pr.append(tc_borders)
    for edge_name, edge in edges.items():
        tag = f"w:{edge_name}"
        element = tc_borders.find(qn(tag))
        if element is None:
            element = OxmlElement(tag)
            tc_borders.append(element)
        for key, value in edge.items():
            element.set(qn(f"w:{key}"), str(value))


def set_cell_margins(cell, top=90, start=100, bottom=90, end=100) -> None:
    tc = cell._tc
    tc_pr = tc.get_or_add_tcPr()
    tc_mar = tc_pr.first_child_found_in("w:tcMar")
    if tc_mar is None:
        tc_mar = OxmlElement("w:tcMar")
        tc_pr.append(tc_mar)
    for margin, value in (("top", top), ("start", start), ("bottom", bottom), ("end", end)):
        element = tc_mar.find(qn(f"w:{margin}"))
        if element is None:
            element = OxmlElement(f"w:{margin}")
            tc_mar.append(element)
        element.set(qn("w:w"), str(value))
        element.set(qn("w:type"), "dxa")


def set_repeat_table_header(row) -> None:
    tr_pr = row._tr.get_or_add_trPr()
    tbl_header = OxmlElement("w:tblHeader")
    tbl_header.set(qn("w:val"), "true")
    tr_pr.append(tbl_header)


def set_table_fixed_layout(table) -> None:
    tbl_pr = table._tbl.tblPr
    layout = tbl_pr.find(qn("w:tblLayout"))
    if layout is None:
        layout = OxmlElement("w:tblLayout")
        tbl_pr.append(layout)
    layout.set(qn("w:type"), "fixed")


def set_no_split(paragraph) -> None:
    paragraph.paragraph_format.keep_together = True
    paragraph.paragraph_format.widow_control = True


def add_hyperlink(paragraph, text: str, url: str, color: str = ACCENT, underline: bool = False):
    part = paragraph.part
    relationship_id = part.relate_to(
        url,
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
        is_external=True,
    )
    hyperlink = OxmlElement("w:hyperlink")
    hyperlink.set(qn("r:id"), relationship_id)
    run = OxmlElement("w:r")
    run_properties = OxmlElement("w:rPr")
    color_element = OxmlElement("w:color")
    color_element.set(qn("w:val"), color)
    run_properties.append(color_element)
    if underline:
        underline_element = OxmlElement("w:u")
        underline_element.set(qn("w:val"), "single")
        run_properties.append(underline_element)
    run.append(run_properties)
    text_element = OxmlElement("w:t")
    text_element.text = text
    run.append(text_element)
    hyperlink.append(run)
    paragraph._p.append(hyperlink)
    return hyperlink


def configure_document(document: Document, title: str) -> None:
    section = document.sections[0]
    section.page_width = Cm(21)
    section.page_height = Cm(29.7)
    section.top_margin = Cm(1.25)
    section.bottom_margin = Cm(1.15)
    section.left_margin = Cm(1.4)
    section.right_margin = Cm(1.4)
    section.header_distance = Cm(0.4)
    section.footer_distance = Cm(0.45)

    styles = document.styles
    normal = styles["Normal"]
    normal.font.name = FONT
    normal.font.size = Pt(9.3)
    normal.font.color.rgb = rgb(INK)
    normal.paragraph_format.space_after = Pt(2.6)
    normal.paragraph_format.line_spacing = 1.04

    title_style = styles["Title"]
    title_style.font.name = FONT
    title_style.font.size = Pt(25)
    title_style.font.bold = True
    title_style.font.color.rgb = rgb(INK)
    title_style.paragraph_format.space_after = Pt(2)

    for name, size, before, after in (
        ("Heading 1", 12.5, 7.5, 3.5),
        ("Heading 2", 10.5, 4.5, 1.6),
    ):
        style = styles[name]
        style.font.name = FONT
        style.font.size = Pt(size)
        style.font.bold = True
        style.font.color.rgb = rgb(INK)
        style.paragraph_format.space_before = Pt(before)
        style.paragraph_format.space_after = Pt(after)
        style.paragraph_format.keep_with_next = True

    document.core_properties.title = title
    document.core_properties.subject = "Lebenslauf für den Schweizer Arbeitsmarkt"
    document.core_properties.author = "Viktor Yevtushenko"
    document.core_properties.keywords = "iOS, Swift, Precision Engineering, Universität Bern, Schweiz"

    footer = section.footer.paragraphs[0]
    footer.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = footer.add_run("Viktor Yevtushenko  |  viktoryevtushenko.com")
    run.font.name = FONT
    run.font.size = Pt(7.5)
    run.font.color.rgb = rgb(MUTED)


def add_section_heading(document: Document, text: str) -> None:
    paragraph = document.add_paragraph(style="Heading 1")
    paragraph.paragraph_format.keep_with_next = True
    run = paragraph.add_run(text.upper())
    run.font.color.rgb = rgb(INK)

    p_pr = paragraph._p.get_or_add_pPr()
    borders = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), "8")
    bottom.set(qn("w:space"), "3")
    bottom.set(qn("w:color"), ACCENT)
    borders.append(bottom)
    p_pr.append(borders)


def add_role(document: Document, period: str, role: str, place: str, bullets: list[str]) -> None:
    table = document.add_table(rows=1, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    set_table_fixed_layout(table)
    table.columns[0].width = Cm(3.0)
    table.columns[1].width = Cm(14.9)
    left, right = table.rows[0].cells
    left.width = Cm(3.0)
    right.width = Cm(14.9)
    left.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.TOP
    right.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.TOP
    for cell in (left, right):
        set_cell_margins(cell, top=40, start=50, bottom=35, end=80)
        set_cell_border(
            cell,
            top={"val": "single", "sz": "4", "color": LINE},
            bottom={"val": "single", "sz": "4", "color": LINE},
            start={"val": "single", "sz": "4", "color": LINE},
            end={"val": "single", "sz": "4", "color": LINE},
            insideH={"val": "single", "sz": "4", "color": LINE},
            insideV={"val": "single", "sz": "4", "color": LINE},
        )

    p = left.paragraphs[0]
    p.paragraph_format.space_after = Pt(0)
    r = p.add_run(period)
    r.bold = True
    r.font.size = Pt(8.4)
    r.font.color.rgb = rgb(ACCENT)

    p = right.paragraphs[0]
    p.paragraph_format.space_after = Pt(0.5)
    p.paragraph_format.keep_with_next = True
    r = p.add_run(role)
    r.bold = True
    r.font.size = Pt(9.6)
    r.font.color.rgb = rgb(INK)
    r2 = p.add_run(f"  |  {place}")
    r2.font.size = Pt(8.8)
    r2.font.color.rgb = rgb(MUTED)

    for bullet in bullets:
        p = right.add_paragraph(style="Normal")
        p.paragraph_format.left_indent = Cm(0.35)
        p.paragraph_format.first_line_indent = Cm(-0.25)
        p.paragraph_format.space_after = Pt(0.7)
        p.paragraph_format.line_spacing = 1.0
        r = p.add_run("• ")
        r.font.color.rgb = rgb(ACCENT)
        p.add_run(bullet)


def add_compact_entry(document: Document, period: str, title: str, place: str, detail: str | None = None) -> None:
    p = document.add_paragraph(style="Normal")
    p.paragraph_format.space_after = Pt(1.3)
    p.paragraph_format.keep_together = True
    r = p.add_run(period)
    r.bold = True
    r.font.color.rgb = rgb(ACCENT)
    r = p.add_run(f"   {title}")
    r.bold = True
    r = p.add_run(f"  |  {place}")
    r.font.color.rgb = rgb(MUTED)
    if detail:
        p.add_run(f"\n{detail}")


def add_skill_line(document: Document, label: str, value: str) -> None:
    p = document.add_paragraph(style="Normal")
    p.paragraph_format.space_after = Pt(1.2)
    p.paragraph_format.keep_together = True
    r = p.add_run(f"{label}: ")
    r.bold = True
    r.font.color.rgb = rgb(INK)
    p.add_run(value)


def make_portrait() -> Path:
    ASSET_DIR.mkdir(parents=True, exist_ok=True)
    target = ASSET_DIR / "portrait_cv.png"
    with Image.open(PORTRAIT_SOURCE) as source:
        image = ImageOps.exif_transpose(source).convert("RGB")
        width, height = image.size
        # Crop around the head and upper torso; the original has substantial empty space above.
        left = int(width * 0.25)
        right = int(width * 0.75)
        top = int(height * 0.34)
        bottom = int(height * 0.82)
        crop = image.crop((left, top, right, bottom))
        crop = ImageOps.fit(crop, (720, 860), method=Image.Resampling.LANCZOS, centering=(0.5, 0.43))
        crop.save(target, quality=95)
    return target


def make_qr() -> Path:
    ASSET_DIR.mkdir(parents=True, exist_ok=True)
    target = ASSET_DIR / "portfolio_qr.png"
    widget = qr.QrCodeWidget(PORTFOLIO_URL)
    widget.qr.make()
    matrix = widget.qr.modules
    module_count = len(matrix)
    quiet_zone = 4
    module_size = 16
    canvas_size = (module_count + 2 * quiet_zone) * module_size
    image = Image.new("RGB", (canvas_size, canvas_size), "white")
    draw = ImageDraw.Draw(image)
    for row_index, row in enumerate(matrix):
        for column_index, enabled in enumerate(row):
            if not enabled:
                continue
            x0 = (column_index + quiet_zone) * module_size
            y0 = (row_index + quiet_zone) * module_size
            draw.rectangle(
                (x0, y0, x0 + module_size - 1, y0 + module_size - 1),
                fill="black",
            )
    image.save(target, dpi=(300, 300))
    return target


def create_cv(portrait: Path, qr_path: Path) -> Path:
    document = Document()
    configure_document(document, "Lebenslauf Viktor Yevtushenko")

    header = document.add_table(rows=1, cols=3)
    header.alignment = WD_TABLE_ALIGNMENT.CENTER
    header.autofit = False
    set_table_fixed_layout(header)
    widths = [Cm(12.2), Cm(3.1), Cm(2.6)]
    for index, (cell, width) in enumerate(zip(header.rows[0].cells, widths)):
        cell.width = width
        cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
        set_cell_margins(cell, top=80, start=90, bottom=80, end=90)
        set_cell_border(
            cell,
            top={"val": "single", "sz": "4", "color": LINE},
            bottom={"val": "single", "sz": "6", "color": ACCENT},
            start={"val": "single", "sz": "4", "color": LINE},
            end={"val": "single", "sz": "4", "color": LINE},
            insideH={"val": "single", "sz": "4", "color": LINE},
            insideV={"val": "single", "sz": "4", "color": LINE},
        )
    name_cell, photo_cell, qr_cell = header.rows[0].cells

    p = name_cell.paragraphs[0]
    p.style = document.styles["Title"]
    p.add_run("Viktor Yevtushenko")
    p = name_cell.add_paragraph()
    p.paragraph_format.space_after = Pt(5)
    r = p.add_run("iOS Software Engineer  |  Student Precision Engineering")
    r.bold = True
    r.font.size = Pt(10.5)
    r.font.color.rgb = rgb(ACCENT)

    for text in (
        "Bern / Biel, Schweiz   |   +41 79 477 77 64",
        "yevtushenkoviktor26@gmail.com",
    ):
        p = name_cell.add_paragraph()
        p.paragraph_format.space_after = Pt(1)
        p.add_run(text)
    p = name_cell.add_paragraph()
    p.paragraph_format.space_after = Pt(0)
    add_hyperlink(p, "linkedin.com/in/viktor-yevtushenko", "https://www.linkedin.com/in/viktor-yevtushenko")
    p.add_run("   |   ")
    add_hyperlink(p, "github.com/YevtushenkoViktorI", "https://github.com/YevtushenkoViktorI")

    p = photo_cell.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    portrait_shape = p.add_run().add_picture(str(portrait), width=Cm(2.65), height=Cm(3.17))
    portrait_shape._inline.docPr.set("title", "Portrait Viktor Yevtushenko")
    portrait_shape._inline.docPr.set("descr", "Portrait of Viktor Yevtushenko")

    p = qr_cell.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    qr_shape = p.add_run().add_picture(str(qr_path), width=Cm(2.05), height=Cm(2.05))
    qr_shape._inline.docPr.set("title", "Portfolio QR Code")
    qr_shape._inline.docPr.set("descr", "QR code linking to viktoryevtushenko.com")
    p = qr_cell.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_after = Pt(0)
    r = p.add_run("Portfolio")
    r.bold = True
    r.font.size = Pt(8)
    r.font.color.rgb = rgb(ACCENT)

    add_section_heading(document, "Profil")
    p = document.add_paragraph()
    p.paragraph_format.space_after = Pt(3)
    p.add_run(
        "iOS/macOS-Entwickler mit mehr als fünf Jahren Erfahrung in kommerziellen Apps, SDKs und "
        "MVP-Produkten. Verbindet Swift, SwiftUI, UIKit, Firebase, Echtzeitkommunikation und saubere "
        "Architektur mit einem technischen Hintergrund in Mikro- und Nanoelektronik. Seit 2026 Studium "
        "Precision Engineering an der Universität Bern. Offen für Festanstellungen, Trainee- und "
        "Praktikumsrollen in Software, Elektronik und technischen Entwicklungsteams."
    )

    add_section_heading(document, "Kernkompetenzen")
    skills = document.add_table(rows=2, cols=2)
    skills.alignment = WD_TABLE_ALIGNMENT.CENTER
    skills.autofit = False
    set_table_fixed_layout(skills)
    skill_items = [
        ("iOS", "Swift, SwiftUI, UIKit, Objective-C, Core Data, SPM"),
        ("Architektur", "MVVM, MVC, MVP, VIPER, modulare Systeme, Clean Code"),
        ("Cloud und Realtime", "Firebase, REST, GraphQL, WebSockets, Push, Twilio, Agora"),
        ("Engineering", "Embedded Systems, Elektronik, Vakuumtechnik, Telekom, Messtechnik"),
    ]
    for index, (label, value) in enumerate(skill_items):
        row = index // 2
        col = index % 2
        cell = skills.rows[row].cells[col]
        cell.width = Cm(8.95)
        cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
        set_cell_shading(cell, "F7F9F9" if index % 2 == 0 else WHITE)
        set_cell_margins(cell, top=80, start=100, bottom=80, end=100)
        set_cell_border(
            cell,
            top={"val": "single", "sz": "4", "color": LINE},
            bottom={"val": "single", "sz": "4", "color": LINE},
            start={"val": "single", "sz": "4", "color": LINE},
            end={"val": "single", "sz": "4", "color": LINE},
        )
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(0)
        r = p.add_run(f"{label}\n")
        r.bold = True
        r.font.color.rgb = rgb(ACCENT)
        r = p.add_run(value)
        r.font.size = Pt(8.6)

    add_section_heading(document, "Berufserfahrung")
    add_role(
        document,
        "07/2018 - 06/2023",
        "iOS Developer",
        "Freelance / Remote",
        [
            "Entwicklung und Wartung produktiver iOS-Anwendungen mit Swift, SwiftUI und UIKit für internationale Projekte.",
            "Aufbau modularer App-Architekturen, eigener Networking-Layer sowie REST- und GraphQL-Integrationen.",
            "Umsetzung von Echtzeit-Video und -Audio, Push-Nachrichten, Abonnements, Apple Pay sowie Deep und Universal Links.",
            "Entwicklung des wiederverwendbaren JOIN Stories iOS SDK und Integration komplexer Medien-, Kamera-, AR- und 3D-Funktionen.",
            "Optimierung von Performance, Stabilität und Wartbarkeit sowie Begleitung von App-Store-Releases.",
        ],
    )
    add_role(
        document,
        "07/2023 - 11/2024",
        "Freiwilliger Mitarbeiter Flüchtlingsunterstützung",
        "Bern, Schweiz",
        [
            "Unterstützung des täglichen Betriebs und der Kommunikation in einem Flüchtlingszentrum.",
            "Zuverlässige Zusammenarbeit in einem interkulturellen Umfeld während der beruflichen Integration in der Schweiz.",
        ],
    )
    add_role(
        document,
        "2017 - 2018",
        "Industrie- und Höhenmontagetechniker",
        "Polen",
        [
            "Montage, technische Instandhaltung und Arbeiten an Kraftwerksanlagen unter anspruchsvollen Sicherheitsbedingungen.",
        ],
    )
    add_role(
        document,
        "2016 - 2017",
        "Telekom-Installationstechniker und Teamleiter",
        "Ukraine",
        [
            "Installation, Inbetriebnahme und Fehlersuche an Mobilfunk-, Telefon- und Netzwerkinfrastruktur.",
            "Koordination eines Teams von vier Technikern sowie Antennenausrichtung, Kabelspleissen und Anlagenprüfung.",
        ],
    )
    add_role(
        document,
        "2013 - 2016",
        "Labor- und Forschungspraxis Mikro- und Nanoelektronik",
        "Kharkiv, Ukraine",
        [
            "Arbeit mit Vakuumanlagen, CdS-Dünnschichten, Temperaturregelplatinen sowie XRD-, UV-Vis- und STM-Messverfahren.",
        ],
    )

    document.add_page_break()

    add_section_heading(document, "Ausbildung und Weiterbildung")
    add_compact_entry(
        document,
        "Seit 2026",
        "Precision Engineering",
        "Universität Bern, Schweiz",
        "Aktuelles Studium mit Fokus auf vertiefte technische Kenntnisse und praxisnahe Problemlösung.",
    )
    add_compact_entry(
        document,
        "09/2010 - 06/2014",
        "Bachelor of Applied Science, Nanotechnologie",
        'Nationale Technische Universität "Kharkiv Polytechnic Institute", Ukraine',
        "Mikroelektronik, Halbleiterphysik, Werkstoffwissenschaft, Vakuumtechnik und elektronische Systeme.",
    )
    add_compact_entry(
        document,
        "10/2025 - heute",
        "Deutschkurs B1",
        "LernPunkt, Bern",
        "Berufsbezogene Kommunikation für technische und Software-Umgebungen.",
    )
    add_compact_entry(
        document,
        "03/2026 - 04/2026",
        "Business Creation ICT",
        "Innosuisse, Bern / Online",
        "Business Modelling, Marktvalidierung und Entwicklung technologieorientierter Geschäftsideen.",
    )
    add_compact_entry(
        document,
        "08/2025 - 11/2025",
        "Mentoring Program 7th Wave",
        "PowerHubZug, Schweiz",
        "Mentoring, Networking und Positionierung für den Schweizer Engineering- und IT-Arbeitsmarkt.",
    )
    add_compact_entry(
        document,
        "11/2024 - 09/2025",
        "Berufliche Integration und Deutsch",
        "BINplus / ECAP, Bern",
        "Intensives Integrationsprogramm mit beruflicher Orientierung und Sprachförderung.",
    )

    add_section_heading(document, "Ausgewählte Projekte")
    projects = [
        ("JOIN Stories iOS SDK", "Wiederverwendbares, via Swift Package Manager verteiltes Stories-Modul mit flexibler Konfiguration für UIKit und SwiftUI."),
        ("SPL Online", "Mehrsprachige App mit RTL-Unterstützung, Authentifizierung, Apple Maps, ArcGIS sowie Deep und Universal Links."),
        ("Vuable", "AR-basierte Raumaufnahme mit 2D/3D-Grundrissen, Messfunktionen, Raumbenennung und automatischer Flächenberechnung."),
        ("Movement Vault", "Migration zu codebasierter UI, modularisierte Architektur, flexibler Videoplayer und Subscription-Logik."),
        ("Bridgit", "Firebase, Standort- und Presence-Tracking, sichtbare und stille Push-Nachrichten, Apple Pay und Cloud Functions."),
        ("Freespoke und Uncover", "Stabilitäts- und Performance-Verbesserungen, API-Optimierung sowie Weiterentwicklung bestehender Nutzeroberflächen."),
        ("LinguaMoment und SpeakingHub", "Realtime-Kommunikation, Video- und Audio-Streaming sowie Integration von Agora, Twilio und eigenen TURN/STUN-Diensten."),
    ]
    for title, detail in projects:
        p = document.add_paragraph(style="Normal")
        p.paragraph_format.left_indent = Cm(0.35)
        p.paragraph_format.first_line_indent = Cm(-0.25)
        p.paragraph_format.space_after = Pt(1.1)
        r = p.add_run("• ")
        r.font.color.rgb = rgb(ACCENT)
        r = p.add_run(f"{title}: ")
        r.bold = True
        p.add_run(detail)

    add_section_heading(document, "Technische Kenntnisse")
    add_skill_line(document, "Programmiersprachen", "Swift, Objective-C, Assembly für AVR-Mikrocontroller")
    add_skill_line(document, "Apple Plattformen", "iOS, iPadOS, macOS, UIKit, SwiftUI, Core Data, ARKit, SceneKit, RoomPlan, AVFoundation")
    add_skill_line(document, "Backend und Daten", "Firebase, Firestore, Cloud Functions, REST, GraphQL, JSON, XML, URLSession")
    add_skill_line(document, "Qualität und Delivery", "Git, GitHub, SPM, CocoaPods, Unit/UI Testing, CI/CD, Performance-Analyse")
    add_skill_line(document, "Hardware und Labor", "Elektronik, Schaltungsverständnis, Löten, Vakuumsysteme, XRD, UV-Vis, STM")
    add_skill_line(document, "Telekom und Feldtechnik", "Basisstationen, Antennenausrichtung, Kabelspleissen, Fehlersuche, Arbeit in der Höhe")

    add_section_heading(document, "Zertifikate")
    certs = document.add_paragraph()
    certs.paragraph_format.space_after = Pt(1.5)
    certs.add_run("Innosuisse Business Creation ICT (2026)  •  AILM Symposium Volunteer (2026)  •  ")
    certs.add_run("PowerHubZug Mentoring (2025)  •  Huawei Safety Passport (2017)  •  ")
    certs.add_run("Elektrosicherheit bis 1000 V (2016)  •  IRATA Level 1 (2017-2020)")

    add_section_heading(document, "Sprachen und persönliche Angaben")
    details = document.add_table(rows=2, cols=2)
    details.alignment = WD_TABLE_ALIGNMENT.CENTER
    details.autofit = False
    set_table_fixed_layout(details)
    info = [
        ("Sprachen", "Ukrainisch Muttersprache  |  Englisch B2  |  Deutsch B1  |  Polnisch A1"),
        ("Geburtsdatum", "26.06.1993"),
        ("Führerausweis", "Kategorien A, A1, B, B1  |  gültig bis 2047"),
        ("Portfolio", PORTFOLIO_URL),
    ]
    for i, (label, value) in enumerate(info):
        cell = details.rows[i // 2].cells[i % 2]
        cell.width = Cm(8.95)
        set_cell_margins(cell, top=70, start=95, bottom=70, end=95)
        set_cell_border(
            cell,
            top={"val": "single", "sz": "4", "color": LINE},
            bottom={"val": "single", "sz": "4", "color": LINE},
            start={"val": "single", "sz": "4", "color": LINE},
            end={"val": "single", "sz": "4", "color": LINE},
        )
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(0)
        r = p.add_run(f"{label}\n")
        r.bold = True
        r.font.color.rgb = rgb(ACCENT)
        if label == "Portfolio":
            add_hyperlink(p, "viktoryevtushenko.com", value)
        else:
            p.add_run(value)

    path = OUT_DIR / "Viktor_Yevtushenko_CV_DE.docx"
    document.save(path)
    return path


def add_template_heading(document: Document, text: str) -> None:
    paragraph = document.add_paragraph(style="Heading 2")
    paragraph.add_run(text)


def create_application_texts() -> Path:
    document = Document()
    configure_document(document, "Kurzprofile und Bewerbungstexte Viktor Yevtushenko")

    title = document.add_paragraph(style="Title")
    title.add_run("Kurzprofile und Bewerbungstexte")
    p = document.add_paragraph()
    r = p.add_run("Viktor Yevtushenko  |  Schweizer Arbeitsmarkt")
    r.bold = True
    r.font.color.rgb = rgb(ACCENT)
    p = document.add_paragraph()
    p.add_run(
        "Diese Textbausteine sind für Bewerbungen auf konkrete Stellen gedacht. Vor dem Versand müssen "
        "die Angaben in eckigen Klammern ersetzt und zwei bis drei Sätze an die Ausschreibung angepasst werden."
    )

    add_section_heading(document, "Kurzprofile")
    profiles = [
        (
            "iOS Software Engineering",
            "iOS/macOS-Entwickler mit mehr als fünf Jahren Erfahrung in Swift, SwiftUI und UIKit. "
            "Er entwickelt wartbare App-Architekturen, integriert REST- und GraphQL-APIs, Firebase, "
            "Echtzeitkommunikation, Abonnements und AR-Funktionen und begleitet Produkte bis zum App-Store-Release.",
        ),
        (
            "Precision Engineering und technische Entwicklung",
            "Technisch breit aufgestellter Entwickler mit Bachelor in Nanotechnologie und aktuellem Studium "
            "Precision Engineering an der Universität Bern. Erfahrung mit Elektronik, Embedded Systems, "
            "Vakuumtechnik, Messverfahren und Softwareentwicklung ermöglicht eine schnelle Einarbeitung an "
            "der Schnittstelle von Hardware, Daten und digitalen Produkten.",
        ),
        (
            "Telekom und technischer Service",
            "Praxiserfahrener Techniker für Telekommunikations- und Mobilfunkinfrastruktur mit Kenntnissen in "
            "Installation, Inbetriebnahme, Antennenausrichtung, Kabelspleissen und Fehlersuche. Er arbeitet "
            "sicherheitsbewusst, präzise und teamorientiert und hat bereits ein kleines Technikteam koordiniert.",
        ),
    ]
    for heading, text in profiles:
        add_template_heading(document, heading)
        p = document.add_paragraph(text)
        p.paragraph_format.keep_together = True

    add_section_heading(document, "Motivationsbrief iOS Software Engineering")
    ios_letter = [
        "Betreff Bewerbung als [Stellenbezeichnung]",
        "Sehr geehrte Frau [Name] / Sehr geehrter Herr [Name]",
        (
            "Die ausgeschriebene Position als [Stellenbezeichnung] bei [Unternehmen] spricht mich an, weil "
            "[konkreter Bezug zur Aufgabe, zum Produkt oder zur Technologie]. Ich bringe mehr als fünf Jahre "
            "Erfahrung in der Entwicklung produktiver iOS-Anwendungen mit Swift, SwiftUI und UIKit mit."
        ),
        (
            "In meinen bisherigen Projekten habe ich modulare Architekturen aufgebaut, REST- und GraphQL-APIs "
            "integriert und Funktionen mit Firebase, Push-Nachrichten, Echtzeit-Video und -Audio, Abonnements "
            "sowie ARKit umgesetzt. Besonders relevant für Ihre Stelle ist [passendes Projekt oder Beispiel]. "
            "Dabei lege ich Wert auf verständlichen Code, stabile Releases und eine enge Zusammenarbeit mit "
            "Produkt, Design und Backend."
        ),
        (
            "Parallel vertiefe ich meine technische Ausbildung im Studium Precision Engineering an der "
            "Universität Bern. Diese Verbindung aus Softwarepraxis und Engineering-Hintergrund hilft mir, "
            "komplexe Probleme strukturiert und mit hoher Sorgfalt zu lösen."
        ),
        (
            "Gerne erläutere ich Ihnen in einem persönlichen Gespräch, wie ich Ihr Team bei [konkrete Aufgabe] "
            "unterstützen kann. Mein Portfolio finden Sie unter viktoryevtushenko.com."
        ),
        "Freundliche Grüsse\nViktor Yevtushenko",
    ]
    for index, text in enumerate(ios_letter):
        p = document.add_paragraph(text)
        p.paragraph_format.space_after = Pt(4 if index else 7)
        if index == 0:
            p.runs[0].bold = True

    document.add_page_break()
    add_section_heading(document, "Motivationsbrief technische oder Trainee Rolle")
    engineering_letter = [
        "Betreff Bewerbung als [Stellenbezeichnung]",
        "Sehr geehrte Frau [Name] / Sehr geehrter Herr [Name]",
        (
            "Die Position als [Stellenbezeichnung] bei [Unternehmen] interessiert mich, weil sie praktische "
            "Technik, sorgfältige Analyse und kontinuierliches Lernen verbindet. Ich verfüge über einen "
            "Bachelorabschluss in Nanotechnologie und studiere seit 2026 Precision Engineering an der "
            "Universität Bern."
        ),
        (
            "Mein Hintergrund umfasst Mikro- und Nanoelektronik, elektronische Schaltungen, Embedded Systems, "
            "Vakuumanlagen und Materialanalyse. Zusätzlich habe ich mehrere Jahre als Softwareentwickler und "
            "in technischen Feldrollen gearbeitet. Dadurch kann ich mich sowohl in physische Systeme als auch "
            "in digitale Prozesse einarbeiten und technische Zusammenhänge klar dokumentieren."
        ),
        (
            "Für Ihre Stelle bringe ich insbesondere [zwei Anforderungen aus dem Inserat] mit. Ich arbeite "
            "präzise, übernehme Verantwortung und suche eine langfristige Aufgabe, in der ich meine Erfahrung "
            "einbringen und mein Wissen im Schweizer Umfeld weiter ausbauen kann."
        ),
        (
            "Über die Möglichkeit, meine Motivation und Eignung in einem persönlichen Gespräch zu erläutern, "
            "freue ich mich."
        ),
        "Freundliche Grüsse\nViktor Yevtushenko",
    ]
    for index, text in enumerate(engineering_letter):
        p = document.add_paragraph(text)
        p.paragraph_format.space_after = Pt(4 if index else 7)
        if index == 0:
            p.runs[0].bold = True

    add_section_heading(document, "Motivationsbrief Telekom oder technischer Service")
    telecom_letter = [
        "Betreff Bewerbung als [Stellenbezeichnung]",
        "Sehr geehrte Frau [Name] / Sehr geehrter Herr [Name]",
        (
            "Ihre Stelle als [Stellenbezeichnung] hat mein Interesse geweckt, weil ich praktische Erfahrung "
            "mit Telekommunikationsanlagen, Mobilfunktechnik und technischen Installationen mitbringe."
        ),
        (
            "Ich habe Basisstationen und Antennen installiert und geprüft, Kabelverbindungen erstellt, Fehler "
            "in Teilnehmernetzen gesucht und technische Einsätze koordiniert. Als Teamleiter plante ich die "
            "täglichen Aufgaben von vier Technikern. Auch Arbeiten in der Höhe und in sicherheitskritischen "
            "Umgebungen sind mir aus früheren Tätigkeiten vertraut."
        ),
        (
            "Ich arbeite zuverlässig, sicherheitsbewusst und lösungsorientiert. Meine Weiterbildung und mein "
            "aktuelles Studium Precision Engineering an der Universität Bern zeigen, dass ich meine technischen "
            "Kenntnisse aktiv weiterentwickle und langfristig im Schweizer Arbeitsmarkt Fuss fassen möchte."
        ),
        "Ich freue mich auf ein persönliches Gespräch.",
        "Freundliche Grüsse\nViktor Yevtushenko",
    ]
    for index, text in enumerate(telecom_letter):
        p = document.add_paragraph(text)
        p.paragraph_format.space_after = Pt(4 if index else 7)
        if index == 0:
            p.runs[0].bold = True

    add_section_heading(document, "Nützliche Kontakte aus der Studiagenda")
    resource_items = [
        "Studijob Stellenvermittlung SUB: Lenny Krüger, 031 684 35 76, studijob.sub@unibe.ch",
        "SUB Angebote: Studijob, Rechtsberatung, Sozialfonds, Nachhilfeplattform, Womentoring, Konvokurse und Hilfestellungen",
        "Universität Bern Service Desk: 031 684 49 99, servicedesk@unibe.ch, serviceportal.unibe.ch",
        "Alumni UniBE: info.alumni@unibe.ch, www.alumni.unibe.ch",
        "Institut für Sprachwissenschaft: Länggassstrasse 49, 3012 Bern, 031 631 80 05",
    ]
    for item in resource_items:
        p = document.add_paragraph(style="Normal")
        p.paragraph_format.left_indent = Cm(0.35)
        p.paragraph_format.first_line_indent = Cm(-0.25)
        p.paragraph_format.space_after = Pt(2)
        r = p.add_run("• ")
        r.font.color.rgb = rgb(ACCENT)
        p.add_run(item)

    path = OUT_DIR / "Viktor_Yevtushenko_Bewerbungstexte_DE.docx"
    document.save(path)
    return path


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    portrait = make_portrait()
    qr_path = make_qr()
    outputs = [create_cv(portrait, qr_path), create_application_texts()]
    for output in outputs:
        print(output)


if __name__ == "__main__":
    main()
