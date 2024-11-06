import React from "react";
import CustomImage from "../../../CustomComponents/CustomImage";
import CustomText from "../../../CustomComponents/CustomText";
import { CustomButton } from "../../../CustomComponents/CustomButton";
import { CustomCard } from "../../../CustomComponents/CustomCard";
import "./ComponentOurTariffs.css";
import { colors } from "../../../../assets/colors";
import yes from "../../../../assets/images/yes.svg";
import { useTheme, useMediaQuery } from "@mui/material";

const ComponentOurTariffs = (props) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    // Создаем массив для элементов списка
    const items = [props.list1, props.list2, props.list3];

    return (
        <CustomCard className="tarif-card" style={{ border: props.border + props.color }}>
            <div className="card-header" style={{ backgroundColor: props.color }}>
                <div className="tarif-header">
                    <CustomText className="tarif-name" style={{ color: props.colorText }}>
                        {props.header}
                    </CustomText>
                    <CustomText className="tarif-name-description" style={{ color: props.colorText }}>
                        {props.text}
                    </CustomText>
                </div>
                <div className="tarif-img">
                    <CustomImage width={matches ? "60%" : "auto"} source={props.source} />
                </div>
            </div>
            <div>
                <CustomText className="current-tarif" style={{ color: colors.colorWhite }}>
                    <span className="current-tarif-span" style={{
                        background: props.current ? colors.colorCurrentTariffs : colors.colorWhite
                    }}>
                        {props.current ? "Текущий тариф" : null}
                    </span>
                </CustomText>
            </div>
            <div>
                <div className="tarif-price">
                    <CustomText className="price-current">
                        {props.price}
                    </CustomText>
                    <CustomText className="price-old" style={{ color: colors.colorBlack }}>
                        {props.priceOld}
                    </CustomText>
                </div>
                <CustomText className="price-in">
                    {props.priceIn}
                </CustomText>
                <CustomText className="tariff-includes">
                    В тариф входит:
                </CustomText>
                <ul className="tariff-includes-list">
                    {items.map((item, index) => (
                        <li key={index} className="tariff-includes-item">
                            <CustomImage source={yes} />
                            <div className="item-text">{item}</div>
                        </li>
                    ))}
                </ul>
            </div>
            <CustomButton variant={props.current ? "grey" : "blue"} className="tarif-btn">
                {props.current ? "Перейти в личный кабинет" : "Подробнее"}
            </CustomButton>
        </CustomCard>
    );
};

export default ComponentOurTariffs;