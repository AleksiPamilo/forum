import { IUser } from "./User";

export interface IProfilePost {
    id: string,
    content: string,
    createdAt: number,
    createdBy: {
        username: string,
        photoUrl: string,
        uid: string,
    }
}