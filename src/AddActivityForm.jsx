import { useState } from "react"

export default function AddActivityForm({ submitFun, submitFun2, dayId }) {
    const [formData, setFormData] = useState({ title: "", location: "", notes: [] })
    const handleSubmit = (e) => {
        e.preventDefault();
        submitFun(dayId, formData)
        submitFun2()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">title: </label>
                <input type="text" id="title" value={formData.title} required
                    onChange={(e) => { setFormData({ ...formData, title: e.target.value }) }} />
                <label htmlFor="location">location: </label>
                <input type="text" id="location" value={formData.location} required
                    onChange={(e) => { setFormData({ ...formData, location: e.target.value }) }} />
                <button>Add Activity</button>
            </form>
        </div>
    )
}