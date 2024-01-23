import { useState } from "react"
import FormInput from "./components/FormInput";

export default function AddActivityForm({ submitFun, submitFun2, dayId, cancelFun }) {
    const [formData, setFormData] = useState({ title: "", location: "", notes: [] })

    const inputs = [
        {
            id: 1,
            name: "title",
            type: "text",
            placeholder: "Activity Title",
            errorMessage: "Activity title must not be empty",
            label: "Activity Title",
            required: true

        }, {
            id: 2,
            name: "location",
            type: "text",
            placeholder: "Location",
            errorMessage: "Location must not be empty",
            label: "Location",
            required: true

        }]

    const handleSubmit = (e) => {
        e.preventDefault();
        submitFun(dayId, formData)
        submitFun2()
    }

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={formData[input.name]}
                        onChange={onChange}
                    />
                ))}
                <button>Add</button>
                <button type="button" onClick={cancelFun}>Cancel</button>
            </form>
        </div>
    )
}