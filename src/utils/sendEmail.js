import nodemailer from "nodemailer";

/**
 * Envía un correo electrónico con contenido HTML.
 * @param {string} to - Correo del destinatario.
 * @param {string} subject - Asunto del correo.
 * @param {string} htmlContent - Contenido HTML del correo.
 */

export const sendEmail = async ({ from, to, subject, htmlContent }) => {
  try {
    if (!to) throw new Error("Debe especificarse un correo de destino.");
    if (!subject)
      throw new Error("Debe especificarse un asunto para el correo.");
    if (!htmlContent) throw new Error("Debe especificarse contenido HTML.");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from,
      to,
      subject,
      html: htmlContent,
    });

    return true;
  } catch (error) {
    console.error("Error al enviar el correo:", error.message);
    throw error;
  }
};
