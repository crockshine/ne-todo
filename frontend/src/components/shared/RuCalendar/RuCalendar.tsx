import React from 'react';
import {ru} from "date-fns/locale";
import {Calendar} from "@/components/ui/calendar";

interface ICalendarProps {
    date?: Date;
    setDate: (date?: Date) => void;
}

const RuCalendar = ({date, setDate}: ICalendarProps) => {
    return (
        <Calendar
            mode="single"
            locale={ru}
            selected={date}
            onSelect={(date) => setDate(date)}
            className="rounded-lg border"
        />
    );
};

export default RuCalendar;