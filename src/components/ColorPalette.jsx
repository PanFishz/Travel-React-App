
import { createTheme } from '@mui/material/styles';



const shades = {
    primary: {
        100: "#7DCFB6",
        200: "#daffef",
        300: "rgba(0, 0, 0, 0.55)",
        400: "#FBD1A2",
        500: "#F79256",
        600: '#ef767a',
        700: '#99d8bd'

    },

    secondary: {
        100: "#254e70",
        200: "#13505b",
        300: "#8ee3ef",
        400: "#aef3e7",
        500: "#c33c54",
    },
    neutral: {
        100: "#7bdff2",
        200: "#b2f7ef",
        300: "#eff7f6",
        400: "#f7d6e0",
        500: "#f2b5d4",
    },
};

const theme = createTheme({
    // palette: {
    //     primary: {
    //         main: shades.primary[500],
    //         light: shades.primary[700],
    //     },
    //     secondary: {
    //         main: shades.primary[300],
    //     },
    //     background: {
    //         dark: shades.primary[300],
    //         main: shades.primary[100],
    //         light: shades.primary[200],
    //         //default: "darkgrey"

    //     },
    //     text: {
    //         main: shades.primary[300],
    //         light: shades.secondary[200]
    //     },
    //     action: {
    //         main: shades.primary[200],
    //     },
    //     success: {
    //         dark: shades.primary[600],
    //         main: shades.primary[500],
    //         light: shades.primary[400],
    //     },

    // },

});

export default theme;