import Client from "../structures/Client"
import {
	Message
} from "eris"
import CommandContext from "../structures/CommandContext"
export default class InteractionCreate {
	client: Client

	constructor(client: Client) {
		this.client = client
	}

	async run(message: Message) {


		if (message.author.bot) return

		let gRes = await this.client.db.guild.findOne({
			guildID: message.guildID
		})

		if (!gRes) {
			await this.client.db.guild.create({
				guildID: message.guildID,
				Settings: {
					prefix: "d/"
				}
			})
			gRes = await this.client.db.guild.findOne({
				guildID: message.guildID
			})
		}
		const prefix = gRes?.Settings.prefix || "d/"
		if (message.content.startsWith(`<@${this.client.user.id}>`) || message.content.startsWith(`<@!${this.client.user.id}>`)) {
			const embed1 = new this.client.embed()
				.setTitle("Olá " + message.author.username + "#" + message.author.discriminator)
				.setDescription(`Neste servidor o meu prefixo é ${prefix} usa ${prefix}help para veres os meus comandos`)
				.setColor("RANDOM")
				.setFooter("Danithan - 2021")

			return message.channel.createMessage({
				embeds: [embed1]
			})
		}

		if (!message.content.startsWith(prefix)) return

		const args = message.content.slice(prefix.length).split(/ +/)
		const cmd = args.shift()?.toLowerCase()

		if (!cmd) return

		const command = this.client.commands.find(c => c.name === cmd || c.aliases?.includes(cmd))


		const ctx = new CommandContext(this.client, message, args)
		if (command) {
			if (message.author.id !== "733963304610824252") {
				const verifmanu = await this.client.db.bot.findOne({
					botID: this.client.user.id
				})
				if (verifmanu) {
					ctx.sendMessage("Danitto está em manutenção tenta mais tarde novamente ... [Error: 401]")
					return
				}
			}
			command.execute(ctx)


		}
	}
}