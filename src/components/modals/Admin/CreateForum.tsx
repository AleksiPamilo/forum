import React from "react";
import Functions from "../../../functions";
import { useAuth, useStores } from "../../../hooks";
import { Category } from "../../../mst";
import Button from "../../Button";
import Dropdown from "../../Dropdown";

const CreateForum: React.FC = () => {
    const { user } = useAuth();
    const { categories } = useStores();
    const nameRef = React.useRef<HTMLInputElement>(null);
    const [category, setCategory] = React.useState<Category | null>(null);
    const [selected, setSelected] = React.useState<string | null>(null);
    const [status, setStatus] = React.useState<{ success: boolean, message: string } | null>(null);

    const dropdownOptions = [
        {
            label: "Yes, this forum is locked.",
            value: "true"
        },
        {
            label: "No, this forum is not locked.",
            value: "false"
        }
    ]

    return (
        <div className="w-[35rem] p-4 rounded-md bg-light-secondary text-black dark:text-white dark:bg-dark-secondary">
            <h1 className="text-xl font-semibold">Create Forum</h1>
            <div className="">
                <div className="flex flex-col gap-2 mt-4 w-full">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" ref={nameRef} className="p-2 rounded-md bg-light-primary dark:bg-dark-primary" />

                    <label htmlFor="category">Category</label>
                    <div className="flex flex-col gap-2 w-full items-center justify-center">
                        <Dropdown label={category?.name ?? "Select a category"} options={categories.map(x => ({ label: x.name, value: x.id }))} onChange={v => setCategory(categories.find(x => x.id === v) ?? null)} />
                    </div>

                    <label htmlFor="locked">Locked</label>
                    <div className="flex flex-col gap-2 w-full items-center justify-center">
                        <Dropdown label={dropdownOptions.find(x => x.value === selected)?.label ?? "Is this forum locked?"} options={dropdownOptions} onChange={v => setSelected(v)} />
                    </div>

                    <div className="flex items-center justify-between mt-2">
                        <div className={`${status?.success ? "text-green-500" : "text-red-500"}`}>{status?.message}</div>
                        <Button onClick={() => {
                            setStatus(null);
                            if (!user) return setStatus({ success: false, message: "You must be logged in to create a forum." });
                            if (!nameRef.current?.value) return setStatus({ success: false, message: "Please enter a forum name." });
                            if (!category) return setStatus({ success: false, message: "Please select a category for this forum." });
                            if (!selected) return setStatus({ success: false, message: "Please select whether or not this forum is locked." });

                            Functions.firebase.createForum({
                                id: Functions.generateId(),
                                categoryId: category.id,
                                name: nameRef.current.value,
                                slug: Functions.generateSlug(nameRef.current.value),
                                locked: selected === "true" ? true : false,
                                createdAt: new Date().getTime(),
                                createdBy: user.uid,
                                updatedAt: null,
                                updatedBy: null,
                            }).then((res) => {
                                setStatus({ success: res.success, message: res.message });
                            })

                        }}>Create Category</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateForum;
