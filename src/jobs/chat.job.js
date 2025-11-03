import cron from "node-cron";
import * as ChatService from "../services/chat.service.js";
import { sendEmail } from "../utils/sendEmail.js";

const procesarNotificacionesMensajesNoLeidos = async () => {
  try {
    console.log(
      "🕛 Ejecutando proceso de notificaciones de mensajes no leídos..."
    );

    const chatsConNoLeidos = await ChatService.findChatsConMensajesNoLeidos();

    if (!chatsConNoLeidos || chatsConNoLeidos.length === 0) {
      console.log(
        "📭 No hay mensajes no leídos. No se enviarán notificaciones."
      );
      return;
    }

    for (const chat of chatsConNoLeidos) {
      const mensajesNoLeidos = chat.mensaje.filter((m) => !m.estadoMensaje);
      if (mensajesNoLeidos.length === 0) continue;

      const emisores = [...new Set(mensajesNoLeidos.map((m) => m.idUsuario))];
      const participantes = chat.participante.map((p) => p.usuario);
      const receptores = participantes.filter(
        (u) => !emisores.includes(u.idUsuario)
      );

      for (const receptor of receptores) {
        const nombreMostrar = receptor.personaNatural
          ? `${receptor.personaNatural.nomPersona} ${receptor.personaNatural.apePersona}`
          : receptor.personaJuridica?.razonSocial || receptor.emailUsuario;

        const cantidad = mensajesNoLeidos.length;

        // 📧 Construir el HTML del correo
        const htmlContent = `
          <div style="font-family: Arial, sans-serif; background-color: #f6f9fc; padding: 40px;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
              
              <!-- Encabezado -->
              <div style="background: linear-gradient(90deg, #007bff, #0056b3); padding: 20px; color: white; text-align: center;">
                <h2 style="margin: 0;">📩 Tienes mensajes sin leer</h2>
              </div>

              <!-- Cuerpo -->
              <div style="padding: 30px; color: #333;">
                <p>Hola <b>${nombreMostrar}</b>,</p>
                <p>Se detectaron <b>${cantidad}</b> mensaje(s) sin leer.</p>

                <p style="margin-top: 20px;">
                  Ingresa a <b>Atlantium</b> para revisarlos y mantenerte al día con tus conversaciones.
                </p>

                <div style="text-align: center; margin: 30px 0;">
                  <a href="${process.env.FRONTEND_URL}/dashboard/chat" 
                     style="background: #007bff; color: white; text-decoration: none; padding: 12px 25px; border-radius: 8px; font-weight: bold;">
                    Ver chat
                  </a>
                </div>
              </div>

              <!-- Pie -->
              <div style="background: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #666;">
                <p>© ${new Date().getFullYear()} Atlantium. Todos los derechos reservados.</p>
              </div>
            </div>
          </div>
        `;

        await sendEmail({
          from: `"Atlantium Notificaciones" <${process.env.EMAIL_USER}>`,
          to: receptor.emailUsuario,
          subject: "Tienes mensajes sin leer en Atlantium",
          htmlContent: htmlContent,
        });
      }
    }

    console.log("✅ Proceso de notificaciones finalizado.\n");
  } catch (error) {
    console.error("❌ Error en procesarNotificacionesMensajesNoLeidos:", error);
  }
};

cron.schedule("0 0 * * *", procesarNotificacionesMensajesNoLeidos);
