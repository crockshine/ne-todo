
import {makeAutoObservable} from "mobx";
import {ITag} from "@/types/checkbox.interface";

interface IUser {
    username?: string;
    email?: string;
    tags: ITag[]
}

export interface IUserStore {
    user: IUser | null;
    logout: () => void;
}

class UserStore implements IUserStore{
    user: IUser | null = null

    constructor() {
        makeAutoObservable(this);
    }

    logout(){

    }
}

const userStore = new UserStore();
export default userStore;