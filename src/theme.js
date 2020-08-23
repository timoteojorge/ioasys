import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#57bbbc',
        },
        secondary: {
            main: '#EF5781',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#ebe9d7',
        },
    },
});

export default theme;