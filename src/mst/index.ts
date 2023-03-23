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
    slug: types.string,
    locked: types.boolean,
    createdAt: types.number,
    createdBy: types.string,
    updatedAt: types.maybeNull(types.number),
    updatedBy: types.maybeNull(types.string),
});

const ThreadModel = types.model("Thread").props({
    id: types.string,
    forumId: types.string,
    title: types.string,
    content: types.string,
    locked: types.boolean,
    createdAt: types.number,
    createdBy: types.string,
    updatedAt: types.maybeNull(types.number),
    updatedBy: types.maybeNull(types.string),
    replies: types.maybeNull(types.array(types.late(() => ReplyModel))),
});

const ReplyModel = types.model("Message").props({
    id: types.identifier,
    threadId: types.string,
    content: types.string,
    createdAt: types.number,
    createdBy: types.string,
    updatedAt: types.maybeNull(types.number),
    updatedBy: types.maybeNull(types.string),
});

export const RootStoreModel = types.model("RootStore", {
    forums: types.array(ForumModel),
    threads: types.array(ThreadModel),
    messages: types.array(ReplyModel),
    categories: types.array(CategoryModel),
})
    .actions(self => ({
        setData(forums: Forum[], threads: Thread[], categories: Category[]) {
            self.forums = cast(forums);
            self.threads = cast(threads);
            self.categories = cast(categories);
        },
    }))
    .views(self => ({
        getForumByName(forumName: string | null) {
            return self.forums.find(f => f.name === forumName);
        },
        getForumBySlug(forumSlug: string | null) {
            return self.forums.find(f => f.slug === forumSlug);
        },
        getForumById(forumId: Forum["id"] | null) {
            return self.forums.find(f => f.id === forumId);
        },
        getForumNames() {
            return self.forums.map(f => f.name);
        },
        getThreadCount(forumId: Forum["id"]) {
            return self.threads.filter(thread => thread.forumId === forumId).length;
        },
        getLatestThread(forumId: Forum["id"]) {
            const threads = self.threads.filter(thread => thread.forumId === forumId);
            return threads[threads.length - 1];
        },
        getLatestThreads(amount: number) {
            return self.threads.slice(-amount).reverse();
        },
        getThreadById(threadId: Thread["id"] | null) {
            if (!threadId) return null;
            return self.threads.find(thread => thread.id === threadId);
        },
        getThreadsByForum(forumSlug: Forum["slug"] | null) {
            const forum = self.forums.find(forum => forum.slug === forumSlug);
            if (!forum) return [];

            return self.threads.filter(thread => thread.forumId === forum.id);
        },
    }));

export const initializeRootStore = initialize;

export interface Forum extends Instance<typeof ForumModel> { }
export interface Thread extends Instance<typeof ThreadModel> { }
export interface Reply extends Instance<typeof ReplyModel> { }
export interface Category extends Instance<typeof CategoryModel> { }

export interface RootStore extends Instance<typeof RootStoreModel> { };
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { };
