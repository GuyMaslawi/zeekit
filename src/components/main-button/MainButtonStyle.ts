import {IconButton} from "@mui/material";
import {styled} from '@mui/system';

export const IconButtonStyle = styled(IconButton)(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    height: '5rem',
    width: '5rem',

    '&:hover': {
        backgroundColor: theme.palette.primary.light,
    },

    '.MuiSvgIcon-root': {
        width: '2.5rem',
        height: '2.5rem',
    }
}));
