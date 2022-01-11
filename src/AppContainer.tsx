import {ThemeProvider, createTheme} from '@mui/material/styles';
import {StylesProvider} from "@mui/styles";
import App from "./App";

export const AppContainer = () => {

    const theme = createTheme({
        palette: {
            primary: {
                main: 'rgb(0, 127, 255)',
                light: 'rgba(0, 127, 255, .8)',
            },
            secondary: {
                main: 'rgb(40, 167, 69)',
                light: 'rgba(40, 167, 69, .8)',
            },
            error: {
                main: '#F08080',
            }
        }
    });

    return (
        <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </StylesProvider>
    );
};

export default AppContainer;
