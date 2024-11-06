import React from "react";
import { CustomContainer } from "../CustomComponents/CustomContainer";
import AuthForm from "./AuthForm/AuthForm";
import "./AuthPage.css";
import { useTheme, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import CustomTitle from "../CustomComponents/CustomTitle";
import CustomImage from "../CustomComponents/CustomImage";
import image from '../../assets/images/auth-big-image.svg';

function AuthPage() {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("md"));
	const is_Auth = useSelector((state) => state.userInfo.is_Auth);

	if (is_Auth) {
		return <Navigate to="/" />;
	}

	const renderTitle = () => (
		<CustomTitle
			variant="h1"
			matches={matches} className="auth-title"
			style={{
				fontSize: matches ? "28px" : "40px",
				lineHeight: matches ? "33px" : "48px",
				marginTop: matches ? "30px" : "60px",
				marginBottom: matches ? "115px" : undefined}}>
			Для оформления подписки <br /> на тариф, необходимо <br /> авторизоваться.
		</CustomTitle>
	);

	return (
		<main>
			<CustomContainer style={{ display: "flex", flexDirection: matches ? "column" : "row" }}>
				{matches ? (
					<>
						{renderTitle()}
						<AuthForm />
						<CustomImage img source={image} width="322px" height="342px" />
					</>
				) : (
					<div className="div-main">
						<div className="div-text">
							{renderTitle()}
							<CustomImage img source={image} width="322px" height="342px" />
						</div>
						<div className="div-form">
							<AuthForm />
						</div>
					</div>
				)}
			</CustomContainer>
		</main>
	);
}

export default AuthPage;