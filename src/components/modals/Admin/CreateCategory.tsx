import React from "react";
import Button from "../../Button";
import Functions from "../../../functions";

const CreateCategory: React.FC = () => {
    const [status, setStatus] = React.useState<{ success: boolean, message: string } | null>(null);
    const categoryNameRef = React.useRef<HTMLInputElement>(null);

    return (
        <div className="w-[35rem] p-4 rounded-md bg-light-secondary text-black dark:text-white dark:bg-dark-secondary">
            <h1 className="text-xl font-semibold">Create Category</h1>
            <div className="">
                <div className="flex flex-col gap-2 mt-4 w-full">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" ref={categoryNameRef} className="p-2 rounded-md bg-light-primary dark:bg-dark-primary" />

                    <div className="flex items-center justify-between mt-2">
                        <div className={`${status?.success ? "text-green-500" : "text-red-500"}`}>{status?.message}</div>
                        <Button onClick={() => {
                            if (!categoryNameRef.current?.value) return setStatus({ success: false, message: "Please enter a category name." });
                            Functions.firebase.createCategory({
                                name: categoryNameRef.current.value,
                                id: Functions.generateId()
                            }).then(res => {
                                setStatus({ success: res.success, message: res.message });
                            })
                        }}>Create Category</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCategory;
