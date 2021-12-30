import Command from '../../structures/Command';
import Client from '../../structures/Client';
import CommandContext from '../../structures/CommandContext';

export default class Help extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'help',
            description: "Vê os comandos do danitto",
            category: "Info",
            aliases: ['ajuda'],

        });
    }

    async execute(ctx: CommandContext): Promise < void > {


        const help = new this.client.embed()
            .setTitle("Ajuda")
            .setDescription("[Clica aqui para veres os meus comandos](https://www.danitto.tk/comandos)")
            .setColor("RANDOM")

        ctx.sendMessage({
            embeds: [help],
            content: "",
        })
    }
}