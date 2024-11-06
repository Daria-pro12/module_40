import { Box } from "@mui/material";
import React from "react";
import CustomText from "../../CustomComponents/CustomText";
import { CustomButton } from "../../CustomComponents/CustomButton";
import { colors } from "../../../assets/colors";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                flexGrow: 1.5,
                display: { xs: "none", lg: "flex" },
                justifyContent: "end",
                alignItems: "center",
                gap: "50px"
            }}
        >
            <CustomText style={{ color: "rgba(0, 0, 0, 0.4)", cursor: "pointer", fontSize: "14px" }}>
                Зарегистрироваться
            </CustomText>
            <CustomButton
                variant="blue"
                onClick={() => navigate('/login')}
                style={{
                    position: "relative",
                    backgroundColor: colors.colorLightBlue,
                    color: colors.colorBlack,
                    fontSize: "14px",
                    lineHeight: "17px",
                    padding: "5px 10px",
                    minWidth: "inherit",
                }}
            >
                <div
                    style={{
                        content: "",
                        position: "absolute",
                        borderLeft: `2px solid ${colors.colorLightBlue}`,
                        height: "100%",
                        top: 0,
                        left: "-25px",
                    }}
                />
                Войти
            </CustomButton>
        </Box>
    );
};

export { Unauthorized };
