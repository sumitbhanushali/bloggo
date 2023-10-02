import { Server } from 'http';
import { AddressInfo } from 'net';
import express from 'express';
import defineRoutes from './routes';

let connection: Server;

async function startWebServer(): Promise<AddressInfo> {  
  const expressApp = express();
  expressApp.use(express.json());
  expressApp.use(express.urlencoded({extended: true}));
  defineRoutes(expressApp);
  const APIAddress = await openConnection(expressApp);
  return APIAddress;
}

async function stopWebServer() {
  return new Promise<void>((resolve) => {
    if (connection !== undefined) {
      connection.close(() => {
        resolve();
      });
    }
  });
}

async function openConnection(
  expressApp: express.Application
): Promise<AddressInfo> {
  return new Promise((resolve) => {
    const webServerPort = 3000;
    connection = expressApp.listen(webServerPort, () => {
      resolve(connection.address() as AddressInfo);
    });
  });
}

export { startWebServer, stopWebServer };