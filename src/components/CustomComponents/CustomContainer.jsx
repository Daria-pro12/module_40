import React from "react";
import { Container, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const CustomContainer = (props) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));
    let { children, ...others } = props;

    const responsive = matches
        ? { padding: "0 10px", maxWidth: "100%", margin: "0 auto" } 
        : { padding: "0 60px", maxWidth: "1440px", margin: "0 auto" };
    return (
        <Container maxWidth="false" style={responsive} {...others}>
            {children}
        </Container>
    );
};

export { CustomContainer };