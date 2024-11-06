import React from "react";
import ComponentOurTariffs from "./ComponentOurTariffs/ComponentOurTariffs";
import CustomTitle from "../../CustomComponents/CustomTitle";
import { colors } from "../../../assets/colors";
import beginner from "../../../assets/images/beginner.svg";
import pro from "../../../assets/images/pro.svg";
import business from "../../../assets/images/business.svg";
import { useTheme, useMediaQuery } from "@mui/material";
import { CustomCard } from "../../CustomComponents/CustomCard";
import { useSelector } from "react-redux"; 

const OurTariffs = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("lg"));

const currentTariff = useSelector((state) => state.tariff.current);
    console.log(currentTariff);
    
    return (
        <>
            <CustomTitle variant="h2" matches={matches}>
                Наши тарифы
            </CustomTitle>
            <CustomCard
                style={{
                    boxShadow: "none",
                    border: 0,
                    display: "flex",
                    flexWrap: 'wrap',
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: matches ? "column" : "row",
                    gap: "30px",
                    margin: "0"
                }}
            >
                <ComponentOurTariffs
                    header="Beginner"
                    text="Для небольшого исследования"
                    price="799 ₽"
                    priceOld="1200 ₽"
                    priceIn="или 150₽/мес. при рассрочке 24 мес."
                    color={colors.colorYellow}
                    colorText={colors.colorBlack}
                    buttonStyle="grey"
                    list1="Безлимитная история запросов"
                    list2="Безопасная сделка"
                    list3="Поддержка 24/7"
                    source={beginner}
                    border={currentTariff === "Beginner" ? "solid 2px" : "none"} 
                    current={currentTariff === "Beginner"}
                />
                <ComponentOurTariffs
                    header="Pro"
                    text="Для HR и фрилансеров"
                    price="1299 ₽"
                    priceOld="2600 ₽"
                    priceIn="или 279₽/мес. при рассрочке 24 мес."
                    color={colors.colorLightBlue}
                    colorText={colors.colorBlack}
                    buttonStyle="blue"
                    source={pro}
                    border={currentTariff === "Pro" ? "solid 2px" : "none"} 
                    current={currentTariff === "Pro"}
                    list1="Все пункты тарифа Beginner"
                    list2="Экспорт истории"
                    list3="Рекомендации по приоритетам"
                />
                <ComponentOurTariffs
                    header="Business"
                    text="Для корпоративных клиентов"
                    price="2379 ₽"
                    priceOld="3700 ₽"
                    priceIn="&nbsp;"
                    color={colors.colorBlack}
                    colorText={colors.colorWhite}
                    buttonStyle="blue"
                    source={business}
                    border={currentTariff === "Business" ? "solid 2px" : "none"}
                    current={currentTariff === "Business"}
                    list1="Все пункты тарифа Pro"
                    list2="Безлимитное количество запросов"
                    list3="Приоритетная поддержка"
                />
            </CustomCard>
        </>
    );
};

export default OurTariffs;
