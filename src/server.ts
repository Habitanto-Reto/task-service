import * as process from "process";
import {Database} from "./domain/entities/database";
import {Server} from "./main";

const mongoUsername = process.env.DB_ADMIN;
const mongoPassword = process.env.DB_ADMIN_PWD;
const mongoDbName = process.env.DB_NAME;
const mongoHost = process.env.DB_HOST;
const mongoPort = process.env.DB_PORT;

const mongoUri = `mongodb://${mongoUsername}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDbName}`;

const database = new Database(mongoUri);
const port = process.env.PORT || 3000;
const server = new Server(port, database);

server.start().then(r => console.log('🟢 Server TASK started', r));