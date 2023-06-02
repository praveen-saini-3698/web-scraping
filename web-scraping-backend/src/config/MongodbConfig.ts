import { config } from 'dotenv';
import { ConnectOptions, connect } from "mongoose";
config();

let { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

DB_HOST = ['localhost', '127.0.0.1', '0.0.0.0'].includes(DB_HOST as string) ? '0.0.0.0' : DB_HOST;

const connectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

let options: ConnectOptions = {
    autoIndex: true,
    dbName: DB_NAME
};
if (DB_USER && DB_PASSWORD) {
    options.auth = {
        username: DB_USER,
        password: DB_PASSWORD
    }
}

export const Connection = connect(connectionString, options);