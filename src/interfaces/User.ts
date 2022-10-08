import { IProfilePost } from "./Post";

export interface IUser {
    username: string,
    photoUrl: string,
    about: string,
    socials: {
        facebook?: {
            url: string,
            username: string,
        },
        instagram?: {
            url: string,
            username: string,
        },
        twitter?: {
            url: string,
            username: string,
        },
        linkedin?: {
            url: string,
            username: string,
        },
        github?: {
            url: string,
            username: string,
        },
        mail?: {
            email: string,
        },
    },
    posts: IProfilePost[],
}