import { startWebServer } from './entry-points/api/server';
import { PrismaClient } from '@prisma/client';

async function start() {
    let dbConnection = new PrismaClient();
    let users = await dbConnection.user.findMany();
    console.log(users);
    
    //Array of entry point is being used to support more entry-points kinds like message queue, scheduled job,
    return Promise.all([startWebServer()]);
}

start()
    .then((startResponses) => {
        console.log(`The app has started successfully ${JSON.stringify(startResponses)}}`);
    })
    .catch((error) => {
        console.log(`The app has failed to started: ${error}}`);
    });