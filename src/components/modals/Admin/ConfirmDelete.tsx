import React from "react";
import Functions from "../../../functions";
import { useModal, useStores } from "../../../hooks";
import Button from "../../Button";

type ConfirmDeleteProps = {
    forumId?: string;
    categoryId?: string;
};

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({ forumId, categoryId }) => {
    const { getForumById, getCategoryById } = useStores();
    const { closeModal } = useModal();
    const [status, setStatus] = React.useState<{ success: boolean, message: string } | null>(null);

    const forum = forumId ? getForumById(forumId) : null;
    const category = categoryId ? getCategoryById(categoryId) : null;

    return (
        <div className="w-[30rem] rounded-md bg-light-secondary text-black dark:bg-dark-secondary dark:text-white border border-zinc-300 dark:border-zinc-700">
            <div className="p-4">
                <h1 className="text-2xl font-bold">Confirm Delete</h1>
                {status && <p className={`mt-4 p-2 text-center rounded-md ${status.success ? "bg-green-500" : "bg-red-500"}`}>{status.message}</p>}
                <p hidden={!!status?.success} className="mt-4">Are you sure you want to delete the {forum ? "forum" : "category"} <span className="font-bold">{forum ? forum.name : category?.name}</span>?</p>
                <div className="flex justify-end gap-4 mt-4">
                    {
                        !status?.success ?
                            <>
                                <Button onClick={closeModal} styles="px-4 py-2 bg-zinc-300 dark:bg-zinc-900 text-black dark:text-white rounded-md">Cancel</Button>
                                <Button onClick={() => {
                                    if (forum) {
                                        Functions.firebase.deleteForum(forum)
                                            .then((res) => {
                                                setStatus({ success: res.success, message: res.message });
                                            });
                                    } else if (category) {
                                        Functions.firebase.deleteCategory(category)
                                            .then((res) => {
                                                setStatus({ success: res.success, message: res.message });
                                            });
                                    } else {
                                        setStatus({ success: false, message: "Forum or category not found" });
                                    }
                                }} styles="px-4 py-2 bg-red-500 text-white rounded-md">Delete</Button>
                            </>
                            : (
                                <Button onClick={closeModal} styles="px-4 py-2 bg-zinc-300 dark:bg-zinc-900 text-black dark:text-white rounded-md">Close</Button>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default ConfirmDelete;
