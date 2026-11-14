import { Events } from "@fluxerjs/core";

export default {
  name: Events.Ready,
  once: true,
  execute(client) {
    try {
      client.user.setPresence({
        status: "idle",
      });
    } catch (error) {
      console.error("Erro ao definir a atividade do bot:", error);
    }

    console.log(`O ${client.user.username} está online!`);
  },
};
