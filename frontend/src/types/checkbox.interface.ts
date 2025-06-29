export interface ITag {
    id: string;
    value: string;
    color: string; // hex
}

export interface IUITag extends ITag {
    isLoading?: boolean;
    isError?: boolean;
}