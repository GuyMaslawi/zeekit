import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import api, {KEY} from "../axios/api";
import {QuestionModel} from "../models/models";

interface moviesState {
    loading: boolean;
    finishGame: boolean;
    list: [];
    life: number;
    questionNumber: number;
    numberOfQuestions: number;
    rightAnswers: number;
    wrongAnswers: number;
    hints: number;
    currentQuestion: QuestionModel;
    currentWord: string;
}

const initialState: moviesState = {
    loading: false,
    finishGame: false,
    list: [],
    life: 3,
    questionNumber: 0,
    numberOfQuestions: 0,
    rightAnswers: 0,
    wrongAnswers: 0,
    hints: 0,
    currentQuestion: {
        id: 0,
        name: "",
        overview: ""
    },
    currentWord: ""
}

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
    const response = await api.get(`/3/tv/top_rated?api_key=${KEY}`);
    return response.data.results;
})

const MAX_LIFES = 3;

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        countRightAnswer: state => {
            state.rightAnswers++;
        },
        countWrongAnswer: state => {
            state.wrongAnswers++;
        },
        countHints: state => {
            state.hints++;
        },
        addLife: state => {
            if (state.life < 3) {
                state.life++
            } else {
                state.life = MAX_LIFES
            }
        },
        subLife: state => {
            if (state.life === 0) {
                state.finishGame = true
            } else {
                state.life--
            }
        },
        getRandomQuestion: state => {
            state.questionNumber++
            if (state.questionNumber < state.list.length) {
                const randWord = Math.floor(Math.random() * state.list.length);
                state.currentQuestion = state.list[randWord];

            } else {
                state.finishGame = true
                state.life = MAX_LIFES
            }
        },
        reset: () => initialState

    },
    extraReducers: builder => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<[]>) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchMovies.rejected, (state) => {
                state.loading = false
            })
    }
})

export const {
    countRightAnswer,
    countWrongAnswer,
    countHints,
    getRandomQuestion,
    addLife,
    subLife,
    reset
} = moviesSlice.actions
export default moviesSlice.reducer
