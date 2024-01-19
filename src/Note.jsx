import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditNoteForm from "./EditNoteForm";
import './Note.css'

export default function Note({ note, deleteNote, editNote }) {
    const [editNoteFormVisible, setEditNoteFormVisible] = useState(false)

    return (
        <div className="Note">
            {!editNoteFormVisible && <div>{note.category} - {note.content}
                <EditIcon onClick={() => { setEditNoteFormVisible(true) }} />
                <DeleteIcon onClick={deleteNote} /></div>}
            {editNoteFormVisible && <EditNoteForm note={note} submitFun={editNote} afterSubmitFun={() => { setEditNoteFormVisible(false) }} />}
        </div>
    )

}