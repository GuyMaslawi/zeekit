import {ReactNode} from "react";
import {Button} from "@mui/material";
import {IconButtonStyle} from './MainButtonStyle';

interface MainButtonProps {
    variant?: "contained" | "outlined";
    onClick: () => void;
    isIcon?: boolean;
    disabled?: boolean;
    children: ReactNode;
    sx?: {};
}

const MainButton = ({
                        variant = "contained",
                        onClick,
                        isIcon = false,
                        disabled = false,
                        children,
                        sx
                    }: MainButtonProps) => {

    return (
        isIcon ?
            <IconButtonStyle onClick={onClick}
                             disabled={disabled}
                             sx={sx}>
                {children}
            </IconButtonStyle>
            :
            <Button variant={variant}
                    onClick={onClick}
                    disabled={disabled}
                    sx={sx}>
                {children}
            </Button>
    );
};

export default MainButton;
