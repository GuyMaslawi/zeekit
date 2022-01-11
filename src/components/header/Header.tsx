import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {Wrapper, Holder, Title, Life} from './HeaderStyle';

interface HeaderProps {
    title: string;
}

const Header = ({title}: HeaderProps) => {
    const lifePoints = useSelector((state: RootState) => state.movies.life);

    return (
        <Wrapper>
            <Holder>
                <Title>{title}</Title>
                <Life>Life: {lifePoints}</Life>
            </Holder>
        </Wrapper>
    );
};

export default Header;
