import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carpetas de destino
export const directArchivo = "/archivos";
export const directImagen = "/imagenes";

const archivosFolder = path.join(__dirname, "../uploads", directArchivo);
const imagenesFolder = path.join(__dirname, "../uploads", directImagen);

// Crear carpetas si no existen
if (!fs.existsSync(archivosFolder)) {
  fs.mkdirSync(archivosFolder, { recursive: true });
}
if (!fs.existsSync(imagenesFolder)) {
  fs.mkdirSync(imagenesFolder, { recursive: true });
}

// Storage para archivos generales
const storageArchivos = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, archivosFolder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Storage para imágenes
const storageImagenes = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagenesFolder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const storageMemory = multer.memoryStorage();

// Middlewares exportados
export const uploadArchivos = multer({ storage: storageArchivos });
export const uploadImagenes = multer({ storage: storageImagenes });

export const uploadArchivosMemory = multer({ storage: storageMemory });

export const saveArchivoToDisk = (file) => {
  try {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    const filePath = path.join(archivosFolder, uniqueName);

    fs.writeFileSync(filePath, file.buffer);

    return {
      nombreArchivo: file.originalname,
      rutaArchivo: path.posix.join(directArchivo, uniqueName),
    };
  } catch (error) {
    console.error("Error al guardar el archivo en disco:", error);
    throw new Error("No se pudo guardar el archivo");
  }
};

export const deleteArchivoFromDisk = (rutaArchivo) => {
  try {
    const filePath = path.join(__dirname, "../uploads", rutaArchivo);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error("Error eliminando archivo del disco:", error);
  }
};
