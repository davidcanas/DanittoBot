import dotenv from "dotenv"
import DaniClient from "./src/structures/Client"
import database from "mongoose"
import { green, yellow } from "chalk"

dotenv.config()
const client = new DaniClient()
database.connect(process.env.MONGODB as string).then(() => console.log(`A ${yellow("database")} foi iniciada com ${green("sucesso")}`))


client.loadEvents()
setTimeout(() => {
    client.loadCommands() 
}, 5000);
client.connect()
export default client
