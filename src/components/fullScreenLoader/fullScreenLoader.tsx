import { CircularProgress } from "@mui/material";
import { FC } from "react";
import { FullScreenLoaderStyled } from "./fullScreenLoader.style";

const FullScreenLoader: FC = () => {


    return(
        <FullScreenLoaderStyled>
            <CircularProgress size={60} />
        </FullScreenLoaderStyled>
    )
}

export default FullScreenLoader;