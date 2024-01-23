import { useState } from 'react'
import FormInput from "./components/FormInput";


export default function EditActivityTitleForm({ title, submitFun, cancelFun }) {
    const [formData, setFormData] = useState(title)
    const input = {
        name: "title",
        type: "text",
        placeholder: "Activity Title",
        errorMessage: "Activity title must not be empty",
        label: "Activity Title",
        required: true

    }
    const onChange = (e) => {
        setFormData(e.target.value)
    }
    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); submitFun(formData) }}>
                <FormInput  {...input}
                    value={formData}
                    onChange={onChange} />
                <button type="submit">Edit</button>
                <button type="button" onClick={cancelFun}>Cancel</button>
            </form>
        </div>
    )

}