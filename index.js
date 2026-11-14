import { Client } from "@fluxerjs/core";
import config from "./src/configs/config.json" with { type: "json" };

const { token } = config;

const client = new Client();

// Carrega os handlers de eventos e comandos
for (const handler of ["Events", "Commands"]) {
    try {
        const { default: setup } = await import(`./src/handlers/${handler}.js`);
        await setup(client);
    } catch (err) {
        console.error(`Erro ao carregar ${handler}:`, err.message);
    }
}

client.login(token);
