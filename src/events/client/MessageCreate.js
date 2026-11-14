import { Events } from "@fluxerjs/core";
import GuildModel from "../../database/models/Guild.js";
import config from "../../configs/config.json" with { type: "json" };
const prefix = config.prefix;

export default {
  name: Events.MessageCreate,
  once: false,
  async execute(message, client) {
    if (message.author.bot) return;

    // Responde caso o bot for mencionado
    const mentionRegex = new RegExp(`^<@!?${client.user.id}>$`);

    if (message.content.match(mentionRegex)) {
      return message.reply(
        `Olá! 👋 Meu prefixo é \`${prefix}\`. Digite \`${prefix}help\` para ver meus comandos!`,
      );
    }

    // busca o prefixo do servidor no banco de dados
    let guildProfile = await GuildModel.findOne({ guildId: message.guild.id });
    // Se não existir, cria um novo registro com o prefixo padrão
    const prefix = guildProfile ? guildProfile.prefix : config.prefix;

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const comando = client.prefixCommands.get(commandName);
    if (!comando) return;

    // TRAVA DE SEGURANÇA PARA DMs:
    // DMs não têm sistema de permissões. Se o comando exige permissões, barra na hora!
    if (
      !message.guild &&
      comando.permissions &&
      comando.permissions.length > 0
    ) {
      return message.reply(
        "❌ Este comando é exclusivo para servidores e não pode ser usado na DM.",
      );
    }

    // Se estiver em um servidor, faz a checagem normal
    if (message.guild) {
      if (comando.permissions && comando.permissions.length > 0) {
        // 1. Verifica permissão do usuário
        const userHasPerms = comando.permissions.every((perm) =>
          message.member?.permissions?.has(perm),
        );

        if (!userHasPerms) {
          return message.reply(
            `❌ Você não tem permissão para usar este comando. (Necessário: \`${comando.permissions.join(", ")}\`)`,
          );
        }

        // 2. Verifica permissão do bot
        const botMember =
          message.guild.members?.me ||
          message.guild.members?.cache?.get(client.user.id);
        const botHasPerms = comando.permissions.every((perm) =>
          botMember?.permissions?.has(perm),
        );

        if (!botHasPerms) {
          return message.reply(
            `⚠️ Eu não tenho permissão para executar esta ação. (Preciso de: \`${comando.permissions.join(", ")}\`)`,
          );
        }
      }
    }

    // Executa o comando
    try {
      await comando.executePrefix(client, message, args);
    } catch (error) {
      console.error(`Erro ao executar o comando ${commandName}:`, error);

      // O .catch() vazio protege contra mensagens apagadas
      await message
        .reply("Houve um erro interno ao tentar executar esse comando!")
        .catch(() => {});
    }
  },
};
