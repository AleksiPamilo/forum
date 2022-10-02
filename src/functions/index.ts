import AuthFunctions, { IAuthFunctions } from "./firebase/authFunctions";
import StorageFunctions, { IStorageFunctions } from "./firebase/storageFunctions";
import UserFunctions, { IUserFunctions } from "./firebase/userFunctions";

interface IFirebaseFunctions {
    auth: IAuthFunctions,
    storage: IStorageFunctions,
    user: IUserFunctions,
}

const Functions = {} as IFirebaseFunctions;
Functions.auth = { ...AuthFunctions };
Functions.storage = { ...StorageFunctions };
Functions.user = { ...UserFunctions };

export default Functions;
