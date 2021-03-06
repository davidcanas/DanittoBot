import Command from "../../structures/Command"
import Client from "../../structures/Client"
import CommandContext from "../../structures/CommandContext"

export default class Eval extends Command {
	constructor(client: Client) {
		super(client, {
			name: "eval",
			description: "a",
			category: "Owner",
			aliases: ["execute"],
			options: []
		})
	}

	async execute(ctx: CommandContext): Promise<void> {

		try {

			if (ctx.author.id !== "733963304610824252" && ctx.author.id !== "718078381199065150" && ctx.author.id !== "852650555254767676" && ctx.author.id !== "334054158879686657") {
				ctx.sendMessage({
					content: "Apenas meu criador",
					flags: 1 << 6
				})
				return
			}
			const texto = ctx.args.join(" ")
			if (!texto) {
				ctx.sendMessage(`<@${ctx.author.id}> Insira algo para ser executado!`)
				return
			}
			const start = process.hrtime()

			let code = eval(texto)
			if (code instanceof Promise) code = await code
			if (typeof code !== "string") code = require("util").inspect(code, {
				depth: 0
			})

			code = code.split(process.env.ERIS_DOCS).join("SECRET_CODE")
			code = code.split(process.env.BOT_TOKEN).join("SECRET_CODE")
			code = code.split(process.env.MONGOURI).join("SECRET_CODE")
			const stop = process.hrtime(start)
			if (code.length > 1750) {

				ctx.sendMessage(`Como o codigo passou dos 1800 caracteres envio NADA\n||(Tempo de Execução: ${((stop[0] * 1e9) + stop[1]) / 1e6}ms )||`)

				return
			}
			const evalBed = new this.client.embed()
				.setTitle("Eval Executado:")
				.setDescription(`\`\`\`js\n${code}\n\`\`\`\n**Tempo de Execução:**\n\`\`\`\n${((stop[0] * 1e9) + stop[1]) / 1e6}ms \n\`\`\``)

				.setColor("GREEN")
			ctx.sendMessage({
				embed: evalBed,
				components: [{
					type: 1,
					components: [{
						type: 2,
						style: 2,
						label: "🚮 Apagar Eval",
						disabled: false,
						custom_id: "delmsgeval"

					}]
				}]
			})





		} catch (e) {
			const errBed = new this.client.embed()
				.setTitle("Ocorreu um erro:")
				.setDescription(`\`\`\`js\n${e}\n\`\`\``)
				.setColor("RED")
			ctx.sendMessage({
				embed: errBed,
				components: [{
					type: 1,
					components: [{
						type: 2,
						style: 2,
						label: "🚮 Apagar Erro",
						disabled: false,
						custom_id: "delmsgeval"

					}]
				}]
			})

		}
	}
}