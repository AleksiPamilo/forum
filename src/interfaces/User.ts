import { IProfileMessage } from "./Message";

export interface IUser {
    uid: string,
    username: string,
    photoUrl: string,
    about: string,
    socials: [{
        id: string,
        icon: string,
        url: string,
        username: string,
    }] | null,
    messages: IProfileMessage[] | null,
}