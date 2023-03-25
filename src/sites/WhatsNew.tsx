import ThreadCard from "../components/ThreadCard";
import { useStores } from "../hooks";

const WhatsNew: React.FC = () => {
    const { getLatestThreads } = useStores();
    const latestThreads = getLatestThreads(6);
    document.title = "ForumX — Whats New";

    return (
        <div className="flex flex-col gap-y-2">
            <h1 className="text-4xl font-bold my-2">Newest Posts!</h1>
            <div className="flex flex-col gap-4">
                {
                    latestThreads.sort((a, b) => {
                        if (a.createdAt < b.createdAt) return 1;
                        if (a.createdAt > b.createdAt) return -1;
                        return 0;
                    }).map((thread) => (
                        <ThreadCard thread={thread} />
                    ))
                }
            </div>
        </div>
    )
}

export default WhatsNew;
