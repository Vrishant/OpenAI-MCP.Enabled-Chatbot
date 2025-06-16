# MCP (Model Context Protocol) Multi-Project Repository

This repository contains multiple interconnected projects that together implement a Model Context Protocol (MCP) client-server system with a web interface and a weather information MCP server.

---

## Project Structure

- **mcp-client-typescript**  
  A TypeScript client implementation of the MCP protocol.  
  - Connects to an MCP server script (JavaScript or Python) via stdio transport.  
  - Uses OpenAI's chat completions with integrated MCP tools to process queries.  
  - Provides an MCPClient class to manage connection, query processing, and tool invocation.  
  - Can be run standalone or used as a library by other projects.

- **mcp-web**  
  A web client and backend interface for the MCP client.  
  - Backend built with Express and TypeScript.  
  - Serves a simple frontend interface for users to input queries and receive responses.  
  - Connects to the MCP client (from `mcp-client-typescript`) and forwards user queries to it.  
  - Provides a REST API endpoint `/query` for processing queries via POST requests.  
  - Frontend includes a textarea for query input and displays the response from the backend.

- **weather2**  
  An MCP server implementation providing weather-related tools.  
  - Built with TypeScript using the MCP SDK server components.  
  - Provides two main tools:  
    - `get-alerts`: Fetches weather alerts for a US state from the National Weather Service (NWS) API.  
    - `get-forecast`: Fetches weather forecast for a given latitude and longitude from the NWS API.  
  - Connects via stdio transport and listens for MCP client requests.

---

## How It Works Together

1. The **weather2** project runs as an MCP server exposing weather-related tools.
2. The **mcp-client-typescript** project acts as an MCP client that connects to the MCP server (e.g., weather2) and processes queries using OpenAI chat completions enhanced with MCP tools.
3. The **mcp-web** project provides a web interface and backend that connects to the MCP client, allowing users to send queries via a web browser and receive responses.

---

## Setup and Usage

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- TypeScript installed globally or via project devDependencies

### Running the Weather MCP Server

1. Navigate to the `weather2` directory:
   ```bash
   cd weather2
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```
4. Run the server (this will start the MCP server on stdio):
   ```bash
   node build/index.js
   ```

### Running the MCP Client

1. Navigate to the `mcp-client-typescript` directory:
   ```bash
   cd ../mcp-client-typescript
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```
4. Run the client, providing the path to the MCP server script (e.g., weather2 build index.js):
   ```bash
   npm start
   ```

### Running the MCP Web Interface

1. Navigate to the `mcp-web` directory:
   ```bash
   cd ../mcp-web
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the web server:
   ```bash
   npm start
   ```
4. Open your browser and go to:
   ```
   http://localhost:3000
   ```
5. Use the web interface to type queries and receive responses from the MCP client connected to the MCP server.

---

## Environment Variables

- `OPENAI_API_KEY` (required in `mcp-client-typescript`): Your OpenAI API key for chat completions.
- `MCP_SERVER_SCRIPT` (optional in `mcp-web`): Path to the MCP server script to connect to (defaults to a placeholder path).

---

## Technologies Used

- TypeScript
- Node.js
- Express (for web backend)
- OpenAI SDK
- Model Context Protocol SDK
- National Weather Service API (for weather2 server)
- Zod (for input validation in weather2)

---

## License

This project is licensed under the ISC License.

---

## Contact

For questions or support, please open an issue in this repository.
