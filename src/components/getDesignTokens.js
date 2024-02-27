import { grey, cyan } from '@mui/material/colors';

const getDesignTokens = (mode) => ({
    palette: {
        mode,
        primary: {
            ...cyan,
            ...(mode === 'dark' && {
                main: cyan[200],
                paper: cyan[900],
            }),
            ...(mode === 'light' && {
                main: cyan[400],
                paper: cyan[700],
            }),
        },
        ...(mode === 'dark' && {
            background: {
                main: cyan[400],
                paper: cyan[400],
                default: cyan[200],
            },
            textcolor: {
                lightest: grey[300],
                light: grey[700],
                main: grey[800],
                dark: grey[900],
                special: '#fff',
                link: grey[100],
                icon: grey[700]
            },
        }),
        ...(mode === 'light' && {
            background: {
                main: cyan[400],
                paper: cyan[400],
                default: cyan[100],
            },
            textcolor: {
                lightest: grey[500],
                light: grey[600],
                main: grey[700],
                dark: grey[800],
                special: '#fff',
                link: grey[700],
                icon: '#fff'
            },
        }),
        text: {
            ...(mode === 'light'
                ? {
                    primary: grey[800],
                    secondary: grey[700],
                }
                : {
                    primary: '#fff',
                    secondary: grey[900],
                }),
        },
    },
});

export default getDesignTokens