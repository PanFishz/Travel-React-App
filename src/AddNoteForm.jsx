import { useState } from 'react';
import FormInput from "./components/FormInput";
import './components/FormInput.css'



export default function AddNoteForm({ submitFun, submitImageFun, cancelFun }) {
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

    const onChange = (e) => {
        setFile(e.target.files[0]);
        setContent("img")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            submitFun({ category, content })
        } else {
            const formData = new FormData()
            formData.append("file", file)
            formData.append("category", category)
            formData.append("content", content)
            submitImageFun(formData);
        }


        //const result = await axios.post('http://localhost:3001/api/images', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        //setImageName(result.data.imageName)

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='category'>Category: </label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} required id='category' name='category' placeholder="Type to search">
                    <option value='' disabled>Select</option>
                    <option value="address" >address</option>
                    <option value="url">url</option>
                    <option value="image">image</option>
                    <option value="note">note</option>
                </select>
                {category === "image" ?
                    <div className="formInput">
                        <input
                            filename={file}
                            onChange={onChange}
                            type="file"
                            accept="image/*"
                            required
                        ></input>
                    </div> :
                    <FormInput {...input} value={content} onChange={(e) => setContent(e.target.value)} formType="textarea" />
                }
                <button type='submit'>Submit</button>
                <button type="button" onClick={cancelFun}>Cancel</button>

            </form>
            {/* {image && <img src={image} />} */}
        </div>
    )
}