import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import LinkIcon from '@mui/icons-material/Link';
import ImageIcon from '@mui/icons-material/Image';
import NotesIcon from '@mui/icons-material/Notes';
import EditNoteForm from "./EditNoteForm";
import './Note.css'
import '../public/stylesheets/NoteImage.css';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';


export default function Note({ note, deleteNote, editNote, submitImageFun, setMessage }) {
    const [editNoteFormVisible, setEditNoteFormVisible] = useState(false)
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        setMessage('')
    }, [editNoteFormVisible])

    let noteType = "";
    let categoryIcon = "";
    switch (note.category) {
        case 'url':
            categoryIcon = <LinkIcon />
            noteType = <a href={note.content} target="_blank" className="dont-break-out">{note.content}</a>;
            break;
        case 'image':
            categoryIcon = null
            // categoryIcon = <ImageIcon />
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
            noteType = <a href={addressString} target="_blank" sx={{ textDecoration: 'underline' }}> {note.content}</a>;
            break;
        case 'note':
            categoryIcon = <NotesIcon />
            noteType = <span>{note.content}</span>;
            break;
        default:
            console.log("error")
    }

    return (
        <Box className="Note">
            {!editNoteFormVisible &&
                <Box>
                    {categoryIcon}
                    <br />
                    {noteType}
                    <br />
                    <Tooltip title="Edit this note">
                        <IconButton onClick={() => { setEditNoteFormVisible(true) }}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete this note">
                        <IconButton onClick={() => {
                            setButtonDisabled(true);
                            deleteNote();
                        }}
                            disabled={isButtonDisabled}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>}
            {editNoteFormVisible && <EditNoteForm note={note} submitFun={editNote} submitImageFun={submitImageFun} afterSubmitFun={() => { setEditNoteFormVisible(false) }} />}
        </Box>
    )

}