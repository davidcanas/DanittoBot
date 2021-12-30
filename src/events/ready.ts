import {
	green,
	yellow
} from "chalk"
import Client from "../structures/Client"

export default class ready {
	client: Client

	constructor(client: Client) {
		this.client = client
	}

	async run() {
		console.log(`O ${yellow("client")} foi conectado com ${green("sucesso")}`)
		const activities = [
			"Utilize d/help para obter ajuda ",
			`Estou em ${this.client.guilds.size} servidores!`,
			" Versão 3.9| Grande atualização em breve",
			`😃 Já Conheço ${this.client.users.size} usuários ! `,
			"🎃 Feliz Halloween !"
		]
		let i = 0
		setInterval(async () => {
			this.client.editStatus("online", {
				name: `${activities[i++ % activities.length]}`,
				type: 0
			})

		}, 15000)
	}
}