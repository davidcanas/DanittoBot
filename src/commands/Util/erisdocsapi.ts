import Command from "../../structures/Command"
import Client from "../../structures/Client"
import CommandContext from "../../structures/CommandContext"
import fetch from "node-fetch"
export default class erisdocsapi extends Command {
	constructor(client: Client) {
		super(client, {
			name: "docs",
			description: "Vê as docs do eris",
			category: "Util",
			aliases: ["erisdocs", "eris", "docseris"],
			options: []

		})
	}

	async execute(ctx: CommandContext): Promise<void> {

		const docs = await fetch(`${process.env.ERISDOCSAPI}/docs?search=${encodeURIComponent(ctx.args.join(" "))}`).then(a => a.json())
		if (docs.error) {
			ctx.sendMessage({
				content: "Não encontrei nada na documentação do eris.",
				flags: 1 << 6
			})
			return
		}

		ctx.sendMessage({
			embeds: [docs]
		})

	}
}