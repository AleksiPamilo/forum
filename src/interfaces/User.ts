export interface IUser {
    username: string,
    photoUrl: string,
    about: string,
    socials: {
        facebook?: {
            url: string,
            name: string,
        },
        instagram?: {
            url: string,
            name: string,
        },
        twitter?: {
            url: string,
            name: string,
        },
        linkedin?: {
            url: string,
            name: string,
        },
        github?: {
            url: string,
            name: string,
        },
        mail?: {
            email: string,
            name: string,
        },
    },
}