import { EmbedBuilder } from "@fluxerjs/core";

export default {
    name: "clear",
    aliases: ["limpar", "c"],
    description: "Apaga mensagens do chat.",
    permissions: ["ManageMessages"],

    async executePrefix(client, message, args) {
        const quantidade = parseInt(args[0], 10);

        if (isNaN(quantidade) || quantidade < 1 || quantidade > 100) {
            // Aqui a mensagem ainda existe, então podemos usar reply!
            return message.reply(
                "Por favor, informe um número válido entre 1 e 100.",
            );
        }

        // 1. TENTA RESGATAR O CANAL DE FORMA SEGURA
        const canal =
            message.channel ||
            client.channels?.cache?.get(message.channelId) ||
            message.guild?.channels?.cache?.get(message.channelId);

        if (!canal) {
            return message.reply(
                "❌ Erro interno: Não foi possível identificar o canal.",
            );
        }

        if (typeof canal.bulkDelete !== "function") {
            return message.reply(
                "❌ A função de apagar em massa não está disponível.",
            );
        }

        try {
            // Apaga o comando original do usuário
            await message.delete().catch(() => {});

            // 2. EXECUTA A LIMPEZA
            await canal.bulkDelete(quantidade);

            // Monta a Embed de confirmação
            const clearEmbed = new EmbedBuilder()
                .setTitle("Limpeza Concluída! 🧹")
                .setDescription(`**${quantidade}** mensagens foram apagadas.`)
                .setColor(0x00ff00)
                .setFooter({
                    text: `Solicitado por: ${message.author.username}`,
                })
                .setTimestamp();

            // 3. USA SEND EM VEZ DE REPLY (já que apagamos a mensagem original)
            const msg = await canal.send({ embeds: [clearEmbed] });

            // Apaga a confirmação após 5 segundos
            setTimeout(() => {
                msg?.delete?.().catch(() => {});
            }, 5000);
        } catch (error) {
            console.error("Erro ao executar o comando clear:", error);
            // Também usamos send no erro pelo mesmo motivo!
            await canal
                .send(
                    "Houve um erro ao tentar apagar as mensagens. (Aviso: O Discord não permite apagar mensagens com mais de 14 dias em massa).",
                )
                .catch(() => {});
        }
    },
};
