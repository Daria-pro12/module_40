import * as React from "react";
import CustomText from "../../CustomComponents/CustomText";
import { Box } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { UserInfo } from "../../../store/Slicers/UserInfoSlicer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const InfoBlock = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));
    const dispatch = useDispatch();
    const data = useSelector((state) => state.userInfo);

    useEffect(() => {
        if (!data.is_Auth) {
            dispatch(UserInfo(localStorage.getItem("accessToken")));
        }
    }, [dispatch, data]);

    
    return (
        <Box
            sx={{
                flexGrow: 0,
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#d9d9d9",
                padding: matches ? "5px 2px" : "5px 14px",
                borderRadius: "5px",
                textAlign: matches ? "left" : "right",
                color: "rgba(0, 0, 0, 0.5)",
                width: matches ? "120px" : "180px", 
            }}
        >
            {data.loading || data.is_Auth === false ? (
                <div style={{ width: "120px", alignSelf: "center" }}>
                    <CircularProgress />
                </div>
            ) : (
                <>
                    <Box style={{ marginLeft: matches ? "7px" : "0" }}>
                        <CustomText
                            style={{
                                fontSize: matches ? "8px" : "10px",
                                marginRight: matches ? "0" : "10px",
                                display: matches ? "block" : "inline-block",
                            }}
                        >
                            Использовано компаний
                        </CustomText>

                        <CustomText
                            style={{
                                margin: "0",
                                fontSize: "14px",
                                fontWeight: 700,
                                display: matches ? "block" : "inline-block",
                            }}
                        >
                            {data.userInfo.eventFiltersInfo.usedCompanyCount}
                        </CustomText>
                    </Box>

                    <Box style={{ marginLeft: matches ? "7px" : "0" }}>
                        <CustomText
                            style={{
                                fontSize: matches ? "8px" : "10px",
                                marginRight: matches ? "0" : "10px",
                                display: matches ? "block" : "inline-block",
                            }}
                        >
                            Лимит по компаниям
                        </CustomText>

                        <CustomText
                            style={{
                                margin: "0",
                                fontSize: "14px",
                                fontWeight: 700,
                                color: "#8AC540",
                                display: matches ? "block" : "inline-block",
                            }}
                        >
                            {data.userInfo.eventFiltersInfo.companyLimit}
                        </CustomText>
                    </Box>
                </>
            )}
        </Box>
    );
};

export { InfoBlock };
