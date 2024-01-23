import { useState } from "react";
import FormInput from "./components/FormInput";

export default function EditActivityLocation({ location, submitFun, cancelFun }) {
    const [formData, setFormData] = useState(location);
    const input = {
        name: "location",
        type: "text",
        placeholder: "Location",
        errorMessage: "Location must not be empty",
        label: "Location",
        required: true
    }

    const onChange = (e) => {
        setFormData(e.target.value)
    }

    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); submitFun(formData) }}>
                <FormInput {...input} value={formData} onChange={onChange} />
                <button >Edit</button>
                <button type="button" onClick={cancelFun}>Cancel</button>
            </form>
        </div>
    )
}