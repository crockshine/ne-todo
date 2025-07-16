import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

export const BaseFormMethods = <T,>(shema: any, additionalFields?: UseFormReturn<T>)
    : Partial<UseFormReturn<T>>  => {

    const { register, handleSubmit, setValue,  formState, control } = useForm<T>({
        resolver: zodResolver(shema),
        mode: "all",
    });

    return { register, handleSubmit, setValue,  formState, control, ...additionalFields }
}