import {styled} from '@mui/system';
import {TextField} from "@mui/material";

export const QuestionNumber = styled('div')`
  font-size: 1.8rem;
`;

export const OverviewContent = styled('div')`
  border-top: .1rem solid #ccc;
  font-size: 1.8rem;
  padding: 1rem 0 0;
`;

export const QuestionText = styled('div')`
  font-size: 4rem;
  font-weight: bold;
  letter-spacing: 1rem;
  text-align: center;
  
  @media (max-width: 599px){
    font-size: 2rem;
    margin: 3rem 0;
  }
`;

export const TextFieldStyle = styled(TextField)({
    '& .MuiInputBase-input': {
        fontSize: '2.5rem',
        letterSpacing: '1rem',
    }
});
