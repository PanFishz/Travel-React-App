import { useState } from 'react';

export default function AddNoteForm({ submitFun }) {
    const [formData, setFormData] = useState({ category: "", content: "" })
    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        submitFun(formData)

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='category'>Category: </label>
                <select value={formData.category} onChange={handleChange} required id='category' name='category' placeholder="Type to search">
                    <option value='' disabled>Select</option>
                    <option value="address" >address</option>
                    <option value="url">url</option>
                    <option value="image">image</option>
                    <option value="note">note</option>
                </select>
                <label htmlFor='content'>Content: </label>
                <input type="text" id='content' name='content' required value={formData.content} onChange={handleChange} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}