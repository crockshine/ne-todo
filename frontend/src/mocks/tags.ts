export interface ITab {
    id: number;
    name: string;
    value?: string;
    color:number;
}



export const tabs: ITab[] = [
    {
        id: 1,
        name: 'tag',
        value: 'Работа',
        color: 1
    },
    {
        id: 2,
        name: 'tag',
        value: 'Учеба',
        color: 2
    },
    {
        id: 3,
        name: 'tag',
        value: 'Личное',
        color: 3
    },
    {
        id: 4,
        name: 'tag',
        value: 'Не публичное',
        color: 4
    },
    {
        id: 5,
        name: 'tag',
        value: 'Очень',
        color: 5
    },
    {
        id: 6,
        name: 'tag',
        value: 'Туду',
        color: 1
    }
]