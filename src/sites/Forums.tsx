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
                    <div key={category.id} className="flex flex-col divide-y rounded-t-md bg-zinc-400 border">
                        <h2 className="text-xl font-bold p-2 rounded-t-md bg-gray-500 border-b">{category.name}</h2>
                        {forums.map((forum) => {
                            if (forum.categoryId === category.id) {
                                return <ForumCard key={forum.id} forum={forum} />;
                            } else return null;
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default observer(Forums);
