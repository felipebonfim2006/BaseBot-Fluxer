import { EmbedBuilder } from "@fluxerjs/core";

export default {
  name: "avatar",
  aliases: ["av", "foto"],
  description: "Retorna a imagem de perfil do usuário ou do mencionado.",

  async executePrefix(client, message, args) {
    // Define o autor da mensagem como padrão
    let usuario = message.author;

    // Tenta capturar a menção de forma segura, testando as estruturas possíveis do Fluxer
    if (message.mentions) {
      if (typeof message.mentions.users?.first === "function") {
        usuario = message.mentions.users.first() || message.author;
      }
      // Se as menções estiverem numa Array normal chamada 'users'
      else if (
        Array.isArray(message.mentions.users) &&
        message.mentions.users.length > 0
      ) {
        usuario = message.mentions.users[0];
      }
      // Se as menções estiverem direto na propriedade 'mentions'
      else if (Array.isArray(message.mentions) && message.mentions.length > 0) {
        usuario = message.mentions[0];
      }
    }

    // Tenta pegar o link do avatar (com fallbacks de segurança)
    let avatarURL = "";

    if (typeof usuario.displayAvatarURL === "function") {
      avatarURL = usuario.displayAvatarURL({ size: 4096, dynamic: true });
    } else if (typeof usuario.avatarURL === "function") {
      avatarURL = usuario.avatarURL({ size: 4096, dynamic: true });
    } else if (usuario.avatar) {
      // Caso o Fluxer não tenha função de imagem e devolva apenas o "código" (hash) da foto do Discord:
      // Ele monta o link da imagem manualmente direto dos servidores do Discord!
      avatarURL = `https://cdn.discordapp.com/avatars/${usuario.id}/${usuario.avatar}.png?size=4096`;
    } else {
      // Caso o usuário não tenha foto, ou não consiga puxar
      avatarURL = "https://cdn.discordapp.com/embed/avatars/0.png"; // Avatar padrão cinza
    }

    // Monta a Embed
    const avatarEmbed = new EmbedBuilder()
      .setTitle(`Avatar de ${usuario.username || "Usuário"}`)
      .setColor(0x5865f2) // Azul
      .setImage(avatarURL)
      .setFooter({ text: `Solicitado por: ${message.author.username}` })
      .setTimestamp();

    // Envia a resposta
    await message.reply({ embeds: [avatarEmbed] });
  },
};
