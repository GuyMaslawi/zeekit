import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import GlobalStyle from "./GlobalStyle";
import {fetchMovies, getRandomQuestion} from "./store/moviesSlice";
import {RootState} from "./store/store";
import Loader from "./components/loader/Loader";
import Header from "./components/header/Header";
import {Content} from './AppStyle';
import Question from "./components/question/Question";

const App = () => {
    const dispatch = useDispatch();
    const {list, loading} = useSelector((state: RootState) => state.movies);

    useEffect(() => {
        dispatch(fetchMovies());
        if (list.length) {
            dispatch(getRandomQuestion());
        }
    }, [dispatch, list.length]);

    return (
        loading ?
            <Loader/>
            :
            <div>
                <GlobalStyle/>
                <Header title="Movie Game"/>
                <Content>
                    <Question/>
                </Content>
            </div>
    );
}

export default App;
