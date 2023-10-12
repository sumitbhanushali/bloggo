import { Response } from 'express';

export class ExpressResponseFormatter{
    res: Response;
    constructor(res: Response) {
        this.res = res;
    }
    formatResponse(data: {}, status: string = "success") {
        return {
            status: status,
            data: data
        }
    }

    setHeaderForCreateAndSend() {
        this.res.status(201);
        return this;
    }

    setHeaderForCreate() {
        this.res.status(204);
        return this;
    }

    send(data: {}) {
        return this.res.json(this.formatResponse(data));
    }
}
