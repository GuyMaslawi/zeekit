import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import MainButton from "../main-button/MainButton";
import {reset} from "../../store/moviesSlice";

interface DialogProps {
    mode?: 'lose' | 'win';
    open: boolean;
    onClose: () => void;
}

const Modal = ({
                   mode,
                   open = false,
                   onClose
               }: DialogProps) => {
    const dispatch = useDispatch();
    const {wrongAnswers, rightAnswers, hints} = useSelector((state: RootState) => state.movies);

    const handleNewGame = () => dispatch(reset());

    return (
        <Dialog open={open}
                onClose={onClose}
                onBackdropClick={onClose}
        >
            {mode === 'win' ?
                <div>
                    <DialogTitle sx={{
                        fontSize: '2rem'
                    }}>
                        Player Statistics
                    </DialogTitle>
                    <DialogContent sx={{
                        fontSize: '1.6rem',
                        lineHeight: '1.3'
                    }}>
                        <div>You answered <b>{rightAnswers}</b> correct answers</div>
                        <div>You answered <b>{wrongAnswers}</b> wrong answers</div>
                        <div>You use <b>{hints}</b> hints</div>
                    </DialogContent>
                </div>
                :
                <div>
                    <DialogTitle sx={{
                        fontSize: '2rem'
                    }}>
                        Almost There :(
                    </DialogTitle>
                    <DialogContent sx={{
                        fontSize: '1.6rem',
                        lineHeight: '1.3'
                    }}>
                        <div>I'm sorry, Your Lifes is Over!!</div>
                    </DialogContent>
                    <DialogActions style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <MainButton onClick={handleNewGame}
                                    sx={{
                                        fontSize: '1.6rem'
                                    }}>
                            State New Game
                        </MainButton>
                    </DialogActions>
                </div>
            }
        </Dialog>
    );
};

export default Modal;
