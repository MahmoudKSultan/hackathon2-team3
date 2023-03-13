import { useMemo, forwardRef, Children } from "react";
import type { InputProps } from "components/types";

export const RadioButton = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            id,
            type,
            value,
            checked,
            name,
            onChange,
            className,
            children,
            ...rest
        },
        ref
    ) => {

        return (
            <div className="flex items-center p-2 pl-4 border border-gray-200 rounded shadow">
                <input id={id} type={type} value={value} checked={checked} name={name} className={className} onChange={onChange} />
                <label htmlFor={id} className="ml-6 text-base font-bold">{label}</label>
                {children}
            </div>

        )
    }
);

RadioButton.displayName = "Input";

export default RadioButton;