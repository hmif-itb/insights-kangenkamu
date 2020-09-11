import { Store } from "pullstate";
 
interface UIStoreData {
    jwt?: string;
    nim?: string;
}

export const UIStore = new Store<UIStoreData>({});