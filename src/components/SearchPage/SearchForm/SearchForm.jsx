import React, { useEffect, useState } from "react";
import "./SearchForm.css";
import { CustomButton } from "../../CustomComponents/CustomButton";
import { CustomCard } from "../../CustomComponents/CustomCard";
import { HistogramsSearch } from "./HistogramsSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Histograms } from "../../../store/Slicers/HistogramsSlicer";
import { requestBody } from "../../../store/Slicers/HistogramsSlicer";
import { loadMore } from "../../../store/Slicers/DocumentsSlicer";
import { useMediaQuery, useTheme } from "@mui/material";
import { colors } from "../../../assets/colors";

const SearchForm = () => {
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem("accessToken");

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("lg"));

    const navigate = useNavigate();
    const histograms = useSelector((state) => state.histograms);

    // Состояния для валидации формы
    const [isFormValid, setIsFormValid] = useState(false);

    //useStates для валидации полей
    //ИНН
    const [innError, setInnError] = useState(""); // состояние для ошибки ИНН
    const [isInnValid, setIsInnValid] = useState(false); // состояние для валидации ИНН
    const [isInnTouched, setIsInnTouched] = useState(false);

    //Количество документов в выдаче
    const [countError, setCountError] = useState(""); // состояние для ошибки "Количество документов"
    const [isCountValid, setIsCountValid] = useState(false); // состояние для валидации "Количество документов"
    const [isCountTouched, setIsCountTouched] = useState(false);

    //Диапазон поиска
    const [dateRangeError, setDateRangeError] = useState(""); // состояние для ошибки "Диапазон поиска"
    const [isDateRangeValid, setIsDateRangeValid] = useState(false); // состояние для валидации диапазона
    const [isDateRangeTouched, setIsDateRangeTouched] = useState(false);

    // Состояние для чекбоксов
    const [checkboxStates, setCheckboxStates] = useState({
        maxCompleteness: false,
        businessContent: false,
        publicationMain: false,
        publicationRisk: false,
        technicalNews: false,
        announcementsCalendars: false,
        newsBulletins: false,
    });

    // Тексты для чекбоксов
    const checkboxLabels = {
        maxCompleteness: "Признак максимальной полноты",
        businessContent: "Упоминания в бизнес-контексте",
        publicationMain: "Главная роль в публикации",
        publicationRisk: "Публикации только с риск-факторами",
        technicalNews: "Включать технические новости рынков",
        announcementsCalendars: "Включать анонсы и календари",
        newsBulletins: "Включать сводки новостей",
    };

    useEffect(() => {
        // Проверка валидности формы
        setIsFormValid(isInnValid && isCountValid && isDateRangeValid);
    }, [isInnValid, isCountValid, isDateRangeValid]);

    useEffect(() => {
        if (histograms.success && histograms.histograms.data) {
            if (histograms.histograms.data.length === 0) {
                setError("ИНН компании не найден");
            } else if (histograms.histograms.data.length > 0) {
                setError("");
                navigate("/result");
            }
        }
    }, [histograms, navigate]);

    const checkFormAndRequest = (e) => {
        e.preventDefault();
        const inn = document.querySelector("#inn").value.replace(/\s/g, "");;
        validateInn(inn); // Валидация поля "ИНН"

        const tonality = document.querySelector("#tonality").value;

        const count = document.querySelector("#count").value;
        validateCount(count); // Валидация поля "Количество документов"

        const startDate = document.querySelector("#startDate").value;
        const endDate = document.querySelector("#endDate").value;
        validateDateRange(startDate, endDate); // Валидация диапазона дат

        const body = () => {
            dispatch(
                requestBody(
                    HistogramsSearch(
                        inn,
                        tonality,
                        count,
                        startDate,
                        endDate
                    )
                )
            );
            dispatch(loadMore(count));
            return HistogramsSearch(
                inn,
                tonality,
                count,
                startDate,
                endDate
            );
        };

        if (isInnValid && isCountValid && isDateRangeValid) {
            dispatch(
                Histograms({
                    accessToken: accessToken,
                    body: body(),
                })
            );
        }
    };

    //пробелы в поле ИНН
    const [inn, setInn] = useState("");

    const formatInn = (value) => {
        // Убираем все пробелы
        value = value.replace(/\s/g, "");

        if (value.length > 2) {
            value = value.slice(0, 2) + " " + value.slice(2);
        }
        if (value.length > 6) {
            value = value.slice(0, 6) + " " + value.slice(6);
        }
        if (value.length > 10) {
            value = value.slice(0, 10) + " " + value.slice(10);
        }
        return value;
    };

    //проверка ИНН
    const validateInn = (inn) => {
        const innWithoutSpaces = inn.replace(/\s/g, ""); // Удаляем все пробелы
        if (innWithoutSpaces === "") {
            setInnError("Обязательное поле");
            setIsInnValid(false);
        } else if (!/^\d+$/.test(innWithoutSpaces) || innWithoutSpaces.length < 10 || innWithoutSpaces.length > 13) {
            setInnError("Введите корректные данные");
            setIsInnValid(false);
        } else {
            setInnError("");
            setIsInnValid(true);
        }
    };

    const handleInnChange = (e) => {
        const formattedInn = formatInn(e.target.value);
        setInn(formattedInn);
        validateInn(formattedInn);
        setIsInnTouched(true);
    };

    //проверка Количество документов в выдаче
    const validateCount = (count) => {
        if (count.trim() === "") {
            setCountError("Обязательное поле");
            setIsCountValid(false);
        } else if (count < 1 || count > 999) {
            setCountError("Введите корректные данные");
            setIsCountValid(false);
        } else {
            setCountError("");
            setIsCountValid(true);
        }
    };

    const handleCountChange = (e) => {
        const countValue = e.target.value;
        validateCount(countValue);
        setIsCountTouched(true);
    };

    //проверка Диапазон поиска
    const validateDateRange = (startDate, endDate) => {
        const currentDate = new Date(); // Получаем текущую дату
        const start = Date.parse(startDate);
        const end = Date.parse(endDate);
        if (!startDate || !endDate) {
            setDateRangeError("Обязательные поля");
            setIsDateRangeValid(false);
        } else if (start > end) {
            setDateRangeError("Введите корректные данные");
            setIsDateRangeValid(false);
        } else if (start > currentDate || end > currentDate) {
            setDateRangeError("Введите корректные данные");
            setIsDateRangeValid(false);
        } else {
            setDateRangeError("");
            setIsDateRangeValid(true);
        }
    };

    const handleDateChange = () => {
        const startDate = document.querySelector("#startDate").value;
        const endDate = document.querySelector("#endDate").value;
        validateDateRange(startDate, endDate);
        setIsDateRangeTouched(true);
    };

    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        setCheckboxStates((prev) => ({
            ...prev,
            [id]: checked,
        }));
    };

    return (
        <CustomCard className="card-search-form">
            <form className="search-form" >
                <div style={{ textAlign: "left", flex: matches ? "1" : "0.8", gap: "30px", display: "flex", flexDirection: "column" }}>
                    <div>
                        <label htmlFor="inn" className="search-form-label">
                            ИНН компании<span style={{ color: isInnTouched && !isInnValid ? colors.colorError : colors.colorBlack }}>*</span>
                        </label>
                        <input className="search-form-input"
                            style={{ borderColor: isInnTouched && !isInnValid ? colors.colorError : colors.colorInput, color: isInnTouched && !isInnValid ? colors.colorError : undefined }}
                            type="text"
                            id="inn"
                            value={inn}
                            onChange={handleInnChange}
                            placeholder="10 цифр"
                            maxLength={13} />
                        {!isInnValid && <p className="error-data" style={{ color: colors.colorError }}>{innError}</p>} {/* Сообщение об ошибке */}
                    </div>
                    <div>
                        <label htmlFor="tonality" className="search-form-label">
                            Тональность
                        </label>
                        <select className="search-form-input"
                            id="tonality"
                            style={{ borderColor: colors.colorInput }}>
                            <option value="any">Любая</option>
                            <option value="positive">Позитивная</option>
                            <option value="negative">Негативная</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="count" className="search-form-label">
                            Количество документов в выдаче<span style={{ color: isCountTouched && !isCountValid ? colors.colorError : colors.colorBlack }}>*</span>
                        </label>
                        <input className="search-form-input"
                            style={{ borderColor: isCountTouched && !isCountValid ? colors.colorError : colors.colorInput, color: isCountTouched && !isCountValid ? colors.colorError : undefined }}
                            type="number"
                            id="count"
                            placeholder="от 1 до 1000"
                            min="1" max="999"
                            maxLength="10"
                            required="required"
                            onChange={handleCountChange} />
                        {!isCountValid && <p className="error-data" style={{ color: colors.colorError }}>{countError}</p>} {/* Сообщение об ошибке */}
                    </div>
                    <div>
                        <label className="search-form-label">
                            Диапазон поиска<span style={{ color: isDateRangeTouched && !isDateRangeValid ? colors.colorError : colors.colorBlack }}>*</span>
                            <div className="search-range">
                                <input className="search-form-input range-input"
                                    style={{
                                        borderColor: isDateRangeTouched && !isDateRangeValid ? colors.colorError : colors.colorInput,
                                        color: isDateRangeTouched && !isDateRangeValid ? colors.colorError : undefined
                                    }}
                                    type="date"
                                    id="startDate"
                                    required="required"
                                    onChange={handleDateChange} />
                                <input className="search-form-input range-input"
                                    style={{
                                        borderColor: isDateRangeTouched && !isDateRangeValid ? colors.colorError : colors.colorInput,
                                        color: isDateRangeTouched && !isDateRangeValid ? colors.colorError : undefined
                                    }}
                                    type="date"
                                    id="endDate"
                                    required="required"
                                    onChange={handleDateChange} />
                            </div>
                            {!isDateRangeValid && (<p className="error-data error-data-range" style={{ color: colors.colorError }}>{dateRangeError}</p>)}
                        </label>
                    </div>
                    <div className="btn-mob">
                        <CustomButton style={{ width: "100%" }} variant="blue" id="submit" onClick={checkFormAndRequest} disabled={!isFormValid} >
                            Поиск
                        </CustomButton>
                        <p className="necessarily">*Обязательные к заполнению поля</p>
                        <span id="error" style={{ position: "absolute", left: 0, bottom: 0, fontSize: "14px", color: colors.colorError }}>
                            {error}
                        </span>
                    </div>
                </div>
                <div className="additional-conditions">
                    {Object.keys(checkboxStates).map((key) => (
                        <div className="conditions-checkbox" key={key}>
                            <input className="conditions-checkbox-input"
                                type="checkbox"
                                id={key}
                                checked={checkboxStates[key]}
                                onChange={handleCheckboxChange} />
                            <label className="conditions-checkbox-label" htmlFor={key}
                                style={{ color: checkboxStates[key] ? colors.colorBlack : colors.colorLabelCheckbox }}>
                                {checkboxLabels[key]}
                            </label>
                        </div>
                    ))}
                    <div className="btn">
                        <CustomButton variant="blue" id="submit" onClick={checkFormAndRequest} disabled={!isFormValid}>
                            Поиск
                        </CustomButton>
                        <p className="necessarily">*Обязательные к заполнению поля</p>
                    </div>
                </div>
            </form>
        </CustomCard>
    );
};

export default SearchForm;