const { EmbedBuilder } = require("@fluxerjs/core");
const { prefix } = require("../../configs/config.json");

module.exports = {
    name: "help",
    aliases: ["ajuda", "comandos"],
    description: "Lista todos os comandos disponíveis no bot.",

    async executePrefix(client, message, args) {
        const categories = client.commandCategories;

        const embed = new EmbedBuilder()
            .setColor(0x5865f2) // Azul no formato numérico
            .setTitle("🤖 Painel de Ajuda")
            .setDescription(
                `Aqui estão todos os comandos disponíveis. Use \`${prefix}\` antes de cada um:`,
            )
            .setFooter({ text: `Solicitado por: ${message.author.username}` })
            .setTimestamp();

        // Agrupa os comandos por categoria lendo o Map que o nosso Handler criou
        if (categories && categories.size > 0) {
            for (const [categoria, comandos] of categories.entries()) {
                // Deixa a primeira letra da categoria maiúscula (ex: utilidades -> Utilidades)
                const nomeFormatado =
                    categoria.charAt(0).toUpperCase() + categoria.slice(1);

                const listaComandos = comandos
                    .map((cmd) => {
                        const nome = cmd.name;
                        const desc = cmd.description || "Sem descrição";
                        return `\`${prefix}${nome}\` - ${desc}`;
                    })
                    .join("\n");

                embed.addFields({
                    name: `📁 ${nomeFormatado}`,
                    value: listaComandos || "Nenhum comando.",
                    inline: false,
                });
            }
        } else {
            // Fallback: se por acaso não houver categorias, lista tudo solto
            const comandos = client.prefixCommands;
            let lista = "";

            comandos.forEach((cmd) => {
                const nome = cmd.name;
                const desc = cmd.description || "Sem descrição";
                lista += `\`${prefix}${nome}\` - ${desc}\n`;
            });

            embed.addFields({
                name: "📜 Comandos",
                value: lista || "Nenhum comando encontrado.",
                inline: false,
            });
        }

        return message.reply({ embeds: [embed] });
    },
};
