import { IUser } from "../interfaces/User"

// Dummy User
export const user: IUser = {
    username: "Test User",
    photoUrl: "https://firebasestorage.googleapis.com/v0/b/forum-d47ec.appspot.com/o/profilepictures%2FFmZvlpsZ2ETmf98dtyD4u2N0yJr2?alt=media&token=af4c8539-3c9e-427b-bf57-7a40aa990ab2",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec est laoreet, viverra massa quis, condimentum dolor. Vivamus interdum molestie elementum. Aliquam et lobortis dolor, eget interdum nisi. Cras diam sapien, tempor sagittis fringilla sit amet, feugiat at lorem. Nunc vel rhoncus ligula, iaculis iaculis ligula. Integer a neque erat. Quisque sit amet tellus massa. Donec vitae vulputate ligula. Nunc metus nisl, convallis non lobortis id, pulvinar nec urna. Curabitur rhoncus scelerisque nulla sit amet dictum. Nam blandit maximus quam, in dictum tellus maximus id. Aenean a ullamcorper felis, id imperdiet massa. Vestibulum vestibulum et turpis quis pellentesque. Vestibulum eget mollis purus, non tincidunt dolor. Nulla sit amet ante eleifend, aliquam lorem eget, sodales ante. Cras finibus enim ipsum, eget commodo dolor placerat quis. Cras facilisis neque vel nunc viverra, luctus sollicitudin orci porttitor. Nullam non porta ipsum. Donec vestibulum tortor eget augue sagittis, a pellentesque arcu tempus. Donec feugiat velit sed lectus vestibulum tincidunt. Praecreated id posuere ex, ac molestie arcu. Nam tincidunt malesuada velit vitae semper. Aenean molestie dictum metus vitae gravida. Aliquam at dapibus orci, finibus congue tortor. Fusce ac metus non eros elementum vulputate id ac lorem. Aenean a lacus a enim pulvinar venenatis nec non turpis. Sed ut posuere eros. Fusce convallis risus vel lorem fringilla, a luctus ante sollicitudin. Nullam malesuada metus a ligula dignissim imperdiet. Vivamus vitae elementum ligula. Quisque porta urna in diam aliquam, ut convallis orci tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec est laoreet, viverra massa quis, condimentum dolor. Vivamus interdum molestie elementum. Aliquam et lobortis dolor, eget interdum nisi. Cras diam sapien, tempor sagittis fringilla sit amet, feugiat at lorem. Nunc vel rhoncus ligula, iaculis iaculis ligula. Integer a neque erat. Quisque sit amet tellus massa. Donec vitae vulputate ligula. Nunc metus nisl, convallis non lobortis id, pulvinar nec urna. Curabitur rhoncus scelerisque nulla sit amet dictum. Nam blandit maximus quam, in dictum tellus maximus id. Aenean a ullamcorper felis, id imperdiet massa. Vestibulum vestibulum et turpis quis pellentesque. Vestibulum eget mollis purus, non tincidunt dolor. Nulla sit amet ante eleifend, aliquam lorem eget, sodales ante. Cras finibus enim ipsum, eget commodo dolor placerat quis. Cras facilisis neque vel nunc viverra, luctus sollicitudin orci porttitor. Nullam non porta ipsum. Donec vestibulum tortor eget augue sagittis, a pellentesque arcu tempus. Donec feugiat velit sed lectus vestibulum tincidunt. Praecreated id posuere ex, ac molestie arcu. Nam tincidunt malesuada velit vitae semper. Aenean molestie dictum metus vitae gravida. Aliquam at dapibus orci, finibus congue tortor. Fusce ac metus non eros elementum vulputate id ac lorem. Aenean a lacus a enim pulvinar venenatis nec non turpis. Sed ut posuere eros. Fusce convallis risus vel lorem fringilla, a luctus ante sollicitudin. Nullam malesuada metus a ligula dignissim imperdiet. Vivamus vitae elementum ligula. Quisque porta urna in diam aliquam, ut convallis orci tristique.",
    socials: {
        facebook: {
            url: "",
            username: "FacebookAccount",
        },
        instagram: {
            url: "",
            username: "InstagramAccount",
        },
        twitter: {
            url: "",
            username: "TwitterAccount",
        },
        linkedin: {
            url: "",
            username: "LinkedInAccount",
        },
        github: {
            url: "",
            username: "GithubAccount",
        },
        mail: {
            email: "fake.email@forum-d47ec.web.app",
        },
    },
    posts: [
        {
            id: "1",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec est laoreet, viverra massa quis, condimentum dolor",
            createdAt: 1665232824613,
            createdBy: {
                username: "Another Test User",
                photoUrl: "https://firebasestorage.googleapis.com/v0/b/forum-d47ec.appspot.com/o/profilepictures%2FFmZvlpsZ2ETmf98dtyD4u2N0yJr2?alt=media&token=af4c8539-3c9e-427b-bf57-7a40aa990ab2",
                uid: "FmZvlpsZ2ETmf98dtyD4u2N0yJr2",
            }
        },
        {
            id: "2",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec est laoreet, viverra massa quis, condimentum dolor",
            createdAt: 1665232843529,
            createdBy: {
                username: "Another Test User",
                photoUrl: "https://firebasestorage.googleapis.com/v0/b/forum-d47ec.appspot.com/o/profilepictures%2FFmZvlpsZ2ETmf98dtyD4u2N0yJr2?alt=media&token=af4c8539-3c9e-427b-bf57-7a40aa990ab2",
                uid: "FmZvlpsZ2ETmf98dtyD4u2N0yJr2",
            }
        },
        {
            id: "3",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec est laoreet, viverra massa quis, condimentum dolor. Vivamus interdum molestie elementum. Aliquam et lobortis dolor, eget interdum nisi. Cras diam sapien, tempor sagittis fringilla sit amet, feugiat at lorem. Nunc vel rhoncus ligula, iaculis iaculis ligula. Integer a neque erat. Quisque sit amet tellus massa. Donec vitae vulputate ligula. Nunc metus nisl, convallis non lobortis id, pulvinar nec urna. Curabitur rhoncus scelerisque nulla sit amet dictum. Nam blandit maximus quam, in dictum tellus maximus id. Aenean a ullamcorper felis, id imperdiet massa. Vestibulum vestibulum et turpis quis pellentesque. Vestibulum eget mollis purus, non tincidunt dolor. Nulla sit amet ante eleifend, aliquam lorem eget, sodales ante. Cras finibus enim ipsum, eget commodo dolor placerat quis. Cras facilisis neque vel nunc viverra, luctus sollicitudin orci porttitor. Nullam non porta ipsum. Donec vestibulum tortor eget augue sagittis, a pellentesque arcu tempus. Donec feugiat velit sed lectus vestibulum tincidunt.",
            createdAt: 1665232854434,
            createdBy: {
                username: "Another Test User",
                photoUrl: "https://firebasestorage.googleapis.com/v0/b/forum-d47ec.appspot.com/o/profilepictures%2FFmZvlpsZ2ETmf98dtyD4u2N0yJr2?alt=media&token=af4c8539-3c9e-427b-bf57-7a40aa990ab2",
                uid: "FmZvlpsZ2ETmf98dtyD4u2N0yJr2",
            }
        }
    ],
}
