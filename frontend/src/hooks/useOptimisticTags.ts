import {useContext} from "react";
import OptimisticTagsContext from "@/context/OptimisticTagsContext";

export const useOptimisticTags = () => {
    const optimisticContext = useContext(OptimisticTagsContext);
    if (!optimisticContext) throw new Error("useModal must be defined")
    return optimisticContext
}