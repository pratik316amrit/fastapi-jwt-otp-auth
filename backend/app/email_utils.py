# app/email_utils.py
import os
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv
from fastapi import BackgroundTasks
import httpx

load_dotenv()
SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")
EMAIL_FROM = os.getenv("EMAIL_FROM", SMTP_USER)
USE_SENDGRID = os.getenv("USE_SENDGRID", "false").lower() == "true"
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY", "")

def _send_via_smtp(subject: str, to: str, html: str, text: str = ""):
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = EMAIL_FROM
    msg["To"] = to
    msg.set_content(text or " ", subtype="plain")
    msg.add_alternative(html, subtype="html")
    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as s:
        s.starttls()
        s.login(SMTP_USER, SMTP_PASS)
        s.send_message(msg)

def _send_via_sendgrid(subject: str, to: str, html: str, text: str = ""):
    url = "https://api.sendgrid.com/v3/mail/send"
    headers = {"Authorization": f"Bearer {SENDGRID_API_KEY}", "Content-Type": "application/json"}
    payload = {
        "personalizations": [{"to": [{"email": to}], "subject": subject}],
        "from": {"email": EMAIL_FROM},
        "content": [
            {"type": "text/plain", "value": text or " "},
            {"type": "text/html", "value": html}
        ],
    }
    r = httpx.post(url, json=payload, headers=headers)
    r.raise_for_status()

def send_email_background(background_tasks: BackgroundTasks, subject: str, to: str, html: str, text: str = ""):
    if USE_SENDGRID and SENDGRID_API_KEY:
        background_tasks.add_task(_send_via_sendgrid, subject, to, html, text)
    else:
        background_tasks.add_task(_send_via_smtp, subject, to, html, text)
