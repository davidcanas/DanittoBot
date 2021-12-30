import dotenv from 'dotenv';
import DaniClient  from "./src/structures/Client"
import database from "mongoose"
import { green, yellow } from 'chalk';
import CommandContext from './src/structures/CommandContext';
import { Message } from 'eris';

dotenv.config()
const client = new DaniClient()
database.connect(process.env.MONGODB as string).then(a => console.log(`A ${yellow("database")} foi iniciada com ${green("sucesso")}`))

client.loadCommands()
client.loadEvents()
client.connect()
export default client