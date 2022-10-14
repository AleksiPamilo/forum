import { Instance, SnapshotOut, types, cast } from "mobx-state-tree";
import { initializeRootStore as initialize } from "./initialize";

const CategoryModel = types.model("Category").props({
    id: types.identifier,
    name: types.string,
});

const ForumModel = types.model("Forum").props({
    id: types.string,
    categoryId: types.string,
    name: types.string,
    createdAt: types.number,
    createdBy: types.string,
    updatedAt: types.maybeNull(types.number),
    updatedBy: types.maybeNull(types.string),
});

const ThreadModel = types.model("Thread").props({
    id: types.number,
    forumId: types.string,
    title: types.string,
    content: types.string,
    createdAt: types.number,
    createdBy: types.string,
    updatedAt: types.maybeNull(types.number),
    updatedBy: types.maybeNull(types.string),
});

const MessageModel = types.model("Message").props({
    id: types.identifier,
    threadId: types.number,
    content: types.string,
    createdAt: types.number,
    createdBy: types.string,
    updatedAt: types.maybeNull(types.number),
    updatedBy: types.maybeNull(types.string),
});

export const RootStoreModel = types.model("RootStore", {
    forums: types.array(ForumModel),
    threads: types.array(ThreadModel),
    messages: types.array(MessageModel),
    categories: types.array(CategoryModel),
})
    .actions(self => ({
        setData(forums: Forum[], threads: Thread[], messages: Message[], categories: Category[]) {
            self.forums = cast(forums);
            self.threads = cast(threads);
            self.messages = cast(messages);
            self.categories = cast(categories);
        },
    }))
    .views(self => ({
        getThreadCount(forumId: Forum["id"]) {
            return self.threads.filter(thread => thread.forumId === forumId).length;
        },
        getLatestThread(forumId: Forum["id"]) {
            const threads = self.threads.filter(thread => thread.forumId === forumId);
            return threads[threads.length - 1];
        },
        getThreadById(threadId: Thread["id"] | null) {
            if (!threadId) return null;
            return self.threads.find(thread => thread.id === threadId);
        },
        getThreadsByForum(forumName: Forum["name"] | null) {
            const forum = self.forums.find(forum => forum.name === forumName);
            if (!forum) return [];

            return self.threads.filter(thread => thread.forumId === forum.id);
        },
        getMessagesByThreadId(threadId: Thread["id"] | null) {
            return self.messages.filter(message => message.threadId === threadId);
        },
    }));

export const initializeRootStore = initialize;

export interface Forum extends Instance<typeof ForumModel> { }
export interface Thread extends Instance<typeof ThreadModel> { }
export interface Message extends Instance<typeof MessageModel> { }
export interface Category extends Instance<typeof CategoryModel> { }

export interface RootStore extends Instance<typeof RootStoreModel> { };
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { };