import { IProfileMessage } from "./Message";

export interface IUser {
    uid: string,
    username: string,
    photoUrl: string,
    about: string,
    socials: [{
        id: string,
        index: number,
        url: string,
        username: string,
        icon: {
            style: string,
            name: string
        }
    }] | null,
    messages: IProfileMessage[] | null,
}