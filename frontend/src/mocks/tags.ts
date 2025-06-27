export interface TTag {
    id: number;
    value?: string;
    color:number;
    isLoading?: boolean;
    isError?: boolean;
}

export const tabs: TTag[] = [
    {
        id: 1,
        value: 'Работа',
        color: 1
    },
    {
        id: 2,
        value: 'Учеба',
        color: 2
    },
    {
        id: 3,
        value: 'Личное',
        color: 3
    },
    {
        id: 4,
        value: 'Не публичное',
        color: 4
    },
    {
        id: 5,
        value: 'Очень',
        color: 5
    },
    {
        id: 6,
        value: 'Туду',
        color: 1
    }
]