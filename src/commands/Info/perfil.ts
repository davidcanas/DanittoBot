import Command from "../../structures/Command"
import Client from "../../structures/Client"
import CommandContext from "../../structures/CommandContext"

export default class Help extends Command {
	constructor(client: Client) {
		super(client, {
			name: "profile",
			description: "Vê o perfil de um usuario!",
			category: "Info",
			aliases: ["perfil"],
			options: []

		})
	}

	async execute(ctx: CommandContext): Promise<void> {


    }}