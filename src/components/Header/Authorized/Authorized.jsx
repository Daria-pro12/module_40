import React from "react";
import CustomText from "../../CustomComponents/CustomText";
import { Box, Avatar } from "@mui/material";
import { colors } from "../../../assets/colors";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../store/Slicers/AuthSlicer";
import { useDispatch } from "react-redux";
import { clearUserInfo } from "../../../store/Slicers/UserInfoSlicer";


const Authorized = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(clearUserInfo());
        dispatch(logoutUser());
        navigate("/login");
    };
    return (
        <Box
            sx={{
                flexGrow: 1,
                display: { xs: "none", lg: "flex" },
                justifyContent: "end",
                alignItems: "center",
            }}
        >
            <div style={{ textAlign: "right" }}>
                <CustomText
                    style={{
                        color: colors.colorBlack,
                        marginBottom: 0,
                    }}
                >
                    {localStorage.getItem("userLogin")}
                </CustomText>

                <button
                    onClick={handleLogout}
                    style={{
                        fontFamily: "Inter",
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                    }}
                >
                    Выйти
                </button>
            </div>
            <Avatar />
        </Box>
    );
};

export { Authorized };
