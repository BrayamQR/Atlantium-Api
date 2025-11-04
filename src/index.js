import express from "express";
import cors from "cors";
import sequelize from "./config/db.js";
import { createServer } from "http";
import { Server } from "socket.io";
import passport from "passport";
import "./config/passportConfig.js";
import "./models/modelosSetup.js";
import PerfilRoutes from "./routes/perfil.route.js";
import UsuarioRoutes from "./routes/usuario.route.js";
import MenuRoutes from "./routes/menu.route.js";
import MenuByPerfilRoutes from "./routes/menubyperfil.route.js";
import TramiteRoutes from "./routes/tramite.route.js";
import ArchivoRoutes from "./routes/archivo.route.js";
import TipoPersonaRoutes from "./routes/tipopersona.route.js";
import GenericListRoutes from "./routes/genericlist.route.js";
import EncargadoRoutes from "./routes/encargado.route.js";
import ChatRoutes from "./routes/chat.route.js";
import ObservacionRoutes from "./routes/observacion.route.js";
import ComentarioRoutes from "./routes/comentario.route.js";
import PagoRoutes from "./routes/pago.route.js";
import SolicitudRoutes from "./routes/solicitud.route.js";
import VariablesRoutes from "./routes/variables.route.js";
import AuthRoutes from "./routes/auth.route.js";
import ExtertalApisRoutes from "./routes/externalapis.route.js";
import path from "path";
import { fileURLToPath } from "url";
import { seedTipoSociedad } from "./seeds/tiposociedad.seed.js";
import { seedMenu } from "./seeds/menu.seed.js";
import { seedEtapa } from "./seeds/etapa.seed.js";
import { seedPerfil } from "./seeds/perfil.seed.js";
import { seedEstadoPago } from "./seeds/estadopago.seed.js";
import { seedMenuByPerfil } from "./seeds/permisos.seed.js";
import "./jobs/chat.job.js";

const port = process.env.PORT ?? 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:4200";
const app = express();
const server = createServer(app);

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    credentials: true,
  },
});

app.use(express.json());
app.use(passport.initialize());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas
app.use("/api/profile", PerfilRoutes);
app.use("/api/user", UsuarioRoutes);
app.use("/api/menu", MenuRoutes);
app.use("/api/permissions", MenuByPerfilRoutes);
app.use("/api/process", TramiteRoutes);
app.use("/api/file", ArchivoRoutes);
app.use("/api/typeperson", TipoPersonaRoutes);
app.use("/api/genericlist", GenericListRoutes);
app.use("/api/incharge", EncargadoRoutes);
app.use("/api/chat", ChatRoutes);
app.use("/api/obs", ObservacionRoutes);
app.use("/api/coment", ComentarioRoutes);
app.use("/api/pay", PagoRoutes);
app.use("/api/request", SolicitudRoutes);
app.use("/api/var", VariablesRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/external", ExtertalApisRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("<h1>Este es el servidor</h1>");
});

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.set("io", io);

const onlineUsers = {};

io.on("connection", (socket) => {
  socket.on("register_user", ({ idUsuario }) => {
    const roomName = `usuario_${idUsuario}`;
    socket.join(roomName);
    onlineUsers[idUsuario] = socket.id;

    socket.broadcast.emit("usuario_conectado", { idUsuario, online: true });

    const usuariosOnline = Object.keys(onlineUsers).map((id) => ({
      idUsuario: parseInt(id),
      online: true,
    }));
    socket.emit("usuarios_online_actuales", usuariosOnline);

    io.to(roomName).emit("usuario_conectado", { idUsuario, online: true });
  });

  socket.on("join_chat", ({ idChat }) => {
    const roomName = `chat_${idChat}`;
    socket.join(roomName);
  });

  socket.on("usuario_escribiendo", ({ idChat, idUsuario, escribiendo }) => {
    const roomName = `chat_${idChat}`;
    socket.to(roomName).emit("usuario_escribiendo", { idUsuario, escribiendo });
  });

  socket.on("disconnect", () => {
    const idUsuario = Object.keys(onlineUsers).find(
      (key) => onlineUsers[key] === socket.id
    );

    if (idUsuario) {
      delete onlineUsers[idUsuario];
      io.emit("usuario_conectado", {
        idUsuario: parseInt(idUsuario),
        online: false,
      });
    }
  });
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la base de datos SQL");

    await sequelize.sync({ force: false });

    await seedTipoSociedad();
    await seedMenu();
    await seedEtapa();
    await seedPerfil();
    await seedEstadoPago();
    await seedMenuByPerfil();

    server.listen(port, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error);
  }
};

startServer();
