import { collection, onSnapshot, query } from "firebase/firestore";
import React from "react";
import FirebaseServices from "../../firebase/FirebaseServices";
import { useStores } from "./RootStore";

const FirestoreSnapshotProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { setData } = useStores();

    React.useEffect(() => {
        const firestore = FirebaseServices.getFirestoreInstance();
        const obj: any = {};

        const q = query(collection(firestore, "forumx"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.forEach(doc => {
                obj[doc.id] = doc.data();
            });

            setData(obj.forum.forums, obj.thread.threads, obj.category.categories);
        });

        return () => unsubscribe();
    });

    return (
        <div>
            {children}
        </div>
    );
};

export default FirestoreSnapshotProvider;