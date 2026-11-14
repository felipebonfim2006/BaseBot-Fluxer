import { Events } from "@fluxerjs/core";

export default {
    name: Events.Ready,
    once: true,
    execute(client) {
        console.log(`O ${client.user.username} está online!`);
    },
};
