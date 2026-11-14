import { EmbedBuilder } from "@fluxerjs/core";

export default {
  name: "ping",
  aliases: ["latencia", "p"],
  description: "Retorna o tempo de resposta.",

  async executePrefix(client, message, args) {
    const latencia = client.ws?.ping ? `${client.ws.ping}ms` : "Calculando...";

    const pingEmbed = new EmbedBuilder()
      .setTitle("Pong! 🏓")
      .setDescription(`A latência atual é: **${latencia}**`)
      .setColor(0x5865f2)
      .setFooter({ text: `Solicitado por: ${message.author.username}` })
      .setTimestamp();

    await message.reply({ embeds: [pingEmbed] });
  },
};
