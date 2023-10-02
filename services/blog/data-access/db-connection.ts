import { Prisma, PrismaClient } from '@prisma/client';

let dbConnection: PrismaClient;

export default function getDbConnection() : PrismaClient {
    if(!dbConnection) {
        dbConnection = new PrismaClient();
    }

    return dbConnection;
}