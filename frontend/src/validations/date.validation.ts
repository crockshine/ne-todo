import {combineDate} from "@/helpers/combineDate";

export const validateDateTime = (day: Date | undefined, time: string | undefined) => {
    if (time && !day) {
        return { isValid: false, error: 'нельзя указать время без даты' };
    }

    if (day && time) {
        const now = new Date();
        const selectedDateTime = combineDate(day, time);

        if (selectedDateTime.toDateString() === now.toDateString() && selectedDateTime < now) {
            return { isValid: false, error: 'время не может быть меньше текущего' };
        }
    }

    return { isValid: true };
};