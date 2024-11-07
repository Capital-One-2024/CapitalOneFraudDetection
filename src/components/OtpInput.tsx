import classNames from "classnames";
import { Controller, useFormContext } from "react-hook-form";

interface OtpInputProps {
    name: string;
}

export default function OtpInput({ name }: OtpInputProps) {
    const { control, getValues, setFocus, setValue } = useFormContext();

    const FIELDS = Object.keys(getValues());
    const MY_INDEX = FIELDS.indexOf(name);
    const IS_FIRST_FIELD = MY_INDEX === 0;
    const IS_LAST_FIELD = MY_INDEX === FIELDS.length - 1;

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <input
                    {...field}
                    type="text"
                    className={classNames(
                        "bg-white p-2 w-11 h-11 rounded-lg text-center font-bold",
                        "md:w-14 md:h-14"
                    )}
                    maxLength={1}
                    onChange={(e) => {
                        const NEW_VALUE = e.target.value;
                        // If the new value is a digit, update the field
                        if (NEW_VALUE.match(/[0-9]/)) {
                            field.onChange(NEW_VALUE);

                            // If I am the last field, do nothing
                            if (IS_LAST_FIELD) return;

                            // Otherwise, focus on the next field
                            setFocus(FIELDS[MY_INDEX + 1]);
                        } else {
                            // Otherwise, ignore the input
                            return;
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Backspace") {
                            // Clear the current field
                            field.onChange("");

                            // If I am the first field, do nothing
                            if (IS_FIRST_FIELD) return;

                            // Otherwise, focus on the previous field
                            setFocus(FIELDS[MY_INDEX - 1]);
                        }
                    }}
                    onPaste={(e) => {
                        e.preventDefault();
                        const PASTE_DATA = e.clipboardData.getData("text");
                        // If the pasted data is a 6-digit number
                        if (PASTE_DATA.match(/^[0-9]{6}$/)) {
                            // Update the fields
                            FIELDS.forEach((field, index) => {
                                setValue(field, PASTE_DATA[index]);
                            });

                            // Focus on the last field
                            setFocus(FIELDS[FIELDS.length - 1]);
                        } else {
                            // Otherwise, ignore the paste
                            return;
                        }
                    }}
                />
            )}
        />
    );
}
