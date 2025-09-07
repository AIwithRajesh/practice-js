import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
app.use(cors());

// Save files in the "uploads" folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

app.get("/", (req, res) => {
  res.send("success");
});

const upload = multer({ storage });

// Route for uploading a single file
app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file); // Info about the file (path, size, name, etc.)
  res.send("File uploaded successfully!");
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/download", (req, res) => {
  const filepath = path.join(__dirname, "uploads/12th.pdf.pdf");
  const stat = fs.statSync(filepath);

  res.writeHead(200, {
    "content-type": "application/pdf",
    "content-length": stat.size,
  });

  const streamRead = fs.createReadStream(filepath);
  streamRead.pipe(res);
});

app.listen(8080, () => console.log("Server running on port 8080"));
