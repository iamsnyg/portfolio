import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const name = (body?.name || '').trim();
    const email = (body?.email || '').trim();
    const message = (body?.message || '').trim();

    const errors = {};
    if (!name) errors.name = 'Name is required';
    if (!email) errors.email = 'Email is required';
    else if (!isValidEmail(email)) errors.email = 'Enter a valid email';
    if (!message) errors.message = 'Message is required';
    else if (message.length < 10) errors.message = 'Message should be at least 10 characters';

    if (Object.keys(errors).length) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // Ensure SMTP env vars are present
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE,
      SMTP_USER,
      SMTP_PASS,
      CONTACT_TO_EMAIL,
      CONTACT_FROM_EMAIL,
    } = process.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
      console.error('[Contact] Missing SMTP config:', { SMTP_HOST: !!SMTP_HOST, SMTP_USER: !!SMTP_USER, SMTP_PASS: !!SMTP_PASS, CONTACT_TO_EMAIL: !!CONTACT_TO_EMAIL });
      return NextResponse.json(
        { ok: false, error: 'Email not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL in .env.local' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: (SMTP_SECURE || 'false') === 'true',
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    // Verify SMTP connection before sending
    try {
      await transporter.verify();
    } catch (verifyErr) {
      console.error('[Contact] SMTP verify failed:', verifyErr.message);
      return NextResponse.json(
        { ok: false, error: `SMTP connection failed: ${verifyErr.message}` },
        { status: 500 }
      );
    }

    const subject = `New portfolio message from ${name}`;
    const text = `New Contact Message\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n--\nSent from portfolio contact form`;
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 16px;">
        <h2 style="margin:0 0 12px">New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p style="white-space:pre-wrap"><strong>Message:</strong><br/>${message}</p>
        <hr/>
        <p style="color:#64748b">Sent from portfolio contact form</p>
      </div>
    `;

    try {
      await transporter.sendMail({
        from: CONTACT_FROM_EMAIL || SMTP_USER,
        to: CONTACT_TO_EMAIL,
        replyTo: email,
        subject,
        text,
        html,
      });
      console.log('[Contact] Email sent successfully to', CONTACT_TO_EMAIL);
      return NextResponse.json({ ok: true, message: 'Thanks! Your message has been sent.' }, { status: 200 });
    } catch (err) {
      console.error('[Contact] email send error:', err.message);
      return NextResponse.json({ ok: false, error: `Failed to send email: ${err.message}` }, { status: 500 });
    }
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Invalid request body' }, { status: 400 });
  }
}
