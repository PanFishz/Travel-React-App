import { useState } from "react";
import CheckIcon from '@mui/icons-material/Check';

export default function EditDestinationForm({ submitFun, destination, id, cleanup }) {
    const [formData, setFormData] = useState(destination);

    const handleSubmit = (e) => {
        e.preventDefault();
        submitFun(id, formData);
        cleanup();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={formData} required onChange={(e) => { setFormData(e.target.value) }} />
                <CheckIcon onClick={handleSubmit} />
            </form>
        </div>
    )
}