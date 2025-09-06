import express from "express";
import multer from "multer";
import cors from "cors";

const app = express();
app.use(cors());

// Save files in the "uploads" folder
const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
  res.send("success");
});

// Route for uploading a single file
app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file); // Info about the file (path, size, name, etc.)
  res.send("File uploaded successfully!");
});

app.listen(8080, () => console.log("Server running on port 8080"));
