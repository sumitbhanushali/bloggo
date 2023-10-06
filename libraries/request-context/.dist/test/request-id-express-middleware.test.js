"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const index_1 = require("../index");
const constant_1 = require("../src/request-id/constant");
let currentServer;
async function setupExpressServer(setupRoutes) {
    const app = (0, express_1.default)();
    setupRoutes(app);
    const serverInstance = await new Promise((resolve) => {
        currentServer = app.listen(0, () => resolve(currentServer));
    });
    const { port } = serverInstance.address();
    return axios_1.default.create({
        baseURL: `http://127.0.0.1:${port}`,
        validateStatus: () => true,
    });
}
describe('Request ID express middleware', () => {
    afterEach(async () => {
        if (currentServer) {
            await new Promise((resolve, reject) => {
                currentServer.close((error) => (error ? reject(error) : resolve()));
            });
            currentServer = undefined;
        }
    });
    describe('when the request ID already exists in the request header', () => {
        test('when sending a request to an EXISTING route WITH request ID in the request header it should add it to the response header', async () => {
            const requestId = '801d9251-5916-4b26-85d9-7a33aaa86c9d';
            const client = await setupExpressServer((app) => {
                app.use(index_1.addRequestIdExpressMiddleware);
                app.get('/', (req, res) => {
                    res.send({});
                });
            });
            const response = await client.get('/', {
                headers: {
                    [constant_1.REQUEST_ID_HEADER]: requestId,
                },
            });
            expect(response).toMatchObject({
                status: 200,
                data: {},
                headers: {
                    [constant_1.REQUEST_ID_HEADER]: requestId,
                },
            });
        });
        test('when sending a request to MISSING route WITH request ID in the request header it should add it to the response header', async () => {
            const requestId = '801d9251-5916-4b26-85d9-7a33aaa86c9d';
            const client = await setupExpressServer((app) => {
                app.use(index_1.addRequestIdExpressMiddleware);
            });
            const response = await client.get('/some-missing-route', {
                headers: {
                    [constant_1.REQUEST_ID_HEADER]: requestId,
                },
            });
            expect(response).toMatchObject({
                status: 404,
                data: {},
                headers: {
                    [constant_1.REQUEST_ID_HEADER]: requestId,
                },
            });
        });
        test('the provided request id should be available in the request context', async () => {
            const requestId = '801d9251-5916-4b26-85d9-7a33aaa86c9d';
            const client = await setupExpressServer((app) => {
                app.use(index_1.addRequestIdExpressMiddleware);
                app.get('/', (req, res) => {
                    res.send({ ...(0, index_1.context)().getStore() });
                });
            });
            const response = await client.get('/', {
                headers: {
                    [constant_1.REQUEST_ID_HEADER]: requestId,
                },
            });
            expect(response).toMatchObject({
                status: 200,
                data: {
                    requestId,
                },
            });
        });
    });
    describe('when the request ID does not exists in the request header', () => {
        test('when sending a request to an EXISTING route WITHOUT request ID in the request header it should generate one and it to the response header', async () => {
            const client = await setupExpressServer((app) => {
                app.use(index_1.addRequestIdExpressMiddleware);
                app.get('/', (req, res) => {
                    res.send({});
                });
            });
            const response = await client.get('/');
            expect(response).toMatchObject({
                status: 200,
                data: {},
                headers: {
                    [constant_1.REQUEST_ID_HEADER]: expect.any(String),
                },
            });
        });
        test('when sending a request to MISSING route WITH request ID in the request header it should add it to the response header', async () => {
            const client = await setupExpressServer((app) => {
                app.use(index_1.addRequestIdExpressMiddleware);
            });
            const response = await client.get('/some-missing-route');
            expect(response).toMatchObject({
                status: 404,
                data: {},
                headers: {
                    [constant_1.REQUEST_ID_HEADER]: expect.any(String),
                },
            });
        });
        test('the generated request id should be available in the request context', async () => {
            const client = await setupExpressServer((app) => {
                app.use(index_1.addRequestIdExpressMiddleware);
                app.get('/', (req, res) => {
                    res.send({ ...(0, index_1.context)().getStore() });
                });
            });
            const response = await client.get('/');
            expect(response).toMatchObject({
                status: 200,
                data: {
                    requestId: expect.any(String),
                },
            });
        });
        test('the request id in the request context should be the same as the one sent in the response header', async () => {
            const client = await setupExpressServer((app) => {
                app.use(index_1.addRequestIdExpressMiddleware);
                app.get('/', (req, res) => {
                    res.send({ ...(0, index_1.context)().getStore() });
                });
            });
            const response = await client.get('/');
            const responseRequestId = response.headers[constant_1.REQUEST_ID_HEADER];
            expect(response).toMatchObject({
                status: 200,
                data: {
                    requestId: responseRequestId,
                },
                headers: {
                    [constant_1.REQUEST_ID_HEADER]: expect.any(String),
                },
            });
        });
    });
    test('when request content already exist it should append to it', async () => {
        const existingContextData = {
            userId: 1,
        };
        const client = await setupExpressServer((app) => {
            app.use((req, res, next) => {
                (0, index_1.context)().run({ ...existingContextData }, () => next());
            });
            app.use(index_1.addRequestIdExpressMiddleware);
            app.get('/', (req, res) => {
                res.send({ ...(0, index_1.context)().getStore() });
            });
        });
        const response = await client.get('/');
        expect(response).toMatchObject({
            status: 200,
            data: {
                requestId: expect.any(String),
                ...existingContextData,
            },
        });
    });
});
