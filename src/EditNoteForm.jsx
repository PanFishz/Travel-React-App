import { useState } from "react";
import FormInput from "./components/FormInput";
import './components/FormInput.css'

export default function EditNoteForm({ note, submitFun, submitImageFun, afterSubmitFun }) {
    const [formData, setFormData] = useState(note)
    const [category, setCategory] = useState("")
    const [content, setContent] = useState("")
    const [file, setFile] = useState()

    const input = {
        name: "content",
        type: "text",
        placeholder: "Note content",
        errorMessage: "Note content must not be empty",
        label: "Note content",
        required: true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //submitFun(note._id, formData)
        //afterSubmitFun()
        if (!file) {
            submitFun(note._id, formData, note.filename)
        } else {
            const imageData = new FormData()
            imageData.append("file", file)
            imageData.append("category", category)
            imageData.append("content", content)
            submitImageFun(note._id, imageData, note.filename);
        }
        afterSubmitFun()
    }

    const onChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onChangeImage = (e) => {
        setFile(e.target.files[0]);
        setContent("img")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='category'>Category: </label>
                <select value={formData.category} onChange={onChange} id='category' name='category' placeholder="Type to search">
                    <option value="address" >address</option>
                    <option value="url">url</option>
                    <option value="image">image</option>
                    <option value="note">note</option>
                </select>
                <br />
                {formData.category === "image" ?
                    <div className="formInput">
                        <input
                            filename={file}
                            onChange={onChangeImage}
                            type="file"
                            accept="image/*"
                            required
                        ></input>
                    </div> :
                    <FormInput {...input} value={formData[input.name]} onChange={onChange} formType="textarea" />
                }
                <button type='submit'>Submit</button>
                <button type="button" onClick={afterSubmitFun}>Cancel</button>
            </form>
        </div>
    )
}