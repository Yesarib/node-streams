import express from 'express'
import fs from 'fs'
import multer from 'multer'
import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Transform } from 'stream';
const app = express();
const PORT: number = 5000;

const upload = multer({ dest: 'temp/' })

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true }); 
}

app.post('/upload', upload.single('file'), async (req, res) => {
   
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

        // operations here 
        // Example: creating log file or adding logs to log file 
        // Example: db updating 
    })

    writeStream.on('error', (err) => {
        console.log("Write error : ", err);
        res.status(500).send("File is not uploaded");
    })
})

app.post('/upload/chunk', upload.single('file'), async (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(uploadsDir, req.file.originalname);

    const transformStream = new Transform({
        transform(chunk, encoding, callback) {
            console.log('Chunk received:', chunk.toString());
            this.push(chunk.toString().toUpperCase());
            callback();
        }
    });

    const readStream = fs.createReadStream(tempPath);
    const writeStream = fs.createWriteStream(targetPath);

    readStream
        .pipe(transformStream)
        .pipe(writeStream);

    writeStream.on('finish', () => {
        fs.unlink(tempPath, (err) => {
            if (err) return res.status(500).send("File is not uploaded");
            res.send('File successfully uploaded and transformed');
        });
    });

    writeStream.on('error', (err) => {
        console.log("Write error:", err);
        res.status(500).send("File is not uploaded");
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})