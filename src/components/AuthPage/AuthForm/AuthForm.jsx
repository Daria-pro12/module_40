import React, { useEffect, useState, useRef } from "react";
import "./AuthForm.css";
import google from "../../../assets/images/google.svg";
import facebook from "../../../assets/images/facebook.svg";
import yandex from "../../../assets/images/yandex.svg";
import lock from "../../../assets/images/auth-lock.svg";
import { CustomButton } from "../../CustomComponents/CustomButton";
import CustomText from "../../CustomComponents/CustomText";
import { CustomCard } from "../../CustomComponents/CustomCard";
import CustomImage from "../../CustomComponents/CustomImage";
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "../../../store/Slicers/AuthSlicer";
import { useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { colors } from "../../../assets/colors";

const AuthForm = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    
    const [errors, setErrors] = useState({ login: "", password: "", general: "" });
    const [isFormValid, setIsFormValid] = useState(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector((state) => state.login);
    
    const loginRef = useRef(null);
    const passwordRef = useRef(null);

    useEffect(() => {
        if (data.is_Auth) {
            navigate("/");
        }
    }, [navigate, data.is_Auth]);

    const validateInput = (input, type) => {
        const phoneRegex = /^\+?[0-9 ]{11,}$/;
        const loginRegex = /^[a-zA-Zа-яА-Я0-9_]{3,}$/;

        if (!input) {
            return "Обязательное поле";
        }
        if (type === "login") {
            if (/^\+?[\d ]+$/.test(input) && !phoneRegex.test(input)) {
                return "Введите корректные данные";
            }
            if (input.length < 3 || !loginRegex.test(input)) {
                return "Введите корректные данные";
            }
        }
        return "";
    };

    const handleInputChange = () => {
        const loginInput = loginRef.current.value;
        const passwordInput = passwordRef.current.value;

        setErrors({ login: "", password: "", general: "" });

        const loginError = validateInput(loginInput, "login");
        const passwordError = validateInput(passwordInput, "password");

        setErrors((prev) => ({
            ...prev,
            login: loginError,
            password: passwordError,
        }));

        setIsFormValid(!loginError && !passwordError);
    };

    const handleSubmit = () => {
        const loginInput = loginRef.current.value;
        const passwordInput = passwordRef.current.value;

        const loginError = validateInput(loginInput, "login");
        const passwordError = validateInput(passwordInput, "password");

        if (loginError || passwordError) {
            setErrors({ login: loginError, password: passwordError, general: "" });
            return;
        }

        dispatch(UserLogin({ login: loginInput, password: passwordInput }));

        if (data.error) {
            setErrors((prev) => ({ ...prev, general: "Неправильный логин или пароль" }));
        }
    };

    return (
        <CustomCard className="card-form">
            <div style={{ position: "absolute", left: matches ? "100px" : "-50px", top: matches ? "-80px" : "-70px" }}>
                <CustomImage source={lock} width="75px" height="92px" />
            </div>
            <form className="auth-form">
                <div className="btn-group">
                    <CustomButton className="btn" variant="blue" style={{ color: colors.colorAqua, borderBottom: `2px solid ${colors.colorAqua}` }}>
                        Войти
                    </CustomButton>
                    <CustomButton className="btn register_btn" variant="blue">
                        Зарегистрироваться
                    </CustomButton>
                </div>

                <label htmlFor="login_input" className="form-label form-label-login">
                    Логин или номер телефона:
                </label>
                <input
                    ref={loginRef}
                    onChange={handleInputChange}
                    id="login_input"
                    type="text"
                    className="form-input"
                    style={{
                        borderColor: (errors.login || errors.general) ? colors.colorError : colors.colorInput,
                        color: (errors.login || errors.general) ? colors.colorError : undefined
                    }}
                    required
                />
                {errors.login && <p className="error-data" style={{ color: colors.colorError }}>{errors.login}</p>}

                <label htmlFor="password_input" className="form-label form-label-password">
                    Пароль:
                </label>
                <input
                    ref={passwordRef}
                    onChange={handleInputChange}
                    id="password_input"
                    type="password"
                    className="form-input"
                    style={{
                        borderColor: (errors.password || errors.general) ? colors.colorError : colors.colorInput,
                        color: (errors.password || errors.general) ? colors.colorError : undefined
                    }}
                    required
                />
                {errors.password && <p className="error-data" style={{ color: colors.colorError }}>{errors.password}</p>}
                {errors.general && <p className="error-data" style={{ color: colors.colorError }}>{errors.general}</p>}

                <CustomButton
                    onClick={handleSubmit}
                    variant="blue"
                    style={{ marginTop: "30px" }}
                    disabled={!isFormValid}
                >
                    {data.loading ? <CircularProgress sx={{ color: "#ffffff" }} /> : "Войти"}
                </CustomButton>

                <br />
                <a href=" " className="recover-password">Восстановить пароль</a>
                <CustomText className="log-in">
                    Войти через:
                </CustomText>
                <div className="btn-log">
                    <button className="btn-log-in">
                        <img src={google} alt="auth-google" />
                    </button>
                    <button className="btn-log-in">
                        <img src={facebook} alt="auth-facebook" />
                    </button>
                    <button className="btn-log-in">
                        <img src={yandex} alt="auth-yandex" />
                    </button>
                </div>
            </form>
        </CustomCard>
    );
};

export default AuthForm;