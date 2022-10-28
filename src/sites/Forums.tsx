import { observer } from "mobx-react-lite";
import { useStores } from "../hooks";
import ForumCard from "../components/ForumCard";

const Forums: React.FC = () => {
    const { forums, categories } = useStores();
    document.title = "ForumX — Forums";
    return (
        <div className="mt-4 w-full">
            <div className="flex flex-col gap-8">
                {categories.map((category) => (
                    <div key={category.id} className="flex flex-col divide-y divide-blue-800 border border-blue-600 shadow-[0_0_10px_4px_rgba(33,54,163)] rounded-[5px]">
                        <h2 className="text-xl font-bold p-2 bg-blue-800 text-black rounded-t-sm">{category.name}</h2>
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
