import { Server } from 'http';
import { AddressInfo } from 'net';
import express from 'express';

import * as configurationProvider from '@bloggo/configuration-provider';
import { logger } from '@bloggo/logger';

import configurationSchema from '../../config';
import defineRoutes from './routes';

let connection: Server;

async function startWebServer(): Promise<AddressInfo> {  
  configurationProvider.initializeAndValidate(configurationSchema);
  logger.configureLogger(
    {
      prettyPrint: Boolean(
        configurationProvider.getValue('logger.prettyPrint')
      ),
    },
    true
  );
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
    const portToListenTo = configurationProvider.getValue('port');
    const webServerPort = portToListenTo || 0;
    logger.info(`Server is about to listen to port ${webServerPort}`);

    connection = expressApp.listen(webServerPort, () => {
      resolve(connection.address() as AddressInfo);
    });
  });
}

export { startWebServer, stopWebServer };