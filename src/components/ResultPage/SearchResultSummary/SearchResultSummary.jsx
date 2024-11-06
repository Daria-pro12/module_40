import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import CustomTitle from "../../CustomComponents/CustomTitle";
import CustomText from "../../CustomComponents/CustomText";
import rightArrow from "../../../assets/images/right-arrow.svg";
import leftArrow from "../../../assets/images/left-arrow.svg";
import { CustomCard } from "../../CustomComponents/CustomCard";
import { colors } from "../../../assets/colors";
import { DataCarousel } from "./DataCarousel/DataCarousel";
import { CustomButton } from "../../CustomComponents/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { ObjectSearch } from "../../../store/Slicers/ObjectSearchSlicer";
import "./SearchResultSummary.css"

const SearchResultSummary = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const dispatch = useDispatch();
    const accessToken = localStorage.getItem("accessToken");

    let totalCount = 0;

    const totalDocs = useSelector((state) => state.histograms);
    const body = useSelector((state => state.histograms.requestbody));

    if (
        !totalDocs.loading &&
        totalDocs.success &&
        totalDocs.histograms.data.length > 0
    ) {
        totalDocs.histograms.data[0].data.map(
            (item) => (totalCount += Number(item.value))
        );
        dispatch(
            ObjectSearch({
                accessToken: accessToken,
                body: body,
            })
        );
    }
    const toLeft = () => {
        document.querySelector("span[type='prev']").click();
    };
    const toRight = () => {
        document.querySelector("span[type='next']").click();
    };

    return (
        <>
            <CustomTitle variant="h4" matches={matches} className="general-summary">
                ОБЩАЯ СВОДКА
            </CustomTitle>
            <CustomText className="total-count">
                Найдено {totalCount} вариантов
            </CustomText>
            <div className="card-div">
                <CustomButton
                    onClick={toLeft}
                    style={{marginLeft: "-20px"}}>
                    <img src={leftArrow} alt="LeftArrow" />
                </CustomButton>
                <CustomCard className="card-sum"
                    style={{border: "2px solid" + colors.colorAqua,
                       flexDirection: matches ? "column" : "row"}}>
                    <div className="table-head"
                        style={{
                            flexDirection: matches ? "row" : "column",
                            backgroundColor: colors.colorAqua,
                            padding: matches ? "17px 5px" : "17px 28px",
                            color: colors.colorWhite}}>
                        <CustomText className="table-head-item">
                            Период
                        </CustomText>
                        <CustomText className="table-head-item">
                            Всего
                        </CustomText>
                        <CustomText className="table-head-item">
                            Риски
                        </CustomText>
                    </div>
                    <div style={{flexGrow: 1, marginTop: matches ? 0 : "20px"}}>
                        <DataCarousel />
                    </div>
                </CustomCard>
                <CustomButton
                    onClick={toRight}>
                    <img src={rightArrow} alt="RightArrow" />
                </CustomButton>
            </div>
        </>
    );
};

export { SearchResultSummary };
