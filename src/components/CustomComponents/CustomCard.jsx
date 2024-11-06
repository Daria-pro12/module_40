import React from "react";
import { Card, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: "10px",
                    boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.2)",
                    margin: "0 30px",
                },
            },
        },
    },
});

const CustomCard = (props) => {
    let { children, ...others } = props;
    return (
        <ThemeProvider theme={theme}>
            <Card variant={"outlined"} {...others}>
                {children}
            </Card>
        </ThemeProvider>
    );
};

export { CustomCard };