import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Fade, Grid, useMediaQuery} from "@mui/material";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {OverviewContent, QuestionNumber, TextFieldStyle, QuestionText} from "./QuestionStyle";
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
        questionNumber
    } = useSelector((state: RootState) => state.movies);
    const [isOverview, setIsOverview] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [randomWord, setRandomWord] = useState("");
    const dispatch = useDispatch();
    const isMobile = useMediaQuery('(max-width: 599px)');

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
        setRandomWord(strArray.join(''));
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
                      justifyContent="center"
                      alignItems="center"
                      xs={12}>
                    <Grid item
                          container
                          xs={12}
                          justifyContent={isMobile ? "initial" : "space-between"}
                          alignItems="center">
                        <Grid item xs={6} sm={2}>
                            <QuestionNumber>Question: {questionNumber}</QuestionNumber>
                        </Grid>
                        <Grid item sm container direction={isMobile ? 'row' : 'row-reverse'}>
                            <Grid item xs={12} sm={2} sx={{textAlign: 'right'}}>
                                <MainButton isIcon
                                            onClick={openModal}>
                                    <LeaderboardIcon/>
                                </MainButton>
                            </Grid>
                            <Grid item xs={12} sm>
                                <QuestionText>{randomWord}</QuestionText>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item
                          container
                          xs={12}
                          justifyContent="center"
                          sx={{
                              margin: '5rem 0'
                          }}>
                        <Grid item xs sm={7}>
                            <TextFieldStyle value={inputValue}
                                            onChange={e => handleInputValue(e)}
                                            fullWidth
                                            placeholder="Answer"
                            />
                        </Grid>
                    </Grid>
                    <Grid item
                          container
                          xs={12}
                          justifyContent="space-between"
                          alignItems="center">
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
                              xs={12}
                              sx={{ marginTop: isMobile ? '2rem' : '0' }}>
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
