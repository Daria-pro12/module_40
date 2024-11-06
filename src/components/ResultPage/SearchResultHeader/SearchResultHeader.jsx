import React from 'react'
import CustomImage from "../../CustomComponents/CustomImage";
import CustomText from "../../CustomComponents/CustomText";
import CustomTitle from "../../CustomComponents/CustomTitle";
import { useTheme, useMediaQuery } from "@mui/material";
import './SearchResultHeader.css'

import searchResultImage from "../../../assets/images/search-result.svg";

const SearchResultHeader = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const imageResponsive = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <div className="result-header" style={{ flexDirection: matches ? "column" : "row" }}>
            <div className='title'>
                <CustomTitle variant="h1" matches={matches} className="result-header-title">
                    Ищем. Скоро <br />будут результаты
                </CustomTitle>

                <CustomText 
                style={{ fontSize: matches ? "18px" : "20px" }} className="text">
                    Поиск может занять некоторое время, <br /> просим сохранять терпение.
                </CustomText>

            </div>
            <div>
                <CustomImage source={searchResultImage} width={imageResponsive ? "98%" : ""} />
            </div>
        </div>


    );
};

export default SearchResultHeader;