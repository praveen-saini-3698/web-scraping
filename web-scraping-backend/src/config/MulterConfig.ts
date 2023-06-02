import multer from "multer";
import { ulid } from "ulid";
import { config } from 'dotenv';
config();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        const fileName = ulid().toLowerCase().concat(file.originalname.toLowerCase().replace(/[^a-zA-Z0-9.]/g, ""));
        cb(null, fileName);
    },
});


export const UploadFilter = multer({ storage }).single('file');
