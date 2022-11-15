import { observer } from "mobx-react-lite";
import { useStores } from "../hooks";
import ForumCard from "../components/ForumCard";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Forums: React.FC = () => {
    const { forums, categories } = useStores();
    const navigate = useNavigate();

    document.title = "ForumX — Forums";
    return (
        <div className="mt-4 w-full">
            <div className="text-right py-2 px-3 absolute right-0 top-16">
                <Button onClick={() => navigate("/post-thread")}>New Post</Button>
            </div>
            <div className="flex flex-col gap-8">
                {categories.map((category) => (
                    <div key={category.id} className="flex flex-col divide-y divide-gray-800 border border-gray-600 rounded-[5px] bg-[#0A0A0A]">
                        <h2 className="text-xl font-bold p-2 border-b border-gray-600 text-white rounded-t-sm">{category.name}</h2>
                        {
                            forums.map((forum) => (
                                forum.categoryId === category.id ? <ForumCard forum={forum} /> : null
                            ))
                        }
                    </div>
                )
                )}
            </div>
        </div>
    )
}

export default observer(Forums);
