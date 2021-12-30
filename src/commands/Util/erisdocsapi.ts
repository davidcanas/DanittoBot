import Command from '../../structures/Command';
import Client from '../../structures/Client';
import CommandContext from '../../structures/CommandContext';

export default class erisdocsapi extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'docs',
            description: "Vê as docs do eris",
            category: "Util",
            aliases: ['erisdocs', "eris", "docseris"],
            devOnly: false
        });
    }

    async execute(ctx: CommandContext): Promise<void> {


    }
}