import {EColor} from '../../../backend/node_modules/@prisma/client'

export interface ITag {
    id: string;
    value: string;
    color: EColor
}

export interface IUITag extends ITag {
    isLoading?: boolean;
    isError?: boolean;
}