from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter
from docx import Document
from docx.enum.section import WD_SECTION
from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT, WD_ROW_HEIGHT_RULE, WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor
from reportlab.graphics.barcode import qr


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "output" / "cv"
ASSET_DIR = OUT_DIR / "assets"
PORTRAIT_SOURCE = ROOT / "public" / "myHeroPortrait.jpg"

PORTFOLIO_URL = "https://viktoryevtushenko.com"
LINKEDIN_URL = "https://www.linkedin.com/in/viktor-yevtushenko"
GITHUB_URL = "https://github.com/YevtushenkoViktorI"

FONT = "Arial"
FONT_DISPLAY = "Arial"

NAVY = "0D1628"
NAVY_SOFT = "132039"
INK = "122038"
MUTED = "5C6B85"
ACCENT = "198F94"
ACCENT_BRIGHT = "2FC0BB"
BLUE = "2F76BF"
PALE = "F4F8FF"
PALE_ACCENT = "E7F6F5"
BORDER = "CCDAE9"
WHITE = "FFFFFF"


def rgb(value: str) -> RGBColor:
    return RGBColor.from_string(value)


def set_cell_shading(cell, fill: str) -> None:
    tc_pr = cell._tc.get_or_add_tcPr()
    shading = tc_pr.find(qn("w:shd"))
    if shading is None:
        shading = OxmlElement("w:shd")
        tc_pr.append(shading)
    shading.set(qn("w:fill"), fill)
    shading.set(qn("w:val"), "clear")


def set_cell_margins(cell, top=80, start=90, bottom=80, end=90) -> None:
    tc_pr = cell._tc.get_or_add_tcPr()
    tc_mar = tc_pr.find(qn("w:tcMar"))
    if tc_mar is None:
        tc_mar = OxmlElement("w:tcMar")
        tc_pr.append(tc_mar)
    for name, value in (("top", top), ("start", start), ("bottom", bottom), ("end", end)):
        node = tc_mar.find(qn(f"w:{name}"))
        if node is None:
            node = OxmlElement(f"w:{name}")
            tc_mar.append(node)
        node.set(qn("w:w"), str(value))
        node.set(qn("w:type"), "dxa")


def set_cell_borders(
    cell,
    *,
    top: tuple[str, str, str] | None = None,
    bottom: tuple[str, str, str] | None = None,
    start: tuple[str, str, str] | None = None,
    end: tuple[str, str, str] | None = None,
) -> None:
    tc_pr = cell._tc.get_or_add_tcPr()
    borders = tc_pr.find(qn("w:tcBorders"))
    if borders is None:
        borders = OxmlElement("w:tcBorders")
        tc_pr.append(borders)
    values = {"top": top, "bottom": bottom, "start": start, "end": end}
    for edge, config in values.items():
        node = borders.find(qn(f"w:{edge}"))
        if node is None:
            node = OxmlElement(f"w:{edge}")
            borders.append(node)
        if config is None:
            node.set(qn("w:val"), "nil")
            continue
        val, size, color = config
        node.set(qn("w:val"), val)
        node.set(qn("w:sz"), size)
        node.set(qn("w:color"), color)


def set_table_fixed(table) -> None:
    tbl_pr = table._tbl.tblPr
    layout = tbl_pr.find(qn("w:tblLayout"))
    if layout is None:
        layout = OxmlElement("w:tblLayout")
        tbl_pr.append(layout)
    layout.set(qn("w:type"), "fixed")


def keep_row_together(row) -> None:
    tr_pr = row._tr.get_or_add_trPr()
    cant_split = OxmlElement("w:cantSplit")
    tr_pr.append(cant_split)


def set_repeat_table_header(row) -> None:
    tr_pr = row._tr.get_or_add_trPr()
    tbl_header = OxmlElement("w:tblHeader")
    tbl_header.set(qn("w:val"), "true")
    tr_pr.append(tbl_header)


def set_cell_width(cell, width_cm: float) -> None:
    width = Cm(width_cm)
    cell.width = width
    tc_pr = cell._tc.get_or_add_tcPr()
    tc_w = tc_pr.find(qn("w:tcW"))
    if tc_w is None:
        tc_w = OxmlElement("w:tcW")
        tc_pr.append(tc_w)
    tc_w.set(qn("w:w"), str(width.twips))
    tc_w.set(qn("w:type"), "dxa")


def set_table_widths(table, widths_cm: list[float]) -> None:
    for index, width_cm in enumerate(widths_cm):
        width = Cm(width_cm)
        table.columns[index].width = width
        for cell in table.columns[index].cells:
            set_cell_width(cell, width_cm)
    grid_columns = table._tbl.tblGrid.gridCol_lst
    for grid_column, width_cm in zip(grid_columns, widths_cm):
        grid_column.set(qn("w:w"), str(Cm(width_cm).twips))


def add_hyperlink(paragraph, text: str, url: str, color: str = ACCENT_BRIGHT, underline: bool = False) -> None:
    rel_id = paragraph.part.relate_to(
        url,
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
        is_external=True,
    )
    hyperlink = OxmlElement("w:hyperlink")
    hyperlink.set(qn("r:id"), rel_id)
    run = OxmlElement("w:r")
    props = OxmlElement("w:rPr")
    color_node = OxmlElement("w:color")
    color_node.set(qn("w:val"), color)
    props.append(color_node)
    font_node = OxmlElement("w:rFonts")
    font_node.set(qn("w:ascii"), FONT)
    font_node.set(qn("w:hAnsi"), FONT)
    props.append(font_node)
    size_node = OxmlElement("w:sz")
    size_node.set(qn("w:val"), "18")
    props.append(size_node)
    if underline:
        underline_node = OxmlElement("w:u")
        underline_node.set(qn("w:val"), "single")
        props.append(underline_node)
    run.append(props)
    text_node = OxmlElement("w:t")
    text_node.text = text
    run.append(text_node)
    hyperlink.append(run)
    paragraph._p.append(hyperlink)


def set_paragraph_border(paragraph, edge: str, color: str, size: str = "8", space: str = "4") -> None:
    p_pr = paragraph._p.get_or_add_pPr()
    borders = p_pr.find(qn("w:pBdr"))
    if borders is None:
        borders = OxmlElement("w:pBdr")
        p_pr.append(borders)
    border = borders.find(qn(f"w:{edge}"))
    if border is None:
        border = OxmlElement(f"w:{edge}")
        borders.append(border)
    border.set(qn("w:val"), "single")
    border.set(qn("w:sz"), size)
    border.set(qn("w:space"), space)
    border.set(qn("w:color"), color)


def add_page_number(paragraph) -> None:
    paragraph.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    run = paragraph.add_run("Seite ")
    run.font.name = FONT
    run.font.size = Pt(7.5)
    run.font.color.rgb = rgb(MUTED)
    fld_char_1 = OxmlElement("w:fldChar")
    fld_char_1.set(qn("w:fldCharType"), "begin")
    instr_text = OxmlElement("w:instrText")
    instr_text.set(qn("xml:space"), "preserve")
    instr_text.text = "PAGE"
    fld_char_2 = OxmlElement("w:fldChar")
    fld_char_2.set(qn("w:fldCharType"), "end")
    run._r.append(fld_char_1)
    run._r.append(instr_text)
    run._r.append(fld_char_2)


def prepare_portrait() -> Path:
    ASSET_DIR.mkdir(parents=True, exist_ok=True)
    output = ASSET_DIR / "portrait_shirt_cv.jpg"
    with Image.open(PORTRAIT_SOURCE) as source:
        image = source.convert("RGB")
        crop = image.crop((350, 610, 1000, 1260))
        crop = crop.resize((1400, 1400), Image.Resampling.LANCZOS)
        crop = ImageEnhance.Contrast(crop).enhance(1.03)
        crop = ImageEnhance.Color(crop).enhance(0.97)
        crop = ImageEnhance.Sharpness(crop).enhance(1.08)
        crop.save(output, quality=94, dpi=(300, 300))
    return output


def make_qr() -> Path:
    ASSET_DIR.mkdir(parents=True, exist_ok=True)
    output = ASSET_DIR / "portfolio_qr_branded.png"
    widget = qr.QrCodeWidget(PORTFOLIO_URL)
    widget.qr.make()
    matrix = widget.qr.modules
    quiet_zone = 4
    module = 14
    size = (len(matrix) + quiet_zone * 2) * module
    image = Image.new("RGB", (size, size), f"#{WHITE}")
    draw = ImageDraw.Draw(image)
    for row_index, row in enumerate(matrix):
        for column_index, enabled in enumerate(row):
            if enabled:
                x = (column_index + quiet_zone) * module
                y = (row_index + quiet_zone) * module
                draw.rectangle((x, y, x + module - 1, y + module - 1), fill=f"#{NAVY}")
    image.save(output, dpi=(300, 300))
    return output


def configure_document(document: Document, full: bool) -> None:
    section = document.sections[0]
    section.page_width = Cm(21)
    section.page_height = Cm(29.7)
    section.top_margin = Cm(0.85)
    section.bottom_margin = Cm(0.9)
    section.left_margin = Cm(1.05)
    section.right_margin = Cm(1.05)
    section.header_distance = Cm(0.3)
    section.footer_distance = Cm(0.35)

    normal = document.styles["Normal"]
    normal.font.name = FONT
    normal.font.size = Pt(9.2)
    normal.font.color.rgb = rgb(INK)
    normal.paragraph_format.space_after = Pt(2.2)
    normal.paragraph_format.line_spacing = 1.08

    document.styles["Title"].font.name = FONT_DISPLAY
    document.styles["Title"].font.size = Pt(30)
    document.styles["Title"].font.bold = True
    document.styles["Title"].font.color.rgb = rgb(WHITE)

    for name in ("Heading 1", "Heading 2"):
        style = document.styles[name]
        style.font.name = FONT_DISPLAY
        style.font.color.rgb = rgb(INK)
        style.font.bold = True
        style.paragraph_format.keep_with_next = True
    document.styles["Heading 1"].font.size = Pt(13.5)
    document.styles["Heading 1"].paragraph_format.space_before = Pt(7)
    document.styles["Heading 1"].paragraph_format.space_after = Pt(4)
    document.styles["Heading 2"].font.size = Pt(10.2)
    document.styles["Heading 2"].paragraph_format.space_before = Pt(3)
    document.styles["Heading 2"].paragraph_format.space_after = Pt(1.2)

    document.core_properties.title = (
        "Vollständiger Lebenslauf Viktor Yevtushenko" if full else "Lebenslauf Viktor Yevtushenko"
    )
    document.core_properties.subject = "Bewerbungsunterlagen für den Schweizer Arbeitsmarkt"
    document.core_properties.author = "Viktor Yevtushenko"
    document.core_properties.keywords = (
        "iOS, Swift, SwiftUI, Precision Engineering, Universität Bern, Elektronik, Telekommunikation"
    )

    footer_table = section.footer.add_table(rows=1, cols=2, width=Cm(18.9))
    footer_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    footer_table.autofit = False
    set_table_fixed(footer_table)
    left, right = footer_table.rows[0].cells
    set_cell_width(left, 14.5)
    set_cell_width(right, 4.4)
    set_table_widths(footer_table, [14.5, 4.4])
    for cell in (left, right):
        set_cell_margins(cell, top=25, start=0, bottom=0, end=0)
        set_cell_borders(cell, top=("single", "6", BORDER))
    p = left.paragraphs[0]
    p.paragraph_format.space_after = Pt(0)
    run = p.add_run("Viktor Yevtushenko  |  viktoryevtushenko.com")
    run.font.name = FONT
    run.font.size = Pt(7.5)
    run.font.color.rgb = rgb(MUTED)
    add_page_number(right.paragraphs[0])


def add_header(document: Document, portrait: Path) -> None:
    table = document.add_table(rows=1, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    set_table_fixed(table)
    info, photo = table.rows[0].cells
    for cell, width in zip((info, photo), (13.3, 5.6)):
        set_cell_width(cell, width)
        set_cell_shading(cell, NAVY)
        set_cell_borders(cell)
        cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
    set_table_widths(table, [13.3, 5.6])
    set_cell_margins(info, top=115, start=180, bottom=105, end=135)
    set_cell_margins(photo, top=95, start=80, bottom=95, end=105)

    p = info.paragraphs[0]
    p.style = document.styles["Title"]
    p.paragraph_format.space_after = Pt(0)
    p.add_run("Viktor\nYevtushenko")

    p = info.add_paragraph()
    p.paragraph_format.space_before = Pt(6)
    p.paragraph_format.space_after = Pt(6)
    run = p.add_run("iOS Software Engineer  |  Precision Engineering")
    run.font.name = FONT
    run.font.size = Pt(11.2)
    run.font.bold = True
    run.font.color.rgb = rgb(ACCENT_BRIGHT)

    p = info.add_paragraph()
    p.paragraph_format.space_after = Pt(1.2)
    run = p.add_run("Bern / Biel, Schweiz   |   +41 79 477 77 64")
    run.font.size = Pt(8.7)
    run.font.color.rgb = rgb("D7E1F0")
    p = info.add_paragraph()
    p.paragraph_format.space_after = Pt(1.2)
    run = p.add_run("yevtushenkoviktor26@gmail.com")
    run.font.size = Pt(8.7)
    run.font.color.rgb = rgb("D7E1F0")
    p = info.add_paragraph()
    p.paragraph_format.space_after = Pt(0)
    add_hyperlink(p, "LinkedIn", LINKEDIN_URL)
    run = p.add_run("   |   ")
    run.font.color.rgb = rgb(MUTED)
    add_hyperlink(p, "GitHub", GITHUB_URL)
    run = p.add_run("   |   ")
    run.font.color.rgb = rgb(MUTED)
    add_hyperlink(p, "Portfolio", PORTFOLIO_URL)

    p = photo.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_after = Pt(0)
    shape = p.add_run().add_picture(str(portrait), width=Cm(5.1), height=Cm(5.1))
    shape._inline.docPr.set("title", "Porträt Viktor Yevtushenko")
    shape._inline.docPr.set("descr", "Professionelles Porträt von Viktor Yevtushenko")


def add_compact_header(document: Document, label: str) -> None:
    table = document.add_table(rows=1, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    set_table_fixed(table)
    left, right = table.rows[0].cells
    set_cell_width(left, 14.2)
    set_cell_width(right, 4.7)
    set_table_widths(table, [14.2, 4.7])
    for cell in (left, right):
        set_cell_shading(cell, NAVY)
        set_cell_margins(cell, top=80, start=145, bottom=75, end=145)
        set_cell_borders(cell)
        cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
    p = left.paragraphs[0]
    p.paragraph_format.space_after = Pt(0)
    run = p.add_run("Viktor Yevtushenko")
    run.font.name = FONT_DISPLAY
    run.font.size = Pt(12)
    run.font.bold = True
    run.font.color.rgb = rgb(WHITE)
    p = right.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p.paragraph_format.space_after = Pt(0)
    run = p.add_run(label.upper())
    run.font.size = Pt(8)
    run.font.bold = True
    run.font.color.rgb = rgb("D7E1F0")


def add_section_heading(document: Document, text: str, *, compact: bool = False) -> None:
    paragraph = document.add_paragraph(style="Heading 1")
    paragraph.paragraph_format.space_before = Pt(5 if compact else 7)
    paragraph.paragraph_format.space_after = Pt(3 if compact else 4)
    run = paragraph.add_run(text)
    run.font.color.rgb = rgb(INK)
    set_paragraph_border(paragraph, "bottom", ACCENT, size="10", space="4")


def add_profile(document: Document) -> None:
    add_section_heading(document, "Profil")
    paragraph = document.add_paragraph()
    paragraph.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    paragraph.paragraph_format.line_spacing = 1.15
    paragraph.paragraph_format.space_after = Pt(5)
    run = paragraph.add_run(
        "Ich arbeite dort am stärksten, wo Software, Hardware und reale technische Systeme zusammenkommen. "
        "In mehr als fünf Jahren iOS-Entwicklung habe ich Funktionen von der Architektur bis zum stabilen "
        "App-Store-Release begleitet und Qualität durch Tests, Profiling und sorgfältige Reviews abgesichert. "
        "Aus Labor, Telekom und sicherheitskritischer Höhenarbeit bringe ich eine Arbeitsweise mit, in der "
        "Messgenauigkeit, klare Dokumentation und Verantwortung für das Ergebnis selbstverständlich sind. "
        "Seit 2026 vertiefe ich diesen Ansatz im Studium Precision Engineering an der Universität Bern."
    )
    run.font.size = Pt(10.1)


def add_identity_strip(document: Document) -> None:
    items = [
        ("VERANTWORTUNG", "Releases, Teamkoordination"),
        ("SORGFALT", "Tests, Profiling, Dokumentation"),
        ("SYSTEMDENKEN", "Software, Hardware, Labor"),
        ("PRAXIS", "Telekom, Industrie, Sicherheit"),
    ]
    table = document.add_table(rows=1, cols=4)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    set_table_fixed(table)
    keep_row_together(table.rows[0])
    for index, (label, detail) in enumerate(items):
        cell = table.rows[0].cells[index]
        set_cell_width(cell, 4.725)
        set_cell_shading(cell, PALE)
        set_cell_margins(cell, top=65, start=90, bottom=60, end=90)
        border_end = ("single", "6", BORDER) if index < 3 else None
        set_cell_borders(
            cell,
            top=("single", "6", BORDER),
            bottom=("single", "6", BORDER),
            start=("single", "6", BORDER) if index == 0 else None,
            end=border_end if index < 3 else ("single", "6", BORDER),
        )
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(2)
        r = p.add_run(label)
        r.font.size = Pt(7.6)
        r.font.bold = True
        r.font.color.rgb = rgb(ACCENT)
        p = cell.add_paragraph(detail)
        p.paragraph_format.space_after = Pt(0)
        p.paragraph_format.line_spacing = 1.0
        for r in p.runs:
            r.font.size = Pt(8.1)
            r.font.color.rgb = rgb(INK)


def add_timeline_entry(
    document: Document,
    period: str,
    title: str,
    place: str,
    bullets: list[str] | None = None,
    detail: str | None = None,
    *,
    compact: bool = False,
) -> None:
    table = document.add_table(rows=1, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    set_table_fixed(table)
    keep_row_together(table.rows[0])
    date_cell, body_cell = table.rows[0].cells
    set_cell_width(date_cell, 5.2)
    set_cell_width(body_cell, 13.7)
    set_table_widths(table, [5.2, 13.7])
    for cell in (date_cell, body_cell):
        cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.TOP
        set_cell_margins(
            cell,
            top=45 if compact else 60,
            start=0 if cell is date_cell else 90,
            bottom=45 if compact else 65,
            end=75,
        )
        set_cell_borders(cell, bottom=("single", "5", BORDER))

    p = date_cell.paragraphs[0]
    p.paragraph_format.space_after = Pt(0)
    r = p.add_run(period)
    r.font.size = Pt(8.5)
    r.font.bold = True
    r.font.color.rgb = rgb(ACCENT)

    p = body_cell.paragraphs[0]
    p.paragraph_format.space_after = Pt(1)
    p.paragraph_format.keep_with_next = bool(detail or bullets)
    r = p.add_run(title)
    r.font.size = Pt(9.8)
    r.font.bold = True
    r.font.color.rgb = rgb(INK)
    r = p.add_run(f"  |  {place}")
    r.font.size = Pt(9.0)
    r.font.color.rgb = rgb(MUTED)

    if detail:
        p = body_cell.add_paragraph(detail)
        p.paragraph_format.space_after = Pt(0)
        p.paragraph_format.line_spacing = 1.05
        for r in p.runs:
            r.font.size = Pt(9.0)

    for bullet in bullets or []:
        p = body_cell.add_paragraph()
        p.paragraph_format.left_indent = Cm(0.34)
        p.paragraph_format.first_line_indent = Cm(-0.25)
        p.paragraph_format.space_after = Pt(0.5)
        p.paragraph_format.line_spacing = 1.02
        r = p.add_run("• ")
        r.font.color.rgb = rgb(ACCENT)
        r = p.add_run(bullet)
        r.font.size = Pt(8.9)


def add_page_one(document: Document, portrait: Path) -> None:
    add_header(document, portrait)
    add_profile(document)
    add_identity_strip(document)
    add_section_heading(document, "Berufserfahrung", compact=True)
    add_timeline_entry(
        document,
        "07/2023 - 11/2024",
        "Freiwillige Mitarbeit in der Flüchtlingsunterstützung",
        "Bern, Schweiz",
        detail="Zuverlässige Unterstützung des täglichen Betriebs und der Kommunikation in einem interkulturellen Umfeld.",
        compact=True,
    )
    add_timeline_entry(
        document,
        "07/2018 - 06/2023",
        "iOS Software Developer",
        "Freelance / Remote",
        bullets=[
            "Produktive iOS-Anwendungen und SDKs mit Swift, SwiftUI, UIKit und Objective-C umgesetzt.",
            "Modulare Architekturen, Networking-Layer sowie REST-, GraphQL- und Firebase-Integrationen entwickelt.",
            "Realtime-Kommunikation, Media, AR, Push, Subscriptions und App-Store-Releases verantwortet.",
            "Performance, Stabilität und langfristige Wartbarkeit mit Profiling, Tests und sauberer Architektur verbessert.",
        ],
        compact=True,
    )
    add_timeline_entry(
        document,
        "2017 - 2018",
        "Industrie- und Höhenmontagetechniker",
        "Polen / EU-Projekte",
        detail="Präzise Montage und technische Instandhaltung an Kraftwerksanlagen unter hohen Sicherheitsanforderungen.",
        compact=True,
    )
    add_timeline_entry(
        document,
        "2016 - 2017",
        "Telekom-Installationstechniker und Teamleiter",
        "Ukraine",
        detail="Einsätze geplant, Mobilfunk- und Netzwerkinfrastruktur geprüft und ein Team von vier Technikern koordiniert.",
        compact=True,
    )
    add_timeline_entry(
        document,
        "09/2014 - 06/2016",
        "Labor- und Forschungspraxis Mikro- und Nanoelektronik",
        "Kharkiv, Ukraine",
        detail="Messreihen dokumentiert, Materialanalysen durchgeführt und elektronische Steuer- und Überwachungsplatinen entwickelt.",
        compact=True,
    )
    add_section_heading(document, "Ausbildung", compact=True)
    add_timeline_entry(
        document,
        "seit 2026",
        "Precision Engineering",
        "Universität Bern, Schweiz",
        detail="Aktuelles Studium an der Schnittstelle von präzisen technischen Systemen, Software und Engineering.",
        compact=True,
    )
    add_timeline_entry(
        document,
        "2010 - 2014",
        "Bachelor of Applied Science, Nanotechnologie",
        'NTU "Kharkiv Polytechnic Institute", Ukraine',
        detail="Mikro- und Nanoelektronik, Halbleiterphysik, Werkstoffkunde und Vakuumtechnologien.",
        compact=True,
    )


def add_continuing_education(document: Document) -> None:
    add_section_heading(document, "Weiterbildung und Integration", compact=True)
    entries = [
        (
            "seit 10/2025",
            "Deutsch B1",
            "LernPunkt, Bern",
            "Berufsbezogene Kommunikation für Software-, Engineering- und technische Arbeitsumgebungen.",
        ),
        (
            "03 - 04/2026",
            "Business Creation ICT",
            "Innosuisse, Bern / Online",
            "Geschäftsmodell, Marktvalidierung und Aufbau technologischer Geschäftsideen.",
        ),
        (
            "08 - 11/2025",
            "Mentoring Program 7th Wave",
            "PowerHubZug, Schweiz",
            "Berufliche Integration und Positionierung im Schweizer Arbeitsmarkt.",
        ),
    ]
    for period, title, place, detail in entries:
        add_timeline_entry(document, period, title, place, detail=detail, compact=True)


def add_projects(document: Document) -> None:
    add_section_heading(document, "Ausgewählte Projekte", compact=True)
    projects = [
        (
            "JOIN Stories iOS SDK",
            "SPM-SDK mit konfigurierbarer Stories-UI für UIKit und SwiftUI.",
            "Swift  •  SwiftUI  •  SPM",
        ),
        (
            "Bridgit",
            "Eigenständig entwickelte Social App mit Realtime Presence, Standort, Push und Subscriptions.",
            "SwiftUI  •  Firebase  •  Apple Pay",
        ),
        (
            "LinguaMoment",
            "Realtime-Calls und Chat mit eigener TURN/STUN-Infrastruktur.",
            "WebRTC  •  Agora  •  Twilio",
        ),
        (
            "Vuable",
            "AR-Raumscan, Wanddetektion und 2D/3D-Grundrisse in Echtzeit.",
            "ARKit  •  SceneKit  •  RoomPlan",
        ),
        (
            "Saudi Post Mobile App",
            "Enterprise-App mit sicherer API-Kommunikation, Maps, Authentifizierung und RTL.",
            "UIKit  •  REST  •  Secure Storage",
        ),
        (
            "Slovnyk Language Platform",
            "Eigenes mehrsprachiges Produkt mit modularer Datenarchitektur und Cloud-Synchronisierung.",
            "SwiftUI  •  CloudKit  •  Core Data",
        ),
        (
            "Movement Vault",
            "Architektur-Refactoring, eigener Video Player und verlässliche Subscription-Flows.",
            "UIKit  •  AVFoundation  •  StoreKit",
        ),
        (
            "InChargeHealth",
            "Medikamenten- und Erinnerungsmanagement mit synchronisierten Gesundheitsdaten.",
            "Swift  •  Firebase  •  Notifications",
        ),
    ]
    table = document.add_table(rows=4, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    set_table_fixed(table)
    for index, (title, detail, stack) in enumerate(projects):
        cell = table.rows[index // 2].cells[index % 2]
        set_cell_width(cell, 9.45)
        set_cell_margins(cell, top=65, start=0 if index % 2 == 0 else 120, bottom=65, end=120)
        set_cell_borders(cell, bottom=("single", "5", BORDER))
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(1)
        r = p.add_run(title)
        r.font.size = Pt(9.4)
        r.font.bold = True
        r.font.color.rgb = rgb(INK)
        p = cell.add_paragraph(detail)
        p.paragraph_format.space_after = Pt(1)
        p.paragraph_format.line_spacing = 1.0
        for r in p.runs:
            r.font.size = Pt(8.35)
        p = cell.add_paragraph(stack)
        p.paragraph_format.space_after = Pt(0)
        for r in p.runs:
            r.font.size = Pt(7.8)
            r.font.bold = True
            r.font.color.rgb = rgb(ACCENT)
        keep_row_together(table.rows[index // 2])


def add_key_competencies(document: Document) -> None:
    add_section_heading(document, "Kernkompetenzen", compact=True)
    table = document.add_table(rows=4, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    set_table_fixed(table)
    groups = [
        ("Apple Engineering", "Swift, SwiftUI, UIKit, Objective-C, Core Data, Combine, CloudKit"),
        ("Architektur", "MVVM, Clean Architecture, Coordinator, DI, Modular Design, SPM"),
        ("Realtime und Media", "Firebase, WebSockets, WebRTC, CallKit, AVFoundation, Push"),
        ("AR und AI", "ARKit, SceneKit, RoomPlan, Core ML, Create ML, OpenAI APIs"),
        ("Backend und Delivery", "REST, GraphQL, URLSession, CI/CD, Xcode Cloud, Testing"),
        ("Payments und Maps", "StoreKit, Apple Pay, PassKit, Subscriptions, Maps, Location"),
        ("Hardware", "AVR, Assembly, Embedded Systems, PCB, Elektronik, Messtechnik"),
        ("Engineering", "Halbleiter, Vakuum, RF, Telekom, Labor, technische Dokumentation"),
    ]
    for index, (title, skills) in enumerate(groups):
        cell = table.rows[index // 2].cells[index % 2]
        set_cell_width(cell, 9.45)
        set_cell_shading(cell, PALE if index % 2 == 0 else WHITE)
        set_cell_margins(cell, top=55, start=75 if index % 2 == 0 else 120, bottom=55, end=90)
        set_cell_borders(cell, bottom=("single", "5", BORDER))
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(0.8)
        r = p.add_run(title)
        r.font.size = Pt(8.8)
        r.font.bold = True
        r.font.color.rgb = rgb(ACCENT)
        p = cell.add_paragraph(skills)
        p.paragraph_format.space_after = Pt(0)
        p.paragraph_format.line_spacing = 1.0
        for r in p.runs:
            r.font.size = Pt(8.4)
        keep_row_together(table.rows[index // 2])


def add_certificates_and_personal(document: Document) -> None:
    table = document.add_table(rows=1, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    set_table_fixed(table)
    left, right = table.rows[0].cells
    set_cell_width(left, 11.5)
    set_cell_width(right, 7.4)
    set_table_widths(table, [11.5, 7.4])
    for cell in (left, right):
        cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.TOP
        set_cell_margins(cell, top=20, start=0 if cell is left else 130, bottom=0, end=100)
        set_cell_borders(cell)

    p = left.paragraphs[0]
    r = p.add_run("ZERTIFIKATE")
    r.font.size = Pt(10.2)
    r.font.bold = True
    r.font.color.rgb = rgb(INK)
    set_paragraph_border(p, "bottom", ACCENT, size="8", space="3")
    certificates = [
        "2026  Innosuisse Business Creation ICT",
        "2026  AILM Symposium Volunteer Certificate",
        "2025  PowerHubZug Mentoring Program",
        "2025  ECAP / BINplus Integrationskurs",
        "2017  IRATA Level 1 und Huawei Safety Passport",
        "2016  Elektrosicherheit bis 1000 V und Telekom-Infrastruktur",
    ]
    for item in certificates:
        p = left.add_paragraph()
        p.paragraph_format.left_indent = Cm(0.3)
        p.paragraph_format.first_line_indent = Cm(-0.23)
        p.paragraph_format.space_after = Pt(0.65)
        r = p.add_run("• ")
        r.font.color.rgb = rgb(ACCENT)
        r = p.add_run(item)
        r.font.size = Pt(8.6)

    p = right.paragraphs[0]
    r = p.add_run("SPRACHEN UND PERSÖNLICHES")
    r.font.size = Pt(10.2)
    r.font.bold = True
    r.font.color.rgb = rgb(INK)
    set_paragraph_border(p, "bottom", ACCENT, size="8", space="3")
    details = [
        ("Ukrainisch", "Muttersprache"),
        ("Englisch", "B2"),
        ("Deutsch", "B1"),
        ("Polnisch", "A1"),
        ("Geburtsdatum", "26.06.1993"),
        ("Nationalität", "Ukrainisch"),
        ("Aufenthaltsbewilligung", "S"),
        ("Führerausweis", "A, A1, B, B1"),
    ]
    for label, value in details:
        p = right.add_paragraph()
        p.paragraph_format.space_after = Pt(0.65)
        r = p.add_run(f"{label}: ")
        r.font.size = Pt(8.6)
        r.font.bold = True
        r = p.add_run(value)
        r.font.size = Pt(8.6)


def add_working_style(document: Document) -> None:
    add_section_heading(document, "Arbeitsweise und Interessen", compact=True)
    p = document.add_paragraph()
    p.paragraph_format.space_after = Pt(0)
    p.paragraph_format.line_spacing = 1.12
    r = p.add_run(
        "Ich plane Aufgaben nachvollziehbar, prüfe Annahmen und Ergebnisse, dokumentiere Entscheidungen und "
        "spreche Risiken früh an. Bei produktiven Apps ebenso wie bei Labor- und Montagearbeiten übernehme ich "
        "Verantwortung bis zum verlässlichen Ergebnis. Besonders motivieren mich Aufgaben an der Schnittstelle "
        "von Software, Hardware und realer Anwendung. Ausgleich finde ich beim Schach, Klettern, Wandern und Schwimmen."
    )
    r.font.size = Pt(9.1)


def add_portfolio_row(document: Document, qr_path: Path) -> None:
    table = document.add_table(rows=1, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    set_table_fixed(table)
    text_cell, qr_cell = table.rows[0].cells
    set_table_widths(table, [17.3, 1.6])
    for cell in (text_cell, qr_cell):
        cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
        set_cell_margins(cell, top=75, start=0, bottom=45, end=60)
        set_cell_borders(cell, top=("single", "8", ACCENT))
    p = text_cell.paragraphs[0]
    p.paragraph_format.space_after = Pt(2)
    r = p.add_run("Portfolio und Projektnachweise")
    r.font.size = Pt(9.2)
    r.font.bold = True
    r.font.color.rgb = rgb(INK)
    p = text_cell.add_paragraph()
    p.paragraph_format.space_after = Pt(0)
    add_hyperlink(p, "viktoryevtushenko.com", PORTFOLIO_URL, color=ACCENT, underline=False)
    p = qr_cell.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p.paragraph_format.space_after = Pt(0)
    shape = p.add_run().add_picture(str(qr_path), width=Cm(1.18), height=Cm(1.18))
    shape._inline.docPr.set("title", "Portfolio QR Code")
    shape._inline.docPr.set("descr", "QR-Code zum Portfolio viktoryevtushenko.com")


def add_page_two(document: Document, qr_path: Path) -> None:
    document.add_page_break()
    add_compact_header(document, "Lebenslauf")
    add_continuing_education(document)
    add_projects(document)
    add_key_competencies(document)
    add_certificates_and_personal(document)
    add_working_style(document)
    add_portfolio_row(document, qr_path)


FULL_SKILL_GROUPS = [
    (
        "Apple Plattformen und Sprachen",
        "Swift, Objective-C, SwiftUI, UIKit, iOS, iPadOS, macOS, Core Data, Combine, CloudKit, "
        "Auto Layout, Apple Human Interface Guidelines, Xcode",
    ),
    (
        "Architektur und SDK Entwicklung",
        "MVC, MVVM, MVP, VIPER, Clean Architecture, Coordinator, Dependency Injection, Modular Design, "
        "System Architecture, SDK Design, API Design, Swift Package Manager, CocoaPods",
    ),
    (
        "Performance Qualität und Delivery",
        "Instruments, Profiling, Memory Management, Concurrency, GCD, Async Await, Networking Optimization, "
        "Unit Testing, UI Testing, Debugging, CI CD, Xcode Cloud, App Store Releases, Production Support",
    ),
    (
        "Backend Cloud und Networking",
        "Firebase, Firestore, Firebase Auth, Crashlytics, Cloud Functions, REST APIs, GraphQL, URLSession, "
        "Alamofire, JSON, Codable, XML, WebSockets, AWS SDKs, Secure Storage, Encryption",
    ),
    (
        "Realtime Media AR und AI",
        "APNS, Push Notifications, Silent Push, Realtime Presence, VoIP, CallKit, WebRTC, Twilio, AgoraRTC, "
        "TURN STUN, AVFoundation, Custom Video Player, CoreAnimation, ARKit, SceneKit, RoomPlan, "
        "3D Visualization, Geometry Calculations, Create ML, Core ML, OpenAI APIs",
    ),
    (
        "Payments Maps und Produktintegrationen",
        "StoreKit, Apple Pay, PassKit, Apple Wallet, Subscriptions, In App Purchases, Receipt Validation, "
        "Deep Links, Universal Links, Apple Maps, Google Maps SDK, ArcGIS, Location Services, "
        "Multilingual UI, RTL Support",
    ),
    (
        "Tools und Zusammenarbeit",
        "Git, GitHub, SourceTree, Figma, Zeplin, Canvas, Trello, Asana, Jira, Notion, Agile, Scrum, "
        "Product Ownership, Requirements Analysis, Technical Documentation, Team Collaboration",
    ),
    (
        "Embedded Systems und Elektronik",
        "AVR Microcontrollers, Assembly, Low Level Programming, Registers, Embedded Systems, Electronics, "
        "Circuit Design, Circuit Schematics, PCB Understanding, Electronic Components, Soldering, "
        "Measurement Devices, Power Supplies, Signal Processing, Hardware Development",
    ),
    (
        "Labor Halbleiter und Werkstoffe",
        "Nanotechnology, Micro and Nanoelectronics, Semiconductor Materials, Crystal Structures, Thin Films, "
        "CdS, Porous Anodic Aluminium Oxide, Close Spaced Sublimation, Vacuum Systems, X Ray Diffraction, "
        "UV Vis Spectrophotometry, STM Microscopy, Materials Analysis, Experimental Setup, Lab Research",
    ),
    (
        "RF Telekom und Feldeinsatz",
        "RF Systems, Telecom Equipment, Communication Hardware, Base Station Installation, Antenna Systems, "
        "Antenna Alignment and Calibration, Signal Measurement, Cable Splicing, Cross Connection, "
        "Modular Connectors, Network Installation, Network Troubleshooting, Tower and Mast Installation",
    ),
    (
        "Industrie Sicherheit und Führung",
        "Industrial Rope Access, Work at Height, Rigging and Safety Systems, High Altitude Safety, "
        "Confined Spaces, Field Equipment Testing, Technical Maintenance, Team Leadership, "
        "Daily Task Planning, Troubleshooting, System Integration, Engineering Analysis",
    ),
    (
        "Arbeitsweise",
        "Analytisches Denken, strukturierte Problemlösung, Präzision, Verantwortung, schnelle Einarbeitung, "
        "interdisziplinäre Zusammenarbeit, langfristige Wartbarkeit, selbstständige Umsetzung",
    ),
]


def add_skills_appendix(document: Document) -> None:
    document.add_page_break()
    add_compact_header(document, "Technisches Profil")
    add_section_heading(document, "Vollständiges Kompetenzprofil", compact=True)
    p = document.add_paragraph(
        "Die folgenden Kompetenzen bündeln meine Erfahrung in Software, Hardware, Forschung und technischer Praxis. "
        "Projektnachweise und Zertifikate sind über das Portfolio im QR-Code auf Seite 2 verfügbar."
    )
    p.paragraph_format.space_after = Pt(5)
    p.paragraph_format.line_spacing = 1.1
    for r in p.runs:
        r.font.size = Pt(9.2)
        r.font.color.rgb = rgb(MUTED)

    table = document.add_table(rows=6, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    set_table_fixed(table)
    for index, (title, skills) in enumerate(FULL_SKILL_GROUPS):
        cell = table.rows[index // 2].cells[index % 2]
        set_cell_width(cell, 9.45)
        set_cell_margins(cell, top=95, start=0 if index % 2 == 0 else 135, bottom=95, end=110)
        set_cell_borders(cell, bottom=("single", "6", BORDER))
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(2)
        r = p.add_run(title)
        r.font.size = Pt(9.6)
        r.font.bold = True
        r.font.color.rgb = rgb(ACCENT)
        p = cell.add_paragraph(skills)
        p.paragraph_format.space_after = Pt(0)
        p.paragraph_format.line_spacing = 1.08
        for r in p.runs:
            r.font.size = Pt(8.45)
        keep_row_together(table.rows[index // 2])

    add_section_heading(document, "Weitere Projekterfahrung", compact=True)
    p = document.add_paragraph()
    p.paragraph_format.space_after = Pt(2)
    r = p.add_run("Movement Vault")
    r.bold = True
    p.add_run("  Custom Video Player, Architektur und StoreKit  |  ")
    r = p.add_run("Freespoke und Uncover")
    r.bold = True
    p.add_run("  Production Support, Performance, UI und Social Features")
    p = document.add_paragraph()
    p.paragraph_format.space_after = Pt(2)
    r = p.add_run("KAI KeyboardAI und Oki AI")
    r.bold = True
    p.add_run("  OpenAI-Integration, Kontext und In-App Purchases  |  ")
    r = p.add_run("InChargeHealth")
    r.bold = True
    p.add_run("  Medikamenten- und Erinnerungsmanagement mit Firebase")
    for paragraph in document.paragraphs[-2:]:
        for r in paragraph.runs:
            r.font.size = Pt(8.6)

    add_section_heading(document, "Persönliche Interessen", compact=True)
    p = document.add_paragraph(
        "Embedded Systems und Hardware Software Integration, neue Engineering Technologien, Schach, "
        "Klettern, Wandern, Schwimmen und Reisen."
    )
    p.paragraph_format.space_after = Pt(0)
    for r in p.runs:
        r.font.size = Pt(8.8)


def create_document(full: bool) -> Path:
    portrait = prepare_portrait()
    qr_path = make_qr()
    document = Document()
    configure_document(document, full)
    add_page_one(document, portrait)
    add_page_two(document, qr_path)
    if full:
        add_skills_appendix(document)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    name = "Viktor_Yevtushenko_CV_Branded_Full_DE.docx" if full else "Viktor_Yevtushenko_CV_Branded_DE.docx"
    output = OUT_DIR / name
    document.save(output)
    return output


def main() -> None:
    print(create_document(full=False))
    print(create_document(full=True))


if __name__ == "__main__":
    main()
