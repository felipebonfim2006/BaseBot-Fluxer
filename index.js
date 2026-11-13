const { Client } = require("@fluxerjs/core");
const { token } = require("./src/configs/config.json");

const client = new Client();

// Carrega os handlers de eventos e comandos
["Events", "Commands"].forEach((handler) => {
    try {
        require(`./src/handlers/${handler}.js`)(client);
    } catch (err) {
        console.error(`Erro ao carregar ${handler}:`, err.message);
    }
});

client.login(token);
