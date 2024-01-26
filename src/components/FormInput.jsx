import { useState } from "react";
import "./formInput.css";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, formType = "input", ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <div className="formInput">
            <label>{label}</label>
            {formType === 'input' && <input
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() =>
                    inputProps.name === "confirmPassword" && setFocused(true)
                }
                focused={focused.toString()}
            />}
            {formType === 'textarea' && <TextareaAutosize
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() =>
                    inputProps.name === "confirmPassword" && setFocused(true)
                }
                focused={focused.toString()}
            />}

            <span>{errorMessage}</span>
        </div>
    );
};

export default FormInput;
