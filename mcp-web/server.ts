import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { MCPClient } from "../mcp-client-typescript/build/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const MCP_SERVER_SCRIPT = process.env.MCP_SERVER_SCRIPT || path.resolve("path_to_your_mcp_server_script.js");

app.use(cors());
app.use(express.json());

let mcpClient: MCPClient | null = null;

async function startMCPClient() {
  mcpClient = new MCPClient();
  try {
    await mcpClient.connectToServer(MCP_SERVER_SCRIPT);
    console.log("MCP Client connected to server");
  } catch (err) {
    console.error("Failed to connect MCP Client to server:", err);
    process.exit(1);
  }
}

app.post("/query", async (req, res) => {
  if (!mcpClient) {
    return res.status(500).json({ error: "MCP Client not initialized" });
  }
  const { query } = req.body;
  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Invalid query" });
  }
  try {
    const response = await mcpClient.processQuery(query);
    // Ensure response is a string
    const responseText = typeof response === "string" ? response : JSON.stringify(response);
    res.json({ response: responseText });
  } catch (err) {
    console.error("Error processing query:", err);
    res.status(500).json({ error: "Error processing query" });
  }
});

// Add GET handler for /query to inform users to use POST
app.get("/query", (req, res) => {
  res.status(405).json({ error: "GET method not allowed on /query. Please use POST." });
});

// Middleware to handle unsupported methods on /query
app.all("/query", (req, res, next) => {
  if (req.method !== "POST" && req.method !== "GET") {
    res.status(405).json({ error: `${req.method} method not allowed on /query.` });
  } else {
    next();
  }
});

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`MCP Web backend listening at http://localhost:${port}`);
  startMCPClient();
});
