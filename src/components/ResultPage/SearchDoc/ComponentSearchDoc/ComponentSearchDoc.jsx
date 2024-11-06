import React from "react";
import CustomImage from "../../../CustomComponents/CustomImage";
import CustomText from "../../../CustomComponents/CustomText";
import { CustomButton } from "../../../CustomComponents/CustomButton";
import { colors } from "../../../../assets/colors";
import "./ComponentSearchDoc.css";
import HTMLReactParser from "html-react-parser";

const ComponentSearchDoc = (props) => {
	const returnText = (text) => {
		let elements = [];

		// Заменяем специальные символы и теги
		let markup = text
			.replaceAll("&lt;", "<")
			.replaceAll("&gt;", ">")
			.replaceAll("<scandoc>", `<div>`)
			.replaceAll("</scandoc>", "</div>")
			.replaceAll("<p>", "<span>")
			.replaceAll("</p>", "</span>")
			.replaceAll("<sentence>", "<p>")
			.replaceAll("</sentence>", "</p>")
			.replaceAll("<entity", "<span")
			.replaceAll("</entity>", "</span>")
			.replaceAll("<speech", "<span")
			.replaceAll("</speech>", "</span>")
			.replaceAll("<vue", "<span")
			.replaceAll("</vue>", "</span>")
			.replaceAll("<br>", "");

		// Обрабатываем <figure> теги
		const figureRegex = /<figure>(.*?)<\/figure>/g;
		let match;
		while ((match = figureRegex.exec(markup)) !== null) {
			const urlMatch = match[1].match(/data-image-src="([^"]+)"/);
			if (urlMatch) {
				// Добавляем CustomImage в массив элементов
				elements.push(
					<CustomImage key={urlMatch[1]} source={urlMatch[1]} className="news-image" />
				);
			}
			// Удаляем <figure> из строки
			markup = markup.replace(match[0], "");
		}

		// Удаляем пустые <span> и <p> теги
		markup = markup.replace(/<span><\/span>/g, "").replace(/<p><\/p>/g, "");

		// Ограничиваем длину текста
		if (markup.length > 1800) {
			markup = markup.substring(0, markup.lastIndexOf("</p>", 1700) + "</p>".length) + "...";
		}

		// Добавляем оставшийся текст как элементы
		elements.push(HTMLReactParser(markup, "text/xml"));

		return elements;
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const year = date.getFullYear();
		return `${day}.${month}.${year}`;
	};

	return (
		<div className="card-news">
			<div className="data-source">
				<CustomText className="text-data" style={{ color: colors.colorLabelCheckbox }}>
					{formatDate(props.textDate)}
				</CustomText>
				<a target="_blank" rel="noopener noreferrer" href={props.url}>
					<CustomText className="text-source" style={{ color: colors.colorLabelCheckbox }}>
						{props.textSource}
					</CustomText>
				</a>
			</div>
			<CustomText className="name-news" style={{ color: colors.colorBlack }}>
				{props.textHeader}
			</CustomText>
			<CustomText className="type">
				<span className="type-span" style={{ background: colors.colorTypeNews }}>{props.textType}</span>
			</CustomText>

			{props.image && (<CustomImage source={props.image} className="news-image" />)}

			<CustomText className="text-news" style={{ color: colors.colorLabelCheckbox }}>
				{returnText(props.text)}
			</CustomText>
			<div className="card-footer">
				<CustomButton variant="lightblue" className="card-footer-btn">
					<a className="btn-a" target="_blank" rel="noopener noreferrer" href={props.url}>Читать в источнике</a>
				</CustomButton>
				<CustomText className="num-word" style={{ color: colors.colorLabelCheckbox }}>
					{props.textNumWord}
				</CustomText>
			</div>
		</div>
	);
}

export default ComponentSearchDoc;