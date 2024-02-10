import Box from '@mui/material/Box';
import ClearIcon from '@mui/icons-material/Clear';

export default function Flash({ message, setMessage }) {
    return (
        <Box>
            {message} <ClearIcon onClick={() => setMessage('')} />
        </Box>
    )
}