import ThreadCard from "../components/ThreadCard";
import { useStores } from "../hooks";

const WhatsNew: React.FC = () => {
    const { getLatestThreads } = useStores();
    const latestThreads = getLatestThreads(6);
    document.title = "ForumX — Whats New";

    return (
        <div className="flex flex-col gap-y-2 mt-2">
            <h1 className="text-xl font-semibold">Newest posts!</h1>
            <div className="flex flex-wrap gap-4">
                {
                    latestThreads.map((thread) => (
                        <ThreadCard thread={thread} />
                    ))
                }
            </div>
        </div>
    )
}

export default WhatsNew;
