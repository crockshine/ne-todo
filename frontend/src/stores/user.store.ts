
import {makeAutoObservable} from "mobx";
import {ITag} from "@/types/checkbox.interface";

interface IUser {
    username: string;
    email: string;
    tags?: ITag[]
}

export interface IUserStore {
    user: IUser | null;
    logout: () => void;
}

class UserStore implements IUserStore{
    user: IUser | null = {email: "mihail@mail.ru", username: 'Оболтус'};

    constructor() {
        makeAutoObservable(this);
    }

    logout(){

    }
}

const userStore = new UserStore();
export default userStore;