import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {times} from "@/mocks/time";

interface ITimeSelectProps {
    onChange: (time: string) => void;
}

const TimeSelect = ({onChange}: ITimeSelectProps) => {
    return (
        <Select onValueChange={onChange}>
            <SelectTrigger >
                <SelectValue placeholder="Время" />
            </SelectTrigger>
            <SelectContent>
                {
                    times.map(time =>
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                    )
                }
            </SelectContent>
        </Select>
    );
};

export default TimeSelect;