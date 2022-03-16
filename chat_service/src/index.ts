import { createServer } from "http";
import { logYellow } from "./libs/console";
import { startRedisServer } from "./libs/redis";
import { startSocketServer } from "./libs/socket";
require('dotenv').config();

const PORT = process.env.PORT;
const httpServer = createServer();

const main = async () => {
    httpServer.listen(PORT, () => {
        logYellow(`Search service listening on port ${PORT}`);
        logYellow(`CORS origin: ${process.env.CORS_ORIGIN}`);
    });

    /**
     * Start socket server
     */
    await startSocketServer(httpServer);

    /**
     * Start redis server
     */
    await startRedisServer();

};

main().catch(console.error);