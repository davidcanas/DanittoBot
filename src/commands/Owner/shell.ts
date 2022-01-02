const {
	exec
} = require("child_process")
const {
	inspect
} = require("util")
import Command from "../../structures/Command"
import Client from "../../structures/Client"
import CommandContext from "../../structures/CommandContext"

export default class Eval extends Command {
	constructor(client: Client) {
		super(client, {
			name: "shell",
			description: "Executa algo",
			category: "Owner",
			aliases: ["execute"],
			options: []

		})
	}

	async execute(ctx: CommandContext): Promise<void> {
		if (ctx.author.id !== "733963304610824252" && ctx.author.id !== "852650555254767676") {
			ctx.sendMessage("Apenas meu criador")
			return
		}
		const code = ctx.args.join(" ")
		exec(code, (error, stdout) => {
			try {
				const outputType = error || stdout
				let output = outputType

				output = output.length > 1980 ? output.substr(0, 1977) + "..." : output
				return ctx.sendMessage({
					content: "```js\n" + output + "\n```",
					components: [{
						type: 1,
						components: [{
							type: 2,
							style: 2,
							label: "🚮 Apagar Shell",
							custom_id: "delmsgshell"

						}]
					}]
				})
			} catch (err) {
				ctx.sendMessage({
					content: "Erro: " + err,
					components: [{
						type: 1,
						components: [{
							type: 2,
							style: 2,
							label: "🚮 Apagar Erro",
							custom_id: "delmsgshell"

						}]
					}]
				})
			}
		})


	}
}