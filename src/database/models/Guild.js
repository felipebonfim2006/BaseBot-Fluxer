import { Schema, model } from "mongoose";
import config from "../../configs/config.json" with { type: "json" };

const guildSchema = new Schema({
  guildId: { type: String, required: true, unique: true },
  prefix: { type: String, default: config.prefix }, // Prefixo padrão de segurança
});

export default model("Guild", guildSchema);
