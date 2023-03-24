import { observer } from "mobx-react-lite";
import { useAuth, useStores } from "../hooks";
import ForumCard from "../components/ForumCard";
import CreateThread from "../components/CreateThread";

const Forums: React.FC = () => {
    const { forums, categories } = useStores();
    const { user } = useAuth();

    document.title = "ForumX — Forums";
    return (
        <div className="w-full">
            <div className="my-6">
                {user?.displayName
                    ? <h1 className="text-2xl">Welcome, {user?.displayName}</h1>
                    : <h1 className="text-2xl">Welcome, Guest</h1>
                }
            </div>
            <CreateThread />
            <div className="flex mt-8 flex-col gap-8">
                {categories.map((category) => (
                    <div key={category.id} className="flex flex-col divide-y divide-zinc-400 dark:divide-zinc-800 border border-zinc-400 dark:border-zinc-800 rounded-[5px] bg-light-secondary dark:bg-dark-secondary">
                        <h2 className="text-xl font-bold p-4 border-b border-zinc-400 dark:border-zinc-900 rounded-t-sm">{category.name}</h2>
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
