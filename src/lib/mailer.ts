import nodemailer from "nodemailer";

const DESTINATARIOS = [
  "yuri.matos@bmncontabilidade.com",
];

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

export type CampoEmail = { label: string; valor: string };

// Os valores vêm do formulário do site: escapar para ninguém injetar HTML ou links no e-mail.
function escaparHtml(texto: string) {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function enviarEmailLead(assunto: string, campos: CampoEmail[]) {
  const emailRespondente = campos.find((c) =>
    c.label.toLowerCase().includes("e-mail")
  )?.valor;

  const textoLinhas = campos.map((c) => `${c.label}: ${c.valor}`).join("\n");
  const htmlLinhas = campos
    .map(
      (c) =>
        `<tr><td style="padding:6px 16px 6px 0;font-weight:600;color:#0b3f5e;vertical-align:top;white-space:nowrap;">${escaparHtml(c.label)}</td><td style="padding:6px 0;">${escaparHtml(c.valor).replace(/\n/g, "<br />")}</td></tr>`
    )
    .join("");

  await getTransporter().sendMail({
    from: `"Site BMN Contabilidade" <${process.env.SMTP_USER}>`,
    to: DESTINATARIOS,
    replyTo: emailRespondente,
    subject: assunto,
    text: textoLinhas,
    html: `<table cellpadding="0" cellspacing="0">${htmlLinhas}</table>`,
  });
}
