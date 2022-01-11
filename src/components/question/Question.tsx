import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Fade, Grid} from "@mui/material";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {OverviewContent, QuestionNumber, TextFieldStyle} from "./QuestionStyle";
import {RootState} from "../../store/store";
import {
    getRandomQuestion,
    addLife,
    countRightAnswer,
    countWrongAnswer,
    countHints,
    subLife
} from "../../store/moviesSlice";
import Modal from "../modal/Modal";
import MainButton from "../main-button/MainButton";

const Question = () => {
    const {
        finishGame,
        life,
        currentQuestion,
        currentWord,
        questionNumber
    } = useSelector((state: RootState) => state.movies);
    const [isOverview, setIsOverview] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(currentWord);
    const dispatch = useDispatch();

    const getRandomWord = useCallback((word: string) => {
        let countHidden = 0;
        let strArray = word.split('');
        while (countHidden < Math.floor(word.length / 3)) {
            let randomPos = Math.floor(Math.random() * word.length);
            if (strArray[randomPos] !== "_" && strArray[randomPos] !== " ") {
                strArray[randomPos] = "_";
                countHidden++;

            }
        }
        setInputValue(strArray.join(''));
    }, []);

    useEffect(() => {
        getRandomWord(currentQuestion?.name)
    }, [currentQuestion?.name, getRandomWord]);

    const showHint = () => {
        dispatch(countHints());
        setIsOverview(true);
    };

    const hideHint = () => setIsOverview(false);

    const handleNextQuestion = () => {
        if (inputValue === currentQuestion.name) {
            dispatch(countRightAnswer());
            dispatch(addLife());
        } else {
            dispatch(countWrongAnswer());
            dispatch(subLife());
        }
        hideHint();
        dispatch(getRandomQuestion());
    };

    const handleInputValue = (event: { target: { value: string; }; }) => setInputValue(event.target.value);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            {life === 0 && <Modal open
                                  onClose={closeModal}
                                  mode="lose"/>}
            {finishGame && life > 0 ?
                <div>You Have Finished the Game Congratulations!!</div>
                :
                <Grid container
                      spacing={3}
                      justifyContent="center"
                      alignItems="center">
                    <Grid item
                          container
                          xs={12}
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{maxWidth: '32rem'}}>
                        <QuestionNumber>Question: {questionNumber}</QuestionNumber>
                        <MainButton isIcon
                                    onClick={openModal}>
                            <LeaderboardIcon/>
                        </MainButton>
                    </Grid>
                    <Grid item container xs={12}>
                        <TextFieldStyle value={inputValue}
                                        onChange={e => handleInputValue(e)}
                                        fullWidth
                                        variant="standard"
                        />
                    </Grid>
                    <Grid item
                          container
                          xs={12}
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{maxWidth: '32rem'}}>
                        <MainButton isIcon
                                    disabled={isOverview}
                                    onClick={showHint}>
                            <TipsAndUpdatesIcon/>
                        </MainButton>
                        <MainButton isIcon
                                    onClick={handleNextQuestion}
                                    sx={{
                                        backgroundColor: 'secondary.main',
                                        '&:hover': {
                                            backgroundColor: 'secondary.light',
                                        }
                                    }}>
                            <ArrowForwardIosIcon/>
                        </MainButton>
                    </Grid>
                    {isOverview &&
                    <Fade in timeout={500}>
                        <Grid item
                              container
                              xs={12}>
                            <OverviewContent>
                                {currentQuestion.overview}
                            </OverviewContent>
                        </Grid>
                    </Fade>
                    }
                </Grid>
            }
            <Modal open={isOpen}
                   mode="win"
                   onClose={closeModal}
            />
        </div>
    );
};

export default Question;
