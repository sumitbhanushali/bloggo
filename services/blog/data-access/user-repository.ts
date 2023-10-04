import { createUserDTO } from '../domain/user-schema';
import getDbConnection from "./db-connection";

type User = {
    id: number;
    name: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
};

const db = getDbConnection();

export async function getUserById(id: number): Promise<User | null> {

    const user = await db.user.findUnique({ where: { id: id } });

    return user;
}

export async function createUser(user: createUserDTO) {
    const createdComment = await db.user.create({ data: user })

    return createdComment;
}

export async function deleteUser(id: number) {
    const deleted = await db.user.delete({ where: { id: id } });

    return deleted;
}

export async function cleanupData() {
    const deleted = await db.user.deleteMany();
    return deleted;
}