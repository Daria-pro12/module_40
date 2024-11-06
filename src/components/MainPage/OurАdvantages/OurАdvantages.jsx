import React from "react";
import { CustomCard } from "../../CustomComponents/CustomCard";
import rightArrow from "../../../assets/images/right-arrow.svg";
import leftArrow from "../../../assets/images/left-arrow.svg";
import AliceCarousel from "react-alice-carousel";
import time from "../../../assets/images/time.svg";
import search from "../../../assets/images/search.svg";
import protection from "../../../assets/images/protection.svg";
import "react-alice-carousel/lib/alice-carousel.css";
import CustomText from "../../CustomComponents/CustomText";
import CustomTitle from "../../CustomComponents/CustomTitle";
import { useTheme, useMediaQuery } from "@mui/material";

const advantagesData = [
  {
    imgSrc: time,
    altText: "clock",
    text: "Высокая и оперативная скорость обработки заявки",
  },
  {
    imgSrc: search,
    altText: "search",
    text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
  },
  {
    imgSrc: protection,
    altText: "protection",
    text: "Защита конфиденциальных сведений, не подлежащих разглашению по федеральному законодательству",
  },
];

const OurAdvantages = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const items = advantagesData.map(({ imgSrc, altText, text }, index) => (
    <CustomCard key={index} style={{ minHeight: "225px", margin: "10px 30px", textAlign: "left", padding: "30px 20px" }}>
      <img src={imgSrc} alt={altText} />
      <CustomText style={{ fontSize: "18px", marginTop: "20px" }}>
        {text}
      </CustomText>
    </CustomCard>
  ));

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3, itemsFit: "contain" },
  };

  const renderButton = (direction) => (
    <div
      style={{
        position: "absolute",
        [direction]: "-10px",
        top: "40%",
        cursor: "pointer",
      }}
    >
      <img src={direction === "left" ? leftArrow : rightArrow} alt={`${direction}Arrow`} />
    </div>
  );

  return (
    <div>
      <CustomTitle variant="h2" matches={matches}>
        Почему именно мы
      </CustomTitle>
      <AliceCarousel
        autoWidth={false}
        items={items}
        infinite
        responsive={responsive}
        disableDotsControls
        renderPrevButton={() => renderButton("left")}
        renderNextButton={() => renderButton("right")}
      />
    </div>
  );
};

export default OurAdvantages;