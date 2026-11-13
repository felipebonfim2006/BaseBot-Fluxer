const { Events } = require("@fluxerjs/core");

module.exports = {
    name: Events.Ready,
    once: true,
    execute(client) {
        console.log(`O bot iniciou e está pronto!`);
    },
};
