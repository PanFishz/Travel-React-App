import { useState } from "react";
import FormInput from "./components/FormInput";

export default function EditDestinationForm({ submitFun, destination, id, cleanup }) {
    const [formData, setFormData] = useState(destination);

    const input = {
        name: "destination",
        type: "text",
        placeholder: "Destination",
        errorMessage: "Destination must not be empty",
        label: "destination",
        required: true
    }
    const onChange = (e) => {
        setFormData(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        submitFun(id, formData);
        cleanup();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FormInput {...input} value={formData} onChange={onChange} />
                <button>Submit</button>
                <button type="button" onClick={cleanup}>Cancel</button>
            </form>
        </div>
    )
}