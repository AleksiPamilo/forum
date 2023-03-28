import React from "react";
import Button from "../../components/Button";
import CreateCategory from "../../components/modals/Admin/CreateCategory";
import CreateForum from "../../components/modals/Admin/CreateForum";
import { useModal, useStores } from "../../hooks";
import { FaTrash, FaEdit } from "react-icons/fa";
import Table from "../../components/Table";
import ConfirmDelete from "../../components/modals/Admin/ConfirmDelete";
import EditCategoryForum from "../../components/modals/Admin/EditCategoryForum";

const ManageForums: React.FC = () => {
    const { categories, forums, getCategoryById } = useStores();
    const { setModalContent, setIsModalOpen } = useModal();

    const openModal = (content: JSX.Element) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const headers = ["Category", "Manage Category"];
    const rows = categories.map(category => {
        return [
            category.name,
            <div className="flex justify-center">
                <button onClick={() => openModal(<EditCategoryForum categoryId={category.id} />)} className="mx-3"><FaEdit className="text-xl text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 hover:dark:text-zinc-100" /></button>
                <button onClick={() => openModal(<ConfirmDelete categoryId={category.id} />)}><FaTrash className="text-xl text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 hover:dark:text-zinc-100" /></button>
            </div>
        ]
    });

    const test = Array(300).fill(forums[Math.floor(Math.random() * forums.length)]);
    const headers2 = ["Forum", "In Category", "Manage Forum"];
    const rows2 = test.map(forum => {
        return [
            forum.name,
            getCategoryById(forum.categoryId)?.name,
            <div className="flex justify-center">
                <button onClick={() => openModal(<EditCategoryForum forumId={forum.id} />)} className="mx-3"><FaEdit className="text-xl text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 hover:dark:text-zinc-100" /></button>
                <button onClick={() => openModal(<ConfirmDelete forumId={forum.id} />)}><FaTrash className="text-xl text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 hover:dark:text-zinc-100" /></button>
            </div>
        ]
    });

    return (
        <div className="max-md:mt-10">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Manage Forums</h1>
                <div className="flex gap-2">
                    <Button onClick={() => openModal(<CreateCategory />)}>Create a Category</Button>
                    <Button onClick={() => openModal(<CreateForum />)}>Create a Forum</Button>
                </div>
            </div>

            <div className="flex flex-col mt-10 gap-10">
                <Table {...{ headers, rows }} />
                <Table {...{ headers: headers2, rows: rows2 }} />
            </div>
        </div>
    )
}

export default ManageForums;
