import React from "react";
import Functions from "../../../functions";
import { useAuth, useModal, useStores } from "../../../hooks";
import Button from "../../Button";
import Dropdown from "../../Dropdown";

type EditCategoryForumProps = {
    forumId?: string;
    categoryId?: string;
};

const EditCategoryForum: React.FC<EditCategoryForumProps> = ({ forumId, categoryId }) => {
    const { user } = useAuth();
    const { getForumById, getCategoryById, categories } = useStores();
    const { closeModal } = useModal();
    const nameRef = React.useRef<HTMLInputElement>(null);

    const [status, setStatus] = React.useState<{ success: boolean, message: string } | null>(null);
    const [selected, setSelected] = React.useState<string | null>(null);

    const forum = forumId ? getForumById(forumId) : null;
    const category = categoryId ? getCategoryById(categoryId) : null;
    const dropdownOptions = categories.map((category) => { return { value: category.id, label: category.name } });

    return (
        <div className="w-[30rem] rounded-md bg-light-secondary text-black dark:bg-dark-secondary dark:text-white border border-zinc-300 dark:border-zinc-700">
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Edit {forum ? forum.name : category?.name}</h1>
                {status && <p className={`mt-4 p-2 text-center rounded-md ${status.success ? "bg-green-500" : "bg-red-500"}`}>{status.message}</p>}
                <div className="flex flex-col gap-2">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" ref={nameRef} className="p-2 rounded-md bg-light-primary dark:bg-dark-primary" />

                    <div className={`${!forumId && !!categoryId ? "hidden" : "flex"} gap-2`}>
                        <label htmlFor="locked">Locked</label>
                        <input type="checkbox" name="locked" id="locked" className="flex p-2 rounded-md bg-light-primary dark:bg-dark-primary" />
                    </div>

                    <div hidden={!forumId && !!categoryId}>
                        <Dropdown
                            label="Category"
                            options={dropdownOptions}
                            onChange={(value) => setSelected(value)}
                        />
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        {
                            !status?.success ?
                                <>
                                    <Button onClick={closeModal} styles="px-4 py-2 bg-zinc-300 dark:bg-zinc-900 text-black dark:text-white rounded-md">Cancel</Button>
                                    <Button onClick={() => {
                                        if (forum) {
                                            Functions.firebase.updateForum({
                                                ...forum,
                                                name: nameRef.current?.value ?? forum.name,
                                                categoryId: categories.find(x => x.id === selected)?.id ?? forum.categoryId,
                                                updatedAt: new Date().getTime(),
                                                updatedBy: user?.uid ?? "admin"
                                            })
                                                .then((res) => {
                                                    setStatus({ success: res.success, message: res.message });
                                                });
                                        } else if (category) {
                                            Functions.firebase.updateCategory({
                                                ...category,
                                                name: nameRef.current?.value ?? category.name,
                                                id: category.id,
                                            })
                                                .then((res) => {
                                                    setStatus({ success: res.success, message: res.message });
                                                });
                                        } else {
                                            setStatus({ success: false, message: "Something went wrong." });
                                        }
                                    }} styles="px-4 py-2 bg-green-500 text-white rounded-md">Save</Button>
                                </>
                                : (
                                    <Button onClick={closeModal} styles="px-4 py-2 bg-zinc-300 dark:bg-zinc-900 text-black dark:text-white rounded-md">Close</Button>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCategoryForum;
