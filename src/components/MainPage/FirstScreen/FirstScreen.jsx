import React from "react";
import { CustomButton } from "../../CustomComponents/CustomButton";
import CustomTitle from "../../CustomComponents/CustomTitle";
import CustomText from "../../CustomComponents/CustomText";
import CustomImage from "../../CustomComponents/CustomImage";
import firstScreenImage from "../../../assets/images/first-screen-image.svg";
import { useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearDocuments } from "../../../store/Slicers/DocumentsSlicer";
import { clearHistograms } from "../../../store/Slicers/HistogramsSlicer";

const FirstScreen = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const is_Auth = useSelector((state) => state.userInfo.is_Auth);
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    navigate("/search/");
    dispatch(clearDocuments());
    dispatch(clearHistograms());
  };

  return (
    <div style={{ display: "flex", flexDirection: matches ? "column" : "row" }}>
      <div className="left-part">
        <div className="left-text">
          <CustomTitle variant="h1" matches={matches}>
            Сервис по поиску публикаций <br /> о компании <br /> по его ИНН
          </CustomTitle>
          <CustomText
            style={{
              textAlign: "left",
              fontSize: matches ? "18px" : "20px",
              lineHeight: matches ? "21px" : "24px",
            }}
          >
            Комплексный анализ публикаций, получение данных <br /> в формате PDF на электронную почту.
          </CustomText>
        </div>
        {is_Auth && (
          <div style={{ textAlign: matches ? "center" : "left", marginTop: matches ? "30px" : "70px" }}>
            <CustomButton variant="blue" onClick={handleButtonClick}>
              Запросить данные
            </CustomButton>
          </div>
        )}
      </div>
      <div className="image">
        <CustomImage source={firstScreenImage} width="100%" height="100%" />
      </div>
    </div>
  );
};

export default FirstScreen;