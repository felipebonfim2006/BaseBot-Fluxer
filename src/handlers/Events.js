import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async (client) => {
  const pastaEventsPath = path.join(__dirname, "../events");

  // Carrega os arquivos de eventos de cada categoria
  const pastasEventos = fs.readdirSync(pastaEventsPath);

  for (const pasta of pastasEventos) {
    const caminhoPasta = path.join(pastaEventsPath, pasta);

    if (!fs.statSync(caminhoPasta).isDirectory()) continue;

    const arquivosEventos = fs
      .readdirSync(caminhoPasta)
      .filter((file) => file.endsWith(".js"));

    for (const arquivo of arquivosEventos) {
      const caminhoArquivo = path.join(caminhoPasta, arquivo);
      const { default: evento } = await import(
        pathToFileURL(caminhoArquivo).href
      );

      // Registra o evento uma vez ou continuamente
      if (evento.once) {
        client.once(evento.name, (...args) => evento.execute(...args, client));
      } else {
        client.on(evento.name, (...args) => evento.execute(...args, client));
      }

      console.log(`[Evento Carregado] ${pasta} -> ${evento.name}`);
    }
  }
};
