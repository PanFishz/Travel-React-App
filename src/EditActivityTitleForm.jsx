import { useState } from 'react'


export default function EditActivityTitleForm({ title, submitFun }) {
    const [formData, setFormData] = useState(title)

    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); submitFun(formData) }}>
                <input type="text" value={formData} placeholder={formData} onChange={(e) => {
                    setFormData(e.target.value)
                }} />
                <button type="submit">Edit</button>
            </form>
        </div>
    )

}