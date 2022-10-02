import { Instance, SnapshotOut, types, cast } from "mobx-state-tree";
import { initializeRootStore as initialize } from "./initialize";

const CategoryModel = types.model("Category").props({
    id: types.identifier,
    name: types.string,
});

const ForumModel = types.model("Forum").props({
    id: types.identifier,
    categoryId: types.string,
    name: types.string,
    createdAt: types.string,
    createdBy: types.string,
    updatedAt: types.maybeNull(types.string),
    updatedBy: types.maybeNull(types.string),
});

const ThreadModel = types.model("Post").props({
    id: types.identifier,
    forumId: types.string,
    title: types.string,
    content: types.string,
    createdAt: types.string,
    createdBy: types.string,
    updatedAt: types.maybeNull(types.string),
    updatedBy: types.maybeNull(types.string),
});

export const RootStoreModel = types.model("RootStore", {
    forums: types.array(ForumModel),
    threads: types.array(ThreadModel),
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
        getThreadCount(forumId: Forum["id"]) {
            return self.threads.filter(thread => thread.forumId === forumId).length;
        },
        getLatestThread(forumId: Forum["id"]) {
            const threads = self.threads.filter(thread => thread.forumId === forumId);
            return threads[threads.length - 1];
        },
    }));

export const initializeRootStore = initialize;

export interface Forum extends Instance<typeof ForumModel> { }
export interface Thread extends Instance<typeof ThreadModel> { }
export interface Category extends Instance<typeof CategoryModel> { }

export interface RootStore extends Instance<typeof RootStoreModel> { };
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { };