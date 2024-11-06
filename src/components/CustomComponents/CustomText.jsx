import React from "react";
import { ThemeProvider, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    p: 'p'
                }
            },
            styleOverrides: {
                root: {
                    fontFamily: "Inter",
                    fontWeight: 400,
                    lineHeight: "21px",
                    textTransform: "none",
                    letterSpacing: 0.1
                },
            },
        },
    },
});


const CustomText = (props) => {
    let { children, ...others } = props;

    return (
        <ThemeProvider theme={theme}>
            <Typography variant="p" {...others}>{children}</Typography>
        </ThemeProvider>
    );
};
export default CustomText;