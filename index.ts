import express from 'express'
import fs from 'fs'
import multer from 'multer'
import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const app = express();
const PORT: number = 5000;

const upload = multer({ dest: 'temp/' })

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true }); 
}

app.post('/upload', upload.single('file'), (req, res) => {
   
    const tempPath = req.file.path;
    const targetPath = path.join(uploadsDir, req.file.originalname);
    
    const readStream = fs.createReadStream(tempPath);
    const writeStream = fs.createWriteStream(targetPath);

    readStream.pipe(writeStream)

    writeStream.on('finish', () => {
        fs.unlink(tempPath, (err) => {
            if (err) return res.status(500).send("File is not uploaded");
            res.send('File successfully uploaded')
        })
    })

    writeStream.on('error', (err) => {
        console.log("Write error : ", err);
        res.status(500).send("File is not uploaded");
    })
})


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})