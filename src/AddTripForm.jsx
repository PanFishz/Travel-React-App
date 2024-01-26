import { useState } from "react"
import FormInput from "./components/FormInput"
import Box from '@mui/material/Box';



export default function AddTripForm({ submitFun, cancelFun }) {
    const [formData, setFormData] = useState({ destination: "", duration: 1 })
    // const [invalidInput, setInvalidInput] = useState(false)

    const inputs = [
        {
            id: 1,
            name: "destination",
            type: "text",
            placeholder: "Destination",
            errorMessage: "Destination must not be empty",
            label: "destination",
            required: true

        }, {
            id: 2,
            name: "duration",
            type: "number",
            placeholder: "Duration",
            errorMessage: "Duration must be at least 1",
            label: "duration",
            min: 1,
            required: true

        }]

    const handleSubmit = (e) => {
        e.preventDefault();
        submitFun(formData);
        // if (formData.destination === "") {
        //     console.log("error")
        //     setInvalidInput(true)
        // } else {
        //     submitFun(formData);
        // }
    }
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                {/* <label htmlFor="destination" >destination: </label>
            <input type="text" id="destination" value={formData.destination} required onChange={(e) => setFormData({ ...formData, destination: e.target.value })} />
            <label htmlFor="duration">duration: </label>
            <input type="number" min="1" id="duration" value={formData.duration} required onChange={(e) => setFormData({ ...formData, duration: e.target.value })} />
            <button type="submit">Add</button>
            {invalidInput && <div>Destination is required</div>} */}
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
        </Box>
    )
}