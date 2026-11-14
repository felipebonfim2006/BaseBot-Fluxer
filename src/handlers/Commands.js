import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async (client) => {
    client.prefixCommands = new Map();
    client.commandCategories = new Map();

    const pastaComandosPath = path.join(__dirname, "../commands");
    const categorias = fs.readdirSync(pastaComandosPath);

    for (const categoria of categorias) {
        const caminhoCategoria = path.join(pastaComandosPath, categoria);

        if (!fs.statSync(caminhoCategoria).isDirectory()) continue;

        const arquivos = fs
            .readdirSync(caminhoCategoria)
            .filter((file) => file.endsWith(".js"));

        if (!client.commandCategories.has(categoria)) {
            client.commandCategories.set(categoria, []);
        }

        for (const arquivo of arquivos) {
            const { default: comando } = await import(
                pathToFileURL(path.join(caminhoCategoria, arquivo)).href
            );
            comando.category = categoria;

            // Verifica apenas se é um comando de prefixo válido
            if (comando.name && comando.executePrefix) {
                // Registra o comando principal
                client.prefixCommands.set(comando.name, comando);

                // Registra os aliases (outros nomes para o mesmo comando), se houver
                if (comando.aliases && Array.isArray(comando.aliases)) {
                    comando.aliases.forEach((alias) => {
                        client.prefixCommands.set(alias, comando);
                    });
                }

                client.commandCategories.get(categoria).push(comando);
                console.log(`[Comando Carregado] ${arquivo} (${categoria})`);
            } else {
                console.log(
                    `[Aviso] O arquivo ${arquivo} foi ignorado (não possui 'name' ou 'executePrefix').`,
                );
            }
        }
    }
};
