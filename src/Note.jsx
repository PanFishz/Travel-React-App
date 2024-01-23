import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import LinkIcon from '@mui/icons-material/Link';
import ImageIcon from '@mui/icons-material/Image';
import NotesIcon from '@mui/icons-material/Notes';
import EditNoteForm from "./EditNoteForm";
import './Note.css'

export default function Note({ note, deleteNote, editNote, submitImageFun }) {
    const [editNoteFormVisible, setEditNoteFormVisible] = useState(false)
    let noteType = "";
    let categoryIcon = "";
    switch (note.category) {
        case 'url':
            categoryIcon = <LinkIcon />
            noteType = <a href={note.content} target="_blank">{note.content}</a>;
            break;
        case 'image':
            categoryIcon = <ImageIcon />
            //resizing: /c_scale,w_600
            //https://res.cloudinary.com/droagjbtj/image/upload/c_scale,w_600/v1705956844/TravelApp/fbyqkqhzww1ksj49rppk.jpg
            let imgUrl = note.content.split("upload");
            imgUrl = imgUrl[0] + "upload/c_scale,w_600" + imgUrl[1];

            noteType = <img className="NoteImage" src={imgUrl} alt="" />
            break;
        case 'address':
            categoryIcon = <HomeIcon />
            //https://www.google.com/maps/place/11037+Ohio+Ave,+Los+Angeles,+CA+90025/
            const addressString = "https://www.google.com/maps/place/" + note.content.replace(/\s+/g, '+')
            noteType = <a href={addressString} target="_blank">address: {note.content}</a>;
            break;
        case 'note':
            categoryIcon = <NotesIcon />
            noteType = <span>{note.content}</span>;
            break;
        default:
            console.log("error")
    }

    return (
        <div className="Note">
            {!editNoteFormVisible &&
                <div>
                    <div>

                    </div>
                    {categoryIcon}{noteType}
                    <EditIcon onClick={() => { setEditNoteFormVisible(true) }} />
                    <DeleteIcon onClick={deleteNote} />
                </div>}
            {editNoteFormVisible && <EditNoteForm note={note} submitFun={editNote} submitImageFun={submitImageFun} afterSubmitFun={() => { setEditNoteFormVisible(false) }} />}
        </div>
    )

}