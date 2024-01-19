import { useState } from "react";

export default function EditActivityLocation({ location, submitFun }) {
    const [formData, setFormData] = useState(location)

    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); submitFun(formData) }}>
                <input type="text" value={formData} onChange={(e) => {
                    setFormData(e.target.value)
                }} />
                <button type="submit">Edit</button>
            </form>
        </div>
    )
}