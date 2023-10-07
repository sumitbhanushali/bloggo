import { startWebServer } from './entry-points/api/server';
import { logger } from '@bloggo/logger';
import { AppError, errorHandler } from '@bloggo/error-handling';


async function start() {
    //Array of entry point is being used to support more entry-points kinds like message queue, scheduled job,
    return Promise.all([startWebServer()]);
}

start()
    .then((startResponses) => {
        logger.info(`The app has started successfully ${JSON.stringify(startResponses)}}`);
    })
    .catch((error) => {
        errorHandler.handleError(
            new AppError('startup-failure', error.message, 500, false, error)
          );
    });