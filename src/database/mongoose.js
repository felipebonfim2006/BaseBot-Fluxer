import mongoose from "mongoose";
import config from "../configs/config.json" with { type: "json" };

async function connectDB() {
  try {
    await mongoose.connect(config.mongo_uri);
    console.log("✅ Ligação à base de dados MongoDB estabelecida com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao ligar à base de dados:", error);
  }
}

export default connectDB;
