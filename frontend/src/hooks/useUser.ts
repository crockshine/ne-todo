import {TagsContext} from "@/context/User/TagsContext";
import {use} from "react";

export const useUser = () => {
    const tags = use(TagsContext)
    if (!tags) return null;
    return {...tags}
}