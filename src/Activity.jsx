import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditActivityTitleForm from "./EditActivityTitleForm";
import EditActivityLocationForm from "./EditActivityLocationForm";
import axios from "axios";
import AddNoteForm from "./AddNoteForm";
import Note from "./Note";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { rgbToHex } from "@mui/material";


export default function Activity({ activity, showActivity, deleteActivity }) {
    // const [focusedActivity, setFocusedActivity] = useState(activity)
    const [formTitleVisible, setFormTitleVisible] = useState(false)
    const [formLocationVisible, setFormLocationVisible] = useState(false)
    const [formAddNoteVisible, setFormAddNoteVisible] = useState(false)
    //https://www.google.com/search?q=louvre+museum
    const locationQueryString = "https://www.google.com/search?q=" + activity.location.replace(/\s+/g, '+')


    const editTitle = (newTitle) => {
        axios.patch(`http://localhost:3001/activities/${activity._id}/title`, {
            id: activity._id, title: newTitle
        })
            .then(activity => {
                setFormTitleVisible(false);
                //setFocusedActivity(activity.data)
                console.log(activity.data, activity)
                showActivity(activity.data)
            })
            .catch(err => console.log(err))
    }

    const editLocation = (newLocation) => {
        axios.patch(`http://localhost:3001/activities/${activity._id}/location`, {
            id: activity._id, location: newLocation
        })
            .then(activity => {
                setFormLocationVisible(false);
                //setFocusedActivity(activity.data)
                console.log(activity.data)
                showActivity(activity.data)
            })
            .catch(err => console.log(err))
    }
    const addANote = (note) => {
        console.log("Note:", note, activity._id)
        axios.post(`http://localhost:3001/activities/${activity._id}/note`, {
            id: activity._id, note: note
        })
            .then(activity => {
                setFormAddNoteVisible(false);
                //setFocusedActivity(activity.data)
                console.log(activity.data)
                showActivity(activity.data)
            })
            .catch(err => console.log(err))
    }

    const deleteANote = (id) => {
        console.log(id)
        axios.delete(`http://localhost:3001/activities/${activity._id}/notes/${id}`, {
            params: { activityId: activity._id, noteId: id }
        })
            .then(activity => {
                setFormAddNoteVisible(false);
                //setFocusedActivity(activity.data)
                console.log(activity.data)
                showActivity(activity.data)
            })
            .catch(err => console.log(err))
    }

    const editANote = (id, newNote, filename) => {
        console.log(id, newNote)
        axios.patch(`http://localhost:3001/activities/${activity._id}/notes/${id}`, {
            activityId: activity._id, noteId: id, note: newNote, filename: filename
        })
            .then(activity => {
                setFormAddNoteVisible(false);
                //setFocusedActivity(activity.data)
                console.log(activity.data)
                showActivity(activity.data)
            })
            .catch(err => console.log(err))
    }

    const addAnImage = (formData) => {
        console.log(formData)
        axios.post(`http://localhost:3001/activities/${activity._id}/images`,
            formData,
            {
                formSerializer: {
                    indexes: null,
                },
                headers:
                    { "Content-type": "multipart/form-data" }
            }).then(res => {
                console.log(res.data);
                addANote(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }
    const editAnImage = (id, formData, filename) => {
        console.log(formData)
        axios.post(`http://localhost:3001/activities/${activity._id}/images`,
            formData,
            {
                formSerializer: {
                    indexes: null,
                },
                headers:
                    { "Content-type": "multipart/form-data" }
            }).then(res => {
                console.log(res.data);
                editANote(id, res.data, filename);
                // if (filename) {
                //     axios.delete(`http://localhost:3001/images/${filename}`,
                //         filename)
                //         .then(res => {
                //             console.log(res.data);
                //             addANote(res.data)
                //         })
                //         .catch(err => {
                //             console.log(err);
                //         })
                // }
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
                <Typography variant="h5" component={'div'} sx={{ fontWeight: 'bold', color: 'secondary.main', textShadow: ' 2px 2px 4px grey' }}>
                    {activity.title}

                    <Tooltip title="Edit this activity">
                        <IconButton onClick={() => { setFormTitleVisible(true) }}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete this activity">
                        <IconButton onClick={deleteActivity}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Typography>
            }
            {formTitleVisible && <EditActivityTitleForm title={activity.title} submitFun={editTitle} cancelFun={cancelEditTitle} />}
            {!formLocationVisible &&
                <Typography variant="h6" component={'div'}>
                    <a href={locationQueryString} target="_blank">
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
                <Typography sx={{ color: 'grey' }} component='div'>Notes:
                    {!formAddNoteVisible &&
                        <Tooltip title="Add a note">
                            <IconButton onClick={() => { setFormAddNoteVisible(true) }}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>}
                    {formAddNoteVisible && <AddNoteForm submitFun={addANote} submitImageFun={addAnImage} cancelFun={cancelAddNote} />}
                    {activity.notes.map(note => {
                        return <Note key={note._id} note={note} deleteNote={() => { deleteANote(note._id) }} editNote={editANote} submitImageFun={editAnImage} />
                    })}
                </Typography>

            </Box>
        </Box>
    )
}