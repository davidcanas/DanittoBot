import { Schema, model, Document } from "mongoose"
interface Profile {
    badges: Array<string>;
    sobremim: string;
}
interface userDB extends Document {
    _id: string;
    profile: Profile[];
    blacklist: boolean;

}

const userDB: Schema = new Schema({
    _id: String,
    profile: {
        badges: {
            type: Array,
            default: ["🌟"]
        },
        sobremim: {
            type: String,
            default: "Danitto é lindo ! (Use d/sobremim para editar esta mensagem)"
        }

    },
    blacklist: Boolean,
}, {
    versionKey: false
})

export default model<userDB>("users", userDB)
