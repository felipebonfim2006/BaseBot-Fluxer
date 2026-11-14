import Guild from "../../database/models/Guild.js";

export default {
  name: "setprefix",
  aliases: ["prefixo", "prefix"],
  description: "Altera o prefixo do bot no servidor.",
  permissions: ["ManageGuild"],

  async executePrefix(client, message, args) {
    const novoPrefixo = args[0];

    if (!novoPrefixo) {
      return message.reply(
        "Por favor, informe o novo prefixo que deseja definir.",
      );
    }

    try {
      // Atualiza o prefixo no banco de dados
      const guildData = await Guild.findOneAndUpdate(
        { guildId: message.guild.id },
        { $set: { prefix: novoPrefixo } },
        { returnDocument: "after", upsert: true },
      );

      return message.reply(
        `✅ O prefixo do bot foi alterado para: \`${novoPrefixo}\``,
      );
    } catch (error) {
      console.error("Erro ao alterar o prefixo:", error);
      return message.reply(
        "❌ Ocorreu um erro ao tentar alterar o prefixo. Tente novamente mais tarde.",
      );
    }
  },
};
