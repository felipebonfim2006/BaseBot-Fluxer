const fs = require("fs");
const path = require("path");

module.exports = (client) => {
    client.prefixCommands = new Map();
    client.commandCategories = new Map();

    const pastaComandosPath = path.join(__dirname, "../commands");
    const categorias = fs.readdirSync(pastaComandosPath);

    categorias.forEach((categoria) => {
        const caminhoCategoria = path.join(pastaComandosPath, categoria);

        if (fs.statSync(caminhoCategoria).isDirectory()) {
            const arquivos = fs
                .readdirSync(caminhoCategoria)
                .filter((file) => file.endsWith(".js"));

            if (!client.commandCategories.has(categoria)) {
                client.commandCategories.set(categoria, []);
            }

            arquivos.forEach((arquivo) => {
                const comando = require(path.join(caminhoCategoria, arquivo));
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
                    console.log(
                        `[Comando Carregado] ${arquivo} (${categoria})`,
                    );
                } else {
                    console.log(
                        `[Aviso] O arquivo ${arquivo} foi ignorado (não possui 'name' ou 'executePrefix').`,
                    );
                }
            });
        }
    });
};
