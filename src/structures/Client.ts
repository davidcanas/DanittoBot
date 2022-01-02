import fs from "fs"
import {
	ApplicationCommandOption,
	ApplicationCommandStructure,
	Client,
	ClientOptions
} from "eris"
import { Command, Utils } from "../typings/index"
import botDB from "../models/botDB"
import guildDB from "../models/guildDB"
import cmds from "../models/cmds"
import users from "../models/userDB"
import Embed from "./Embed"
import levDistance from "../utils/levenshteinDistance"
import levenshteinDistance from "../utils/levenshteinDistance"


export default class DaniClient extends Client {
	commands: Array<Command>;
	db: {
		bot: typeof botDB;
		guild: typeof guildDB;
		cmds: typeof cmds;
		users: typeof users;
	}
	utils: Utils
	embed: typeof Embed
	constructor() {

		const clientOptions: ClientOptions = {
			allowedMentions: {
				everyone: false
			},
			intents: 32767,
			restMode: true,
			defaultImageFormat: "png",
			defaultImageSize: 2048
		}

		super(process.env.DANITOKEN as string, clientOptions)
		this.commands = []
		this.db = {
			bot: botDB,
			guild: guildDB,
			cmds: cmds,
			users: users
		}
		this.utils = {
			levDistance: levenshteinDistance
		}
		this.embed = Embed
	}
	connect(): Promise<void> {
		return super.connect()
	}
	loadCommands(): void {

		fs.readdirSync("./src/commands").forEach(folder => {

			fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith(".ts")).forEach(file => {

				const DaniCommand = require(`../commands/${folder}/${file}`).default
				this.commands.push(new DaniCommand(this))


			})

		})
		this.commands.forEach(async cmd => {
			//			const listOfSlashCommands = await this.getCommands()
			//		console.log(listOfSlashCommands)


		this.createCommand({
				name: cmd.name,
				description: cmd.description,
				options: cmd.options as ApplicationCommandOption[],
				type: 1
			}); //Create a user context menu

		})
	}
	loadEvents(): void {

		fs.readdirSync("./src/events").filter(f => f.endsWith(".ts")).forEach(f => {
			const DaniEvent = new (require(`../events/${f}`).default)(this)
			const eventName = f.split(".")[0]

			if (eventName === "ready") {
				super.once("ready", (...args) => DaniEvent.run(...args))


			} else {
				super.on(eventName, (...args) => DaniEvent.run(...args))
			}
		})
	}

}