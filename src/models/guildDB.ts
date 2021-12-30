import { Schema, model, Document } from 'mongoose';

interface guildDB extends Document {
    guildID: string;
    Settings: {
        lang: string;
        prefix: string
    }
}

const guildDB: Schema = new Schema({
    guildID: {
        type: String,
        required: true
    },

    Settings: {
        lang: {
            type: String,
            default: "pt"
        },
        prefix: {
            type: String
        },

    }

}, {
    versionKey: false
});

export default model<guildDB>("Guild", guildDB);
