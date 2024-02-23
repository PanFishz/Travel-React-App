import { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditActivityTitleForm from "./EditActivityTitleForm";
import EditActivityLocationForm from "./EditActivityLocationForm";
import axios from './api/axios';
import AddNoteForm from "./AddNoteForm";
import Note from "./Note";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


export default function Activity({ activity, deleteActivity, setUpdated, user, setMessage }) {
    const [formTitleVisible, setFormTitleVisible] = useState(false)
    const [formLocationVisible, setFormLocationVisible] = useState(false)
    const [formAddNoteVisible, setFormAddNoteVisible] = useState(false)
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        setMessage('')
    }, [formTitleVisible, formLocationVisible, formAddNoteVisible])

    //https://www.google.com/search?q=louvre+museum
    const locationQueryString = "https://www.google.com/search?q=" + activity.location.replace(/\s+/g, '+')


    const editTitle = (newTitle) => {
        axios.patch(`/activities/${activity._id}/title`, {
            id: activity._id, title: newTitle
        }, { withCredentials: true, })
            .then(activity => {
                setFormTitleVisible(false);
                setUpdated()
            })
            .catch(err => console.log(err))
    }

    const editLocation = (newLocation) => {
        axios.patch(`/activities/${activity._id}/location`, {
            id: activity._id, location: newLocation
        }, { withCredentials: true, })
            .then(activity => {
                setFormLocationVisible(false);
                setUpdated()
            })
            .catch(err => console.log(err))
    }
    const addANote = (note) => {
        axios.post(`/activities/${activity._id}/note`, {
            id: activity._id, note: note, userId: user
        }, { withCredentials: true, })
            .then(activity => {
                setFormAddNoteVisible(false);
                setUpdated()
            })
            .catch(err => console.log(err))
    }

    const deleteANote = (id) => {
        axios.delete(`/activities/${activity._id}/notes/${id}`, {
            params: { activityId: activity._id, noteId: id },
            withCredentials: true,
        })
            .then(activity => {
                setFormAddNoteVisible(false);
                setUpdated()
            })
            .catch(err => console.log(err))
    }

    const editANote = (id, newNote, filename) => {
        axios.patch(`/activities/${activity._id}/notes/${id}`, {
            activityId: activity._id, noteId: id, note: newNote, filename: filename
        }, { withCredentials: true, })
            .then(activity => {
                setFormAddNoteVisible(false);
                setUpdated()
            })
            .catch(err => console.log(err))
    }

    const addAnImage = (formData) => {
        axios.post(`/activities/${activity._id}/images`,
            formData,
            {
                formSerializer: {
                    indexes: null,
                },
                headers:
                    { "Content-type": "multipart/form-data" },
                withCredentials: true,
            }).then(res => {
                addANote(res.data)

            })
            .catch(err => {
                console.log(err);
            })
    }
    const editAnImage = (id, formData, filename) => {
        axios.post(`/activities/${activity._id}/images`,
            formData,
            {
                formSerializer: {
                    indexes: null,
                },
                headers:
                    { "Content-type": "multipart/form-data" },
                withCredentials: true,
            }).then(res => {
                editANote(id, res.data, filename);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const cancelEditTitle = () => {
        setFormTitleVisible(false)
    }

    const cancelEditLocation = () => {
        setFormLocationVisible(false)
    }

    const cancelAddNote = () => {
        setFormAddNoteVisible(false)
    }

    return (
        <Box>
            {!formTitleVisible &&
                <Typography variant="h6" component={'div'} sx={{ fontWeight: 'bold', color: 'text.main', textShadow: ' 2px 2px 4px grey' }}>
                    {activity.title}

                    <Tooltip title="Edit this activity">
                        <IconButton onClick={() => { setFormTitleVisible(true) }}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete this activity">
                        <IconButton onClick={() => {
                            setButtonDisabled(true);
                            deleteActivity();

                        }} disabled={isButtonDisabled}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Typography>
            }
            {formTitleVisible && <EditActivityTitleForm title={activity.title} submitFun={editTitle} cancelFun={cancelEditTitle} />}
            {!formLocationVisible &&
                <Typography variant="h7" component={'div'} >
                    <a href={locationQueryString} target="_blank" >
                        {activity.location}
                    </a>
                    <Tooltip title="Edit this activity">
                        <IconButton onClick={() => { setFormLocationVisible(true) }}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>

                </Typography>}
            {formLocationVisible && <EditActivityLocationForm location={activity.location} submitFun={editLocation} cancelFun={cancelEditLocation} />}
            <Box>
                <Typography sx={{ color: 'textcolor.link' }} component='div'>Notes:
                    {!formAddNoteVisible &&
                        <Tooltip title="Add a note">
                            <IconButton onClick={() => { setFormAddNoteVisible(true) }}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>}
                    {formAddNoteVisible && <AddNoteForm submitFun={addANote} submitImageFun={addAnImage} cancelFun={cancelAddNote} />}
                    {activity.notes.map(note => {
                        return <Note key={note._id} note={note} deleteNote={() => { deleteANote(note._id) }} editNote={editANote} submitImageFun={editAnImage} setMessage={setMessage} />
                    })}
                </Typography>

            </Box>
        </Box>
    )
}