import React from "react";
import { Typography, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    h1: "h1",
                    h2: "h2",
                    h3: "h3",
                    h4: "h4",
                },
            },
            styleOverrides: {
                root: {
                    fontFamily: "Ferry",
                    letterSpacing: "0.01em",
                    textAlign: "left",
                },
                h2: {
                    fontFamily: "Ferry",
                },
                h3: {
                    fontFamily: "Ferry",
                },
                h4: {
                    fontFamily: "Ferry",
                },
            },
        },
    },
});

const adaptiveStyles = (variant, matches) => {
    const sizes = {
        h1: { mobile: { fontSize: "28px", lineHeight: "33px", marginBottom: "20px" }, desktop: { fontSize: "60px", lineHeight: "72px", marginBottom: "20px" } },
        h2: { mobile: { fontSize: "28px", lineHeight: "33px", marginBottom: "35px" }, desktop: { fontSize: "45px", lineHeight: "54px", marginBottom: "70px" } },
        h3: { mobile: { fontSize: "26px", lineHeight: "33px", marginBottom: "20px" }, desktop: { fontSize: "40px", lineHeight: "48px", marginBottom: "30px" } },
        h4: { mobile: { fontSize: "28px", lineHeight: "33px", marginBottom: "15px" }, desktop: { fontSize: "30px", lineHeight: "36px", marginBottom: "15px" } },
    };
    

    return matches ? sizes[variant].mobile : sizes[variant].desktop;
};

const CustomTitle = ({ variant = "h1", children, matches, sx = {}, ...others }) => {
    const { fontSize, lineHeight, marginBottom } = adaptiveStyles(variant, matches);

    return (
        <ThemeProvider theme={theme}>
            <Typography
                variant={variant}
                sx={{ fontSize, lineHeight, marginBottom, ...sx }}
                {...others}
            >
                {children}
            </Typography>
        </ThemeProvider>
    );
};

export default CustomTitle;