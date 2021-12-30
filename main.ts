import dotenv from "dotenv"
import DaniClient from "./src/structures/Client"
import database from "mongoose"
import {
	green,
	yellow
} from "chalk"

dotenv.config()
const client = new DaniClient()
database.connect(process.env.MONGODB as string).then(() => console.log(`A ${yellow("database")} foi iniciada com ${green("sucesso")}`))

client.loadCommands()
client.loadEvents()
client.connect()
export default client
