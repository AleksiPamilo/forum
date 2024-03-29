import React from "react";
import { RootStore } from "../../mst";

const RootStoreContext = React.createContext<RootStore | undefined>(undefined);
export const RootStoreContextProvider = RootStoreContext.Provider;

export const useStoresContext = () => {
    const context = React.useContext(RootStoreContext);

    if (context === undefined) {
        throw new Error('Call "useStores" only inside RootStoreContextProvider');
    }

    return context;
}
