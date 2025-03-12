import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const globalConnection = global as unknown as { mongoose?: ConnectionObject };

const connection: ConnectionObject = globalConnection.mongoose || {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("✅ Using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions); 

    connection.isConnected = db.connections[0].readyState;
    console.log("✅ Database connected");

    if (process.env.NODE_ENV === "development") {
      globalConnection.mongoose = connection;
    }
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    throw new Error("Database connection failed");
  }
}

export default dbConnect;
