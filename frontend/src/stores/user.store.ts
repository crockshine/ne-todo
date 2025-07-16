import {makeAutoObservable} from "mobx";
import {IUser} from "@/api/profile";


export interface IUserStore {
    user: IUser | null;
    logout: () => void;
}

class UserStore implements IUserStore{
    user: IUser | null = {email: "mihail@mail.ru", username: 'Оболтус', password: '123123'};

    constructor() {
        makeAutoObservable(this);
    }

    logout(){

    }
}

const userStore = new UserStore();
export default userStore;