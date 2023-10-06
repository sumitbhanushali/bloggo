import { startWebServer } from './entry-points/api/server';
import { logger } from '@bloggo/logger';

async function start() {
    //Array of entry point is being used to support more entry-points kinds like message queue, scheduled job,
    return Promise.all([startWebServer()]);
}

start()
    .then((startResponses) => {
        logger.info(`The app has started successfully ${JSON.stringify(startResponses)}}`);
    })
    .catch((error) => {
        logger.error(`The app has failed to started: ${error}}`);
    });