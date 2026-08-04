from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    KeepInFrame,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


OUTPUT = Path(__file__).resolve().parents[1] / "public" / "Gourav-Maurya-Resume.pdf"
PAPER = colors.HexColor("#F2EEE4")
INK = colors.HexColor("#161714")
INDIGO = colors.HexColor("#293B78")
MUTED = colors.HexColor("#5F6059")
RULE = colors.HexColor("#C9C3B6")


def page_background(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
    canvas.setStrokeColor(colors.HexColor("#DDD6C8"))
    canvas.setLineWidth(0.25)
    for x in (15 * mm, 70 * mm, 125 * mm, 180 * mm):
        canvas.line(x, 12 * mm, x, A4[1] - 12 * mm)
    canvas.setFillColor(INDIGO)
    canvas.setFont("Helvetica", 6)
    canvas.drawString(15 * mm, 9 * mm, "GOURAV MAURYA / FIELD RESUME / 2026")
    canvas.drawRightString(A4[0] - 15 * mm, 9 * mm, "28.6139 N / 77.2090 E")
    canvas.restoreState()


styles = getSampleStyleSheet()
name_style = ParagraphStyle(
    "Name", parent=styles["Title"], fontName="Times-Bold", fontSize=31,
    leading=28, textColor=INK, spaceAfter=5, alignment=TA_LEFT,
)
role_style = ParagraphStyle(
    "Role", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=8,
    leading=10, textColor=INDIGO, tracking=1.1, spaceAfter=8,
)
section_style = ParagraphStyle(
    "Section", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=7.8,
    leading=10, textColor=INDIGO, tracking=1.2, spaceBefore=12, spaceAfter=7,
)
heading_style = ParagraphStyle(
    "Heading", parent=styles["Heading3"], fontName="Times-Bold", fontSize=12.5,
    leading=14.5, textColor=INK, spaceBefore=4, spaceAfter=2,
)
sub_style = ParagraphStyle(
    "Sub", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=7.4,
    leading=9.5, textColor=INDIGO, spaceAfter=4,
)
body_style = ParagraphStyle(
    "Body", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.4,
    leading=11.6, textColor=MUTED, spaceAfter=7,
)
small_style = ParagraphStyle(
    "Small", parent=styles["BodyText"], fontName="Helvetica", fontSize=7.5,
    leading=10.4, textColor=MUTED, spaceAfter=5,
)
contact_style = ParagraphStyle(
    "Contact", parent=styles["BodyText"], fontName="Helvetica", fontSize=7.1,
    leading=9, textColor=INK,
)


def section(title):
    return Paragraph(title.upper(), section_style)


def entry(title, subtitle, body):
    return [
        Paragraph(title, heading_style),
        Paragraph(subtitle.upper(), sub_style),
        Paragraph(body, body_style),
    ]


doc = SimpleDocTemplate(
    str(OUTPUT), pagesize=A4, rightMargin=15 * mm, leftMargin=15 * mm,
    topMargin=13 * mm, bottomMargin=14 * mm,
)

story = [
    Paragraph("GOURAV<br/>MAURYA", name_style),
    Paragraph("FULL-STACK AI ENGINEER / CREATIVE DEVELOPER", role_style),
]

contacts = Table([
    [Paragraph("gouravmaurya351@gmail.com", contact_style), Paragraph("+91 7888452117", contact_style), Paragraph("India / Available worldwide", contact_style)],
    [Paragraph('<link href="https://github.com/Gouravmaurya">github.com/Gouravmaurya</link>', contact_style), Paragraph('<link href="https://www.linkedin.com/in/gourav-maurya-a39969226/">LinkedIn / Gourav Maurya</link>', contact_style), Paragraph('<link href="https://www.safarai.in/">safarai.in</link>', contact_style)],
], colWidths=[70 * mm, 48 * mm, 62 * mm])
contacts.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ("RIGHTPADDING", (0, 0), (-1, -1), 4),
    ("TOPPADDING", (0, 0), (-1, -1), 1),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
]))
story += [contacts, Spacer(1, 5), HRFlowable(width="100%", thickness=.6, color=INK), Spacer(1, 4)]
story += [
    section("Profile"),
    Paragraph("Full-stack AI engineer building useful intelligent products from interface to infrastructure. I work across product thinking, frontend systems, APIs, data and AI workflows - turning complexity into clear, inspectable experiences.", body_style),
    Spacer(1, 3),
]

left = [
    section("Instruments"),
    Paragraph("INTERFACE", sub_style),
    Paragraph("React, Next.js, TypeScript, JavaScript, Tailwind CSS, GSAP, Framer Motion, accessibility", small_style),
    Paragraph("SYSTEMS", sub_style),
    Paragraph("Node.js, Express.js, Firebase, MongoDB, REST APIs, Socket.IO, Docker", small_style),
    Paragraph("INTELLIGENCE", sub_style),
    Paragraph("LLM workflows, Gemini API, Hugging Face, prompt systems, structured output", small_style),
    section("Education"),
    Paragraph("B.TECH / COMPUTER SCIENCE & ENGINEERING", sub_style),
    Paragraph("International Institute of Technology and Management, Sonipat<br/>2021 - 2025", body_style),
    section("Practice"),
    Paragraph("AI product engineering<br/>Full-stack systems<br/>Creative development<br/>Product UI and interaction", body_style),
]

right = [
    section("Experience"),
    *entry("Persist Ventures", "Full-stack AI engineer / 2026", "Building AI-enabled product experiences across interface, application logic and data."),
    *entry("Kite Info", "Software engineer / 2025", "Contributed to full-stack product delivery and maintainable web systems."),
    *entry("Independent", "Product builder / 2024", "Designed and developed Safar AI and independent interface experiments."),
    section("Selected territories"),
    *entry("Haven AI", "Concept product / Full-stack AI engineer / 2026", "Real-estate intelligence workspace exploring a continuous route from property discovery through underwriting and AI-assisted analysis. Concept product; no customer or performance claims."),
    *entry("Safar AI", "Personal project / Product and engineering / 2024", "AI travel planner connecting traveller preferences, destinations, routes and editable itineraries using React, Firebase, Gemini API and Google Places."),
    *entry("Task Zen", "Personal project / Full-stack engineering", "Real-time team task platform built with Next.js, Express.js, MongoDB and Socket.IO, including assignment, status filtering and live updates."),
]

columns = Table([[
    KeepInFrame(55 * mm, 175 * mm, left, mode="shrink"),
    KeepInFrame(125 * mm, 175 * mm, right, mode="shrink"),
]], colWidths=[55 * mm, 125 * mm], hAlign="LEFT")
columns.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (0, 0), 0),
    ("RIGHTPADDING", (0, 0), (0, 0), 8),
    ("LEFTPADDING", (1, 0), (1, 0), 10),
    ("RIGHTPADDING", (1, 0), (1, 0), 0),
    ("LINEBEFORE", (1, 0), (1, 0), .45, RULE),
    ("TOPPADDING", (0, 0), (-1, -1), 0),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
]))
story.append(columns)

doc.build(story, onFirstPage=page_background, onLaterPages=page_background)
print(OUTPUT)
