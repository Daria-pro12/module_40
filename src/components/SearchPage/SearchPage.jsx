import React from "react"
import SearchForm from "./SearchForm/SearchForm";
import { CustomContainer } from "../CustomComponents/CustomContainer";
import CustomTitle from "../CustomComponents/CustomTitle";
import CustomText from "../CustomComponents/CustomText";
import CustomImage from "../CustomComponents/CustomImage";
import document from "../../assets/images/document.svg";
import folders from "../../assets/images/folders.svg";
import rocketSearch from "../../assets/images/rocket-search.svg";
import { useTheme, useMediaQuery } from "@mui/material";
import "./SearchPage.css"

function SearchPage() {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("md"));
	const imageResponsive = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<main>
			<CustomContainer className="searh-conteiner">
				<div className="container-top">
					<div className="container-title">
						<CustomTitle variant="h1" matches={matches}	className="search-page-title">
							Найдите необходимые <br />
							данные в пару кликов.
						</CustomTitle>
						<CustomText className="search-page-text">
							Задайте параметры поиска.<br />Чем больше заполните, тем точнее поиск.
						</CustomText>
					</div>
					<div className="container-images">
						<div className="my-document"><CustomImage img source={document} width={imageResponsive ? "93%" : ""} /></div>
						<div className="my-folders"><CustomImage img source={folders} width="140px" height="70px" /></div>
					</div>
				</div>
				<div className="container-bottom">
					<SearchForm />
					<CustomImage img source={rocketSearch} width={imageResponsive ? "97%" : ""} />
				</div>
			</CustomContainer>
		</main>
	)
}

export default SearchPage;