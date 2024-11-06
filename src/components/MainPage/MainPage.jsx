import React from "react";
import { CustomContainer } from "../CustomComponents/CustomContainer";
import OurАdvantages from "./OurАdvantages/OurАdvantages";
import MainPageMedia from "./MainPageMedia/MainPageMedia";
import OurTariffs from "./OurTariffs/OurTariffs";
import FirstScreen from "./FirstScreen/FirstScreen";
import './MainPage.css';

const MainPage = () => {
	return (
		<main>
			< CustomContainer >
				<section className="first-screen"><FirstScreen /></section>
				<section className="our-advantages"><OurАdvantages /></section>
				<section className="main-page-media"><MainPageMedia /></section>
				<section className="our-tariffs"><OurTariffs /></section >
			</CustomContainer >
		</main>
	);
};

export { MainPage };

