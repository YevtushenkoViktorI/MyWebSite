from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw
from docx import Document
from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT, WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor
from pypdf import PdfReader
from reportlab.graphics.barcode import qr


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "output" / "cv"
ASSET_DIR = OUT_DIR / "assets"
REFERENCE_PDF = Path("/Users/viktoryevtushenko/Downloads/YevtushenkoWhiteDeFull.pdf")
PORTFOLIO_URL = "https://viktoryevtushenko.com"

BODY_FONT = "Georgia"
HEADING_FONT = "Arial"
INK = "111111"
MUTED = "5F5A55"
RULE = "A89F93"
LIGHT = "E2DED8"


def rgb(value: str) -> RGBColor:
    return RGBColor.from_string(value)


def set_cell_margins(cell, top=55, start=55, bottom=55, end=55) -> None:
    tc_pr = cell._tc.get_or_add_tcPr()
    tc_mar = tc_pr.first_child_found_in("w:tcMar")
    if tc_mar is None:
        tc_mar = OxmlElement("w:tcMar")
        tc_pr.append(tc_mar)
    for name, value in (("top", top), ("start", start), ("bottom", bottom), ("end", end)):
        element = tc_mar.find(qn(f"w:{name}"))
        if element is None:
            element = OxmlElement(f"w:{name}")
            tc_mar.append(element)
        element.set(qn("w:w"), str(value))
        element.set(qn("w:type"), "dxa")


def set_cell_borders(cell, color: str = LIGHT, size: str = "3", dotted: bool = False) -> None:
    tc_pr = cell._tc.get_or_add_tcPr()
    borders = tc_pr.first_child_found_in("w:tcBorders")
    if borders is None:
        borders = OxmlElement("w:tcBorders")
        tc_pr.append(borders)
    for name in ("top", "bottom", "start", "end", "insideH", "insideV"):
        element = borders.find(qn(f"w:{name}"))
        if element is None:
            element = OxmlElement(f"w:{name}")
            borders.append(element)
        element.set(qn("w:val"), "dotted" if dotted else "nil")
        element.set(qn("w:sz"), size)
        element.set(qn("w:color"), color)


def set_cell_rule(cell, edge: str, dotted: bool = True) -> None:
    tc_pr = cell._tc.get_or_add_tcPr()
    borders = tc_pr.first_child_found_in("w:tcBorders")
    if borders is None:
        borders = OxmlElement("w:tcBorders")
        tc_pr.append(borders)
    element = borders.find(qn(f"w:{edge}"))
    if element is None:
        element = OxmlElement(f"w:{edge}")
        borders.append(element)
    element.set(qn("w:val"), "dotted" if dotted else "single")
    element.set(qn("w:sz"), "6")
    element.set(qn("w:color"), RULE)


def set_table_fixed(table) -> None:
    tbl_pr = table._tbl.tblPr
    layout = tbl_pr.find(qn("w:tblLayout"))
    if layout is None:
        layout = OxmlElement("w:tblLayout")
        tbl_pr.append(layout)
    layout.set(qn("w:type"), "fixed")


def set_char_spacing(run, value: int = 28) -> None:
    r_pr = run._r.get_or_add_rPr()
    spacing = r_pr.find(qn("w:spacing"))
    if spacing is None:
        spacing = OxmlElement("w:spacing")
        r_pr.append(spacing)
    spacing.set(qn("w:val"), str(value))


def add_hyperlink(paragraph, text: str, url: str) -> None:
    relationship_id = paragraph.part.relate_to(
        url,
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
        is_external=True,
    )
    hyperlink = OxmlElement("w:hyperlink")
    hyperlink.set(qn("r:id"), relationship_id)
    run = OxmlElement("w:r")
    props = OxmlElement("w:rPr")
    underline = OxmlElement("w:u")
    underline.set(qn("w:val"), "single")
    props.append(underline)
    color = OxmlElement("w:color")
    color.set(qn("w:val"), INK)
    props.append(color)
    run.append(props)
    text_element = OxmlElement("w:t")
    text_element.text = text
    run.append(text_element)
    hyperlink.append(run)
    paragraph._p.append(hyperlink)


def configure_document(document: Document) -> None:
    section = document.sections[0]
    section.page_width = Cm(21)
    section.page_height = Cm(29.7)
    section.top_margin = Cm(1.15)
    section.bottom_margin = Cm(1.1)
    section.left_margin = Cm(1.35)
    section.right_margin = Cm(1.35)
    section.header_distance = Cm(0.35)
    section.footer_distance = Cm(0.45)

    normal = document.styles["Normal"]
    normal.font.name = BODY_FONT
    normal.font.size = Pt(9.2)
    normal.font.color.rgb = rgb(INK)
    normal.paragraph_format.space_after = Pt(2.1)
    normal.paragraph_format.line_spacing = 1.05

    title = document.styles["Title"]
    title.font.name = BODY_FONT
    title.font.size = Pt(26)
    title.font.color.rgb = rgb(INK)
    title.font.bold = False
    title.paragraph_format.space_after = Pt(2)

    for name in ("Heading 1", "Heading 2"):
        style = document.styles[name]
        style.font.name = HEADING_FONT
        style.font.color.rgb = rgb(INK)
        style.font.bold = False
        style.paragraph_format.keep_with_next = True
    document.styles["Heading 1"].font.size = Pt(11)
    document.styles["Heading 1"].paragraph_format.space_before = Pt(7)
    document.styles["Heading 1"].paragraph_format.space_after = Pt(4)
    document.styles["Heading 2"].font.size = Pt(10.2)
    document.styles["Heading 2"].font.bold = True
    document.styles["Heading 2"].paragraph_format.space_before = Pt(4)
    document.styles["Heading 2"].paragraph_format.space_after = Pt(1.5)

    document.core_properties.title = "Vollständiger Lebenslauf Viktor Yevtushenko"
    document.core_properties.subject = "Lebenslauf für den Schweizer Arbeitsmarkt"
    document.core_properties.author = "Viktor Yevtushenko"
    document.core_properties.keywords = "iOS, Swift, Precision Engineering, Elektronik, Telekom, Universität Bern"

    footer = section.footer.paragraphs[0]
    footer.alignment = WD_ALIGN_PARAGRAPH.CENTER
    footer.paragraph_format.space_after = Pt(0)
    run = footer.add_run("Viktor Yevtushenko  |  viktoryevtushenko.com")
    run.font.name = BODY_FONT
    run.font.size = Pt(7.5)
    run.font.color.rgb = rgb(MUTED)
    for run in footer.runs:
        run.font.name = BODY_FONT
        run.font.size = Pt(7.5)
        run.font.color.rgb = rgb(MUTED)


def add_section_heading(document: Document, text: str) -> None:
    paragraph = document.add_paragraph(style="Heading 1")
    paragraph.paragraph_format.keep_with_next = True
    run = paragraph.add_run(text.upper())
    set_char_spacing(run, 34)
    p_pr = paragraph._p.get_or_add_pPr()
    borders = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "dotted")
    bottom.set(qn("w:sz"), "6")
    bottom.set(qn("w:space"), "4")
    bottom.set(qn("w:color"), RULE)
    borders.append(bottom)
    p_pr.append(borders)


def add_label_value(paragraph, label: str, value: str) -> None:
    paragraph.paragraph_format.space_after = Pt(1.3)
    label_run = paragraph.add_run(label)
    label_run.font.color.rgb = rgb(MUTED)
    value_run = paragraph.add_run(value)
    value_run.font.color.rgb = rgb(INK)


def extract_reference_portrait() -> Path:
    ASSET_DIR.mkdir(parents=True, exist_ok=True)
    output = ASSET_DIR / "portrait_reference.png"
    reader = PdfReader(str(REFERENCE_PDF))
    images = reader.pages[0].images
    if not images:
        raise RuntimeError("No portrait image found in reference PDF")
    output.write_bytes(images[0].data)
    return output


def make_qr() -> Path:
    ASSET_DIR.mkdir(parents=True, exist_ok=True)
    output = ASSET_DIR / "portfolio_qr_classic.png"
    widget = qr.QrCodeWidget(PORTFOLIO_URL)
    widget.qr.make()
    matrix = widget.qr.modules
    quiet_zone = 4
    module_size = 14
    size = (len(matrix) + 2 * quiet_zone) * module_size
    image = Image.new("RGB", (size, size), "white")
    draw = ImageDraw.Draw(image)
    for row_index, row in enumerate(matrix):
        for column_index, enabled in enumerate(row):
            if enabled:
                x = (column_index + quiet_zone) * module_size
                y = (row_index + quiet_zone) * module_size
                draw.rectangle((x, y, x + module_size - 1, y + module_size - 1), fill="black")
    image.save(output, dpi=(300, 300))
    return output


def add_header(document: Document, portrait: Path, qr_path: Path) -> None:
    table = document.add_table(rows=1, cols=3)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    set_table_fixed(table)
    widths = (Cm(5.4), Cm(9.5), Cm(3.1))
    for cell, width in zip(table.rows[0].cells, widths):
        cell.width = width
        cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
        set_cell_margins(cell, top=40, start=25, bottom=80, end=80)
        set_cell_borders(cell)
        set_cell_rule(cell, "bottom")

    photo_cell, info_cell, qr_cell = table.rows[0].cells
    p = photo_cell.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    shape = p.add_run().add_picture(str(portrait), width=Cm(4.85), height=Cm(4.42))
    shape._inline.docPr.set("title", "Portrait Viktor Yevtushenko")
    shape._inline.docPr.set("descr", "Professional portrait of Viktor Yevtushenko")

    p = info_cell.paragraphs[0]
    p.paragraph_format.space_after = Pt(2)
    r = p.add_run("Viktor Yevtushenko")
    r.font.name = BODY_FONT
    r.font.size = Pt(26)
    r.font.color.rgb = rgb(INK)
    p = info_cell.add_paragraph()
    p.paragraph_format.space_after = Pt(5)
    r = p.add_run("iOS Software Engineer  |  Precision Engineering")
    r.bold = True
    r.font.size = Pt(10.3)
    for line in (
        "Bern / Biel, Schweiz",
        "+41 79 477 77 64",
        "yevtushenkoviktor26@gmail.com",
    ):
        p = info_cell.add_paragraph(line)
        p.paragraph_format.space_after = Pt(1.1)
    p = info_cell.add_paragraph()
    p.paragraph_format.space_after = Pt(1)
    add_hyperlink(p, "LinkedIn", "https://www.linkedin.com/in/viktor-yevtushenko")
    p.add_run("  |  ")
    add_hyperlink(p, "GitHub", "https://github.com/YevtushenkoViktorI")

    p = qr_cell.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    shape = p.add_run().add_picture(str(qr_path), width=Cm(2.55), height=Cm(2.55))
    shape._inline.docPr.set("title", "Portfolio QR Code")
    shape._inline.docPr.set("descr", "QR code linking to viktoryevtushenko.com")
    p = qr_cell.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_after = Pt(0)
    add_hyperlink(p, "Portfolio", PORTFOLIO_URL)


def add_timeline_entry(
    document: Document,
    period: str,
    title: str,
    place: str,
    bullets: list[str] | None = None,
    detail: str | None = None,
) -> None:
    table = document.add_table(rows=1, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    set_table_fixed(table)
    left, right = table.rows[0].cells
    left.width = Cm(4.25)
    right.width = Cm(13.75)
    for cell in (left, right):
        cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.TOP
        set_cell_margins(cell, top=40, start=0, bottom=45, end=100)
        set_cell_borders(cell)

    p = left.paragraphs[0]
    p.paragraph_format.space_after = Pt(0)
    r = p.add_run(period)
    r.bold = True
    r.font.size = Pt(8.9)

    p = right.paragraphs[0]
    p.paragraph_format.space_after = Pt(1)
    p.paragraph_format.keep_with_next = bool(bullets or detail)
    r = p.add_run(title)
    r.bold = True
    r.font.size = Pt(9.3)
    r = p.add_run(f"  |  {place}")
    r.font.color.rgb = rgb(MUTED)
    if detail:
        p = right.add_paragraph(detail)
        p.paragraph_format.space_after = Pt(1)
    for bullet in bullets or []:
        p = right.add_paragraph()
        p.paragraph_format.left_indent = Cm(0.37)
        p.paragraph_format.first_line_indent = Cm(-0.27)
        p.paragraph_format.space_after = Pt(0.55)
        p.paragraph_format.line_spacing = 1.0
        p.add_run("• ")
        p.add_run(bullet)


def add_two_column_summary(document: Document) -> None:
    table = document.add_table(rows=1, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    set_table_fixed(table)
    left, right = table.rows[0].cells
    left.width = Cm(11.4)
    right.width = Cm(6.6)
    for cell in (left, right):
        set_cell_margins(cell, top=20, start=0, bottom=25, end=140)
        set_cell_borders(cell)
    set_cell_rule(left, "end")

    p = left.paragraphs[0]
    r = p.add_run("AUSBILDUNG UND WEITERBILDUNG")
    r.font.name = HEADING_FONT
    r.font.size = Pt(10.5)
    set_char_spacing(r, 26)
    p.paragraph_format.space_after = Pt(5)
    entries = [
        ("Seit 2026", "Precision Engineering", "Universität Bern, Schweiz"),
        ("2010 - 2014", "Bachelor of Applied Science, Nanotechnologie", 'NTU "Kharkiv Polytechnic Institute", Ukraine'),
        ("10/2025 - heute", "Deutschkurs B1", "LernPunkt, Bern"),
        ("03/2026 - 04/2026", "Business Creation ICT", "Innosuisse, Bern / Online"),
        ("08/2025 - 11/2025", "Mentoring Program 7th Wave", "PowerHubZug, Schweiz"),
    ]
    for period, title, place in entries:
        p = left.add_paragraph()
        p.paragraph_format.space_after = Pt(1.6)
        r = p.add_run(f"{period}  ")
        r.bold = True
        r = p.add_run(title)
        r.bold = True
        p.add_run(f"\n{place}")

    p = right.paragraphs[0]
    r = p.add_run("PERSÖNLICHE ANGABEN")
    r.font.name = HEADING_FONT
    r.font.size = Pt(10.5)
    set_char_spacing(r, 26)
    p.paragraph_format.space_after = Pt(5)
    personal = [
        ("Geburtsdatum  ", "26.06.1993"),
        ("Nationalität  ", "Ukrainisch"),
        ("Aufenthaltsbewilligung  ", "S"),
        ("Führerausweis  ", "A, A1, B, B1"),
        ("Deutsch  ", "B1"),
        ("Englisch  ", "B2"),
        ("Ukrainisch  ", "Muttersprache"),
        ("Polnisch  ", "A1"),
    ]
    for label, value in personal:
        p = right.add_paragraph()
        add_label_value(p, label, value)


def add_project_grid(document: Document) -> None:
    projects = [
        ("JOIN Stories iOS SDK", "Wiederverwendbares Swift-Package mit konfigurierbarer Stories-UI für UIKit und SwiftUI."),
        ("Bridgit", "Social Networking mit Firebase, Realtime Presence, Standort, Push, Apple Pay und Subscriptions."),
        ("SPL Online / Saudi Post", "Enterprise-App mit RTL, sicherer API-Kommunikation, Maps, Authentifizierung und Deep Links."),
        ("LinguaMoment / SpeakingHub", "Realtime-Calls und Chat mit WebRTC, Agora, Twilio sowie eigener TURN/STUN-Infrastruktur."),
        ("Vuable", "AR-Raumscan, Wanddetektion, Flächenberechnung sowie 2D/3D-Grundrisse in Echtzeit."),
        ("Movement Vault", "Codebasierte Architektur, Custom Video Player, Playback-Logik, StoreKit und Abonnements."),
        ("Freespoke / Uncover", "Production Support, API- und Performance-Optimierung, UI-Weiterentwicklung und Social Features."),
        ("Slovnyk Language Platform", "Eigenes Produkt mit SwiftUI, CloudKit, Core Data, modularer Datenarchitektur und Sync."),
        ("KAI KeyboardAI / Oki AI", "OpenAI-Integration, kontextbezogene Antworten, Chat-Flows und In-App Purchases."),
        ("InChargeHealth", "Medikamenten- und Erinnerungsmanagement mit Firebase, Firestore und lokalen Benachrichtigungen."),
    ]
    table = document.add_table(rows=5, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    set_table_fixed(table)
    for index, (title, detail) in enumerate(projects):
        cell = table.rows[index // 2].cells[index % 2]
        cell.width = Cm(9.0)
        set_cell_margins(cell, top=65, start=0 if index % 2 == 0 else 120, bottom=65, end=120)
        set_cell_borders(cell)
        if index % 2 == 0:
            set_cell_rule(cell, "end")
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(1)
        r = p.add_run(title)
        r.bold = True
        p = cell.add_paragraph(detail)
        p.paragraph_format.space_after = Pt(0)
        p.paragraph_format.line_spacing = 1.0


def add_certificates(document: Document) -> None:
    certificates = [
        ("2026", "Innosuisse Business Creation ICT"),
        ("2026", "AILM Symposium Volunteer Certificate"),
        ("2025", "PowerHubZug Mentoring Program 7th Wave"),
        ("2025", "ECAP / BINplus Integrations- und Deutschkurs"),
        ("2017 - 2020", "IRATA Level 1 Rope Access Technician"),
        ("2017", "Huawei Safety Passport, Hardware Installation und EHS"),
        ("2016", "Elektrosicherheit bis 1000 V"),
        ("2016", "Telekom-Infrastrukturinstallation"),
        ("2016", "Brandschutz, Gas- und Heissarbeiten"),
        ("2016", "Arbeiten in engen Räumen und unterirdischen Anlagen"),
        ("bis 2047", "Führerausweis Kategorien A, A1, B, B1"),
    ]
    table = document.add_table(rows=6, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    set_table_fixed(table)
    for index, (period, title) in enumerate(certificates):
        cell = table.rows[index // 2].cells[index % 2]
        set_cell_margins(cell, top=35, start=0 if index % 2 == 0 else 120, bottom=35, end=100)
        set_cell_borders(cell)
        if index % 2 == 0:
            set_cell_rule(cell, "end")
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(0)
        r = p.add_run(f"{period}  ")
        r.bold = True
        p.add_run(title)


SKILL_GROUPS = [
    (
        "Apple Plattformen und Sprachen",
        "Swift, Objective-C, SwiftUI, UIKit, iOS, iPadOS, macOS, Core Data, Combine, CloudKit, "
        "Apple Human Interface Guidelines, Auto Layout, Xcode",
    ),
    (
        "Architektur und SDK-Entwicklung",
        "MVC, MVVM, MVP, VIPER, Clean Architecture, Coordinator, Dependency Injection, Modular Design, "
        "System Architecture, SDK Design, API Design, Swift Package Manager, CocoaPods",
    ),
    (
        "Performance, Qualität und Delivery",
        "Instruments, Profiling, Memory Management, Concurrency, GCD, Async/Await, Networking Optimization, "
        "Unit Testing, UI Testing, Debugging, CI/CD, Xcode Cloud, App-Store-Releases, Production Support",
    ),
    (
        "Backend, Cloud und Networking",
        "Firebase, Firestore, Firebase Auth, Crashlytics, Cloud Functions, REST APIs, GraphQL, URLSession, "
        "Alamofire, JSON, Codable, XML, WebSockets, AWS SDKs, Secure Storage, Encryption",
    ),
    (
        "Echtzeit, Media, AR und AI",
        "APNS, Push Notifications, Silent Push, Realtime Presence, VoIP, CallKit, WebRTC, Twilio, AgoraRTC, "
        "TURN/STUN, AVFoundation, Custom Video Player, CoreAnimation, ARKit, SceneKit, RoomPlan, "
        "3D Visualization, Geometry Calculations, Create ML, Core ML, OpenAI APIs",
    ),
    (
        "Payments, Maps und Produktintegrationen",
        "StoreKit, Apple Pay, PassKit, Apple Wallet, Subscriptions, In-App Purchases, Receipt Validation, "
        "Deep Linking, Universal Links, Apple Maps, Google Maps SDK, ArcGIS, Location Services, "
        "Multilingual UI, RTL Support",
    ),
    (
        "Tools und Zusammenarbeit",
        "Git, GitHub, SourceTree, Figma, Zeplin, Canvas, Trello, Asana, Jira, Notion, Agile, Scrum, "
        "Product Ownership, Requirements Analysis, Technical Documentation, Team Collaboration",
    ),
    (
        "Embedded Systems und Elektronik",
        "AVR Microcontrollers, Assembly, Low-Level Programming, Registers, Embedded Systems, Electronics, "
        "Circuit Design, Circuit Schematics, PCB Understanding, Electronic Components, Soldering, "
        "Measurement Devices, Power Supplies, Signal Processing Basics, Hardware Development",
    ),
    (
        "Labor, Halbleiter und Werkstoffe",
        "Nanotechnology, Micro- and Nanoelectronics, Semiconductor Materials, Crystal Structures, Thin Films, "
        "CdS, Porous Anodic Aluminium Oxide, Close-Spaced Sublimation, Vacuum Systems, X-Ray Diffraction, "
        "UV-Vis Spectrophotometry, STM Microscopy, Materials Analysis, Experimental Setup, Lab Research",
    ),
    (
        "RF, Telekom und Feldeinsatz",
        "RF Systems, Telecom Equipment, Communication Hardware, Base Station Installation, Antenna Systems, "
        "Antenna Alignment and Calibration, Signal Measurement, Cable Splicing, Cross-Connection, Modular Connectors, "
        "Network Installation, Network Troubleshooting, Tower and Mast Installation",
    ),
    (
        "Industrie, Sicherheit und Führung",
        "Industrial Rope Access, Work at Height, Rigging and Safety Systems, High-Altitude Safety, Confined Spaces, "
        "Field Equipment Testing, Technical Maintenance, Team Leadership, Daily Task Planning, Troubleshooting, "
        "System Integration, Engineering Analysis",
    ),
    (
        "Arbeitsweise",
        "Analytisches Denken, strukturierte Problemlösung, Präzision, Verantwortung, schnelle Einarbeitung, "
        "interdisziplinäre Zusammenarbeit, langfristige Wartbarkeit, selbstständige Umsetzung",
    ),
]


def add_skill_grid(document: Document) -> None:
    table = document.add_table(rows=6, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    set_table_fixed(table)
    for index, (title, skills) in enumerate(SKILL_GROUPS):
        cell = table.rows[index // 2].cells[index % 2]
        cell.width = Cm(9.0)
        set_cell_margins(cell, top=70, start=0 if index % 2 == 0 else 130, bottom=70, end=120)
        set_cell_borders(cell)
        if index % 2 == 0:
            set_cell_rule(cell, "end")
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(1.6)
        r = p.add_run(title)
        r.bold = True
        r.font.size = Pt(10)
        p = cell.add_paragraph(skills)
        p.paragraph_format.space_after = Pt(0)
        p.paragraph_format.line_spacing = 1.04
        for run in p.runs:
            run.font.size = Pt(8.7)


def create_document() -> Path:
    portrait = extract_reference_portrait()
    qr_path = make_qr()
    document = Document()
    configure_document(document)
    add_header(document, portrait, qr_path)

    summary = document.add_paragraph()
    summary.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    summary.paragraph_format.space_before = Pt(6)
    summary.paragraph_format.space_after = Pt(6)
    summary.paragraph_format.line_spacing = 1.28
    run = summary.add_run(
        "iOS/macOS-Entwickler mit mehr als fünf Jahren Erfahrung in produktiven Apps, SDKs und MVP-Produkten. "
        "Sicher in Swift, SwiftUI, UIKit, Firebase, Echtzeitkommunikation, AR und modularer Architektur. "
        "Der technische Hintergrund in Mikro- und Nanoelektronik, Embedded Systems, Telekommunikation und "
        "Halbleiterforschung verbindet Software mit realen Hardware- und Engineering-Systemen. Seit 2026 "
        "Studium Precision Engineering an der Universität Bern. Offen für Festanstellungen, Trainee- und "
        "Praktikumsrollen in Software, Elektronik und technischer Entwicklung."
    )
    run.font.size = Pt(11.6)

    add_two_column_summary(document)
    add_section_heading(document, "Berufserfahrung")
    add_timeline_entry(
        document,
        "10/2025 - heute",
        "Deutschkurs B1",
        "LernPunkt, Bern",
        detail="Berufsbezogene Kommunikation für Software-, Engineering- und technische Arbeitsumgebungen.",
    )
    add_timeline_entry(
        document,
        "07/2023 - 11/2024",
        "Freiwilliger Mitarbeiter Flüchtlingsunterstützung",
        "Bern, Schweiz",
        detail="Unterstützung des täglichen Betriebs und der Kommunikation in einem interkulturellen Umfeld.",
    )
    add_timeline_entry(
        document,
        "07/2018 - 06/2023",
        "iOS Software Developer",
        "Freelance / Remote",
        bullets=[
            "Entwicklung produktiver iOS-Anwendungen und SDKs mit Swift, SwiftUI, UIKit und Objective-C.",
            "Design modularer Architekturen, eigener Networking-Layer sowie REST- und GraphQL-Integrationen.",
            "Realtime-Video und -Audio, Firebase, Push, Subscriptions, Apple Pay, Deep und Universal Links.",
            "AR-, Kamera-, 3D- und Medienfunktionen sowie Performance- und Stabilitätsoptimierung.",
            "Begleitung von Prototypen, Client-Projekten und produktiven App-Store-Releases.",
        ],
    )

    document.add_page_break()
    add_section_heading(document, "Weitere Berufserfahrung")
    add_timeline_entry(
        document,
        "2017 - 2018",
        "Industrie- und Höhenmontagetechniker",
        "Polen / EU-Projekte",
        bullets=[
            "Montage, technische Instandhaltung und Arbeiten an Kraftwerksanlagen.",
            "Präzises Arbeiten in der Höhe unter anspruchsvollen Sicherheitsbedingungen.",
        ],
    )
    add_timeline_entry(
        document,
        "2016 - 2017",
        "Telekom-Installationstechniker und Teamleiter",
        "Ukraine",
        bullets=[
            "Installation und Inbetriebnahme von Mobilfunk-, Telefon- und Netzwerkinfrastruktur.",
            "Basisstationen, Antennenausrichtung und Kalibrierung, Kabelspleissen und Verteilerschränke.",
            "Fehlerdiagnose und Reparatur von Teilnehmernetzen; Arbeit mit Tyco- und 3M-Verbindungstechnik.",
            "Leitung eines Teams von vier Technikern und Koordination der täglichen Einsätze.",
        ],
    )
    add_timeline_entry(
        document,
        "09/2014 - 06/2016",
        "Labor- und Forschungspraxis Mikro- und Nanoelektronik",
        "Kharkiv, Ukraine",
        bullets=[
            "Betrieb von Vakuumanlagen und Entwicklung von Temperaturregel- und Überwachungsplatinen.",
            "CdS-Dünnschichten mittels Close-Spaced Sublimation für Solaranwendungen.",
            "Materialanalyse mit XRD, UV-Vis-Spektrophotometrie und STM.",
            "Synthese und Morphologieanalyse von porösem anodischem Aluminiumoxid.",
        ],
    )

    add_section_heading(document, "Ausgewählte Projekte")
    add_project_grid(document)
    add_section_heading(document, "Zertifikate und Nachweise")
    add_certificates(document)

    document.add_page_break()
    add_section_heading(document, "Vollständiges Kompetenzprofil")
    p = document.add_paragraph(
        "Die Kompetenzen sind nach Einsatzgebiet gruppiert. Projektnachweise und Zertifikate sind über das Portfolio im QR-Code verfügbar."
    )
    p.paragraph_format.space_after = Pt(4)
    add_skill_grid(document)

    add_section_heading(document, "Interessen")
    p = document.add_paragraph()
    p.paragraph_format.space_after = Pt(0)
    p.add_run("Technik und Lernen: ").bold = True
    p.add_run("Embedded Systems, Hardware-Software-Integration, neue Engineering-Technologien.  ")
    p.add_run("Strategie: ").bold = True
    p.add_run("Schach.  ")
    p.add_run("Aktiv: ").bold = True
    p.add_run("Klettern, Wandern, Schwimmen und Reisen.")

    output = OUT_DIR / "Viktor_Yevtushenko_CV_Full_DE.docx"
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    document.save(output)
    return output


if __name__ == "__main__":
    print(create_document())
