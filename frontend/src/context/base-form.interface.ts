import { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormSetValue} from "react-hook-form";

export interface IBaseFormInterface<T> {
    register: UseFormRegister<T>;
    handleSubmit?: UseFormHandleSubmit<T>;
    setValue: UseFormSetValue<T>;
    formState: { errors: FieldErrors<T> };

}