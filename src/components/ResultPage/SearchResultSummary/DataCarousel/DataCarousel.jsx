import * as React from "react";
import CustomText from "../../../CustomComponents/CustomText";
import { useTheme, useMediaQuery } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Carousel from "better-react-carousel";
import { colors } from "../../../../assets/colors";
import { useSelector } from "react-redux";

const DataCarousel = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const histograms = useSelector((state) => state.histograms);

    const breakpoints = [
        { breakpoint: 1920, rows: 1, cols: 8 },
        { breakpoint: 1440, rows: 1, cols: 6 },
        { breakpoint: 1300, rows: 1, cols: 4 },
        { breakpoint: 1200, rows: 1, cols: 3 },
        { breakpoint: 1160, rows: 1, cols: 2 },
        { breakpoint: 1150, rows: 1, cols: 1 },
        { breakpoint: 900, rows: 1, cols: 1 },
        { breakpoint: 355, rows: 1, cols: 1 },
    ];

    if (histograms.success && !histograms.histograms.data.length > 0) {
        return <h1>Документов нет</h1>;
    }

    return !histograms.loading ? (
        <Carousel
            hideArrow={true}
            responsiveLayout={breakpoints}
            scrollSnap={true}
            gap={0}
            mobileBreakpoint={375}
            loop
        >
            {histograms.histograms.data[0].data.map((value, idx) => (
                <Carousel.Item key={idx}>
                    {matches ? (
                        <div style={{
                                marginRight: 0,
                                paddingRight: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-around",
                                columnGap: "40px",
                                rowGap: "10px",
                                height: "65px",
                                flexDirection: "row",
                            }}>
                            <CustomText>
                                {new Date(value.date).toLocaleDateString()}
                            </CustomText>
                            <CustomText style={{ margin: "0" }}>
                                {value.value}
                            </CustomText>
                            <CustomText>
                                {histograms.histograms.data[1].data[idx].value}
                            </CustomText>
                        </div>
                    ) : (
                        <div style={{ borderRight: `2px solid ${colors.colorGray}` }}>
                            <CustomText>
                                {new Date(value.date).toLocaleDateString()}
                            </CustomText>
                            <CustomText style={{ margin: "26px 0" }}>
                                {value.value}
                            </CustomText>
                            <CustomText>
                                {histograms.histograms.data[1].data[idx].value}
                            </CustomText>
                        </div>
                    )}
                </Carousel.Item>
            ))}
        </Carousel>
    ) : (
        <CircularProgress />
    );
};

export { DataCarousel };