import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { useStores } from "../../hooks";
import { Reply, Thread } from "../../mst";
import Button from "../Button";

type ControlsType = {
    data: Thread | Reply;
};

const Controls: React.FC<ControlsType> = ({ data }) => {
    const { getForumById, getThreadById } = useStores();
    const [show, setShow] = React.useState<boolean>(false);

    const isThread = (data: Thread | Reply): data is Thread => {
        return (data as Thread).replies !== undefined;
    }

    return (
        <div className="relative">
            <Button onClick={() => setShow(!show)} styles="p-2 rounded-full bg-zinc-400 hover:bg-zinc-500 dark:bg-zinc-700"><BsThreeDots /></Button>
            <div className="absolute mt-2 right-0 rounded-md bg-zinc-400 dark:bg-zinc-800" hidden={!show}>
                <Button onClick={() => {

                }} styles="p-2 hover:bg-zinc-200 hover:dark:bg-zinc-700">
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default Controls;
