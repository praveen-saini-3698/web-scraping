import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import ScrapController from './controller/ScrapController';
import { Connection } from './config';
import FileController from './controller/FileController';

config();

const app = express();
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

app.use('/scrapper', ScrapController);
app.use('/file', FileController);

(async () => {
    try {
        await Connection;
        console.log("Database connection established.");
    } catch (error) {
        console.log("Database connection error: ", error);
    }
})();

app.listen(
    process.env.APP_PORT,
    () => console.log(`Server is running on: http://localhost:${process.env.APP_PORT}`)
);