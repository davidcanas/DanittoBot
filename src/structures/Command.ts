import Client from './Client'
import { CommandSettings } from '../typings'
export default class Command implements CommandSettings {
    client: Client;
    description: string;
    name: string;
    aliases?: Array<string>;
    category: "Owner" | "Util" | "Info" | "Fun"
    devOnly: boolean;

    constructor(client: Client, options: CommandSettings) {
        this.client = client;
        this.name = options.name;
        this.description = options.description;
        this.aliases = options.aliases;
        this.category = options.category;
        this.devOnly = options.devOnly;

    }
}