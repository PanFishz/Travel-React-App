import { useState } from "react";

export default function EditNoteForm({ note, submitFun, afterSubmitFun }) {
    const [formData, setFormData] = useState(note)

    const handleSubmit = (e) => {
        e.preventDefault();
        submitFun(note._id, formData)
        afterSubmitFun()
    }

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='category'>Category: </label>
                <select value={formData.category} onChange={handleChange} id='category' name='category' placeholder="Type to search">
                    <option value="address" >address</option>
                    <option value="url">url</option>
                    <option value="image">image</option>
                    <option value="note">note</option>
                </select>
                <label htmlFor='content'>Content: </label>
                <input type="text" id='content' name='content' value={formData.content} onChange={handleChange} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}