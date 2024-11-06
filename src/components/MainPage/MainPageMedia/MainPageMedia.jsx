import React from 'react'
import CustomImage from '../../CustomComponents/CustomImage';
import mainImage from '../../../assets/images/main-page-image.svg';
import {useTheme, useMediaQuery } from "@mui/material";

function MainPageMedia() {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("md"));
	return (
		<div style={{width: "100%", overflow: "hidden"}}>
			<CustomImage img source={mainImage} width={matches ? "225%" : "100%"} />
		</div>
	)
}

export default MainPageMedia