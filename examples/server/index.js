import express from "express";
import multer from "multer";
import akave from "akave-client";
import fs from "fs";
import os from "os";
import cors from "cors";

const app = express();
app.use(cors());
const upload = multer({ dest: os.tmpdir() });

app.post("/upload/:bucket", upload.single("file"), async (req, res) => {
    try {
        const { bucket } = req.params;

        const filePath = req.file.path;
        if (!filePath) return res.status(400).json({ error: "File is required" });

        const fileStream = fs.createReadStream(filePath);
        const result = await akave.uploadFile(bucket, fileStream);

        res.status(200).json({ message: "File uploaded successfully", data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/files/:bucket", async (req, res) => {
    try {
        const { bucket } = req.params;
        const files = await akave.listFiles(bucket);

        const fileURLs = files.map((file) => {
            const fileUrl = `${req.protocol}://${req.get("host")}/files/${bucket}/${file.Name}`;
            return { Name: file.Name, URL: fileUrl };
        });

        res.status(200).json({ files: fileURLs });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/files/:bucket/:fileName", async (req, res) => {
  try {
    const { bucket, fileName } = req.params;

    const stream = await akave.downloadFile(bucket, fileName);
    stream.pipe(res);

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  try {
    await akave.createBucket('images')
  } catch (e) { }

  console.log(`Server is running on port ${PORT}`);
});
