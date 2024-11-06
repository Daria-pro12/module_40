import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import headerLogo from "../../assets/images/header-logo.svg";
import burgerLogo from "../../assets/images/footer-logo.svg";
import close from "../../assets/images/close.svg";
import { colors } from "../../assets/colors";
import burgerIcon from "../../assets/images/burger-menu-icon.svg";
import { CustomButton } from "../CustomComponents/CustomButton";
import { CustomContainer } from "../CustomComponents/CustomContainer";
import CustomText from "../CustomComponents/CustomText";
import { InfoBlock } from "./InfoBlock/InfoBlock";
import { useNavigate } from "react-router-dom";
import { Authorized } from "./Authorized/Authorized";
import { Unauthorized } from "./Unauthorized/Unauthorized";
import { useDispatch, useSelector } from "react-redux";
import { clearUserInfo } from "../../store/Slicers/UserInfoSlicer";
import { logoutUser } from "../../store/Slicers/AuthSlicer";
import { clearDocuments } from "../../store/Slicers/DocumentsSlicer";
import { clearHistograms } from "../../store/Slicers/HistogramsSlicer";
import "./Header.css";

const navItems = [
    { text: "Главная", nav: "/" },
    { text: "Тарифы", nav: "" },
    { text: "FAQ", nav: "" },
];

const drawerWidth = "100%";

const Header = (props) => {
    const dispatch = useDispatch();
    const logged = useSelector((state) => state.login);
    const navigate = useNavigate();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleNavigation = (nav) => {
        navigate(nav);
        handleDrawerToggle();
        dispatch(clearDocuments());
        dispatch(clearHistograms());
    };

    const handleAuthAction = () => {
        if (logged.is_Auth || localStorage.getItem("accessToken")) {
            dispatch(clearUserInfo());
            dispatch(logoutUser());
        } else {
            navigate("/login");
        }
        handleDrawerToggle();
    };

    const drawer = (
        <Box>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0 20px" }}>
                <img src={burgerLogo} alt="Logo" style={{ width: "121px" }} />
                <img src={close} alt="close" onClick={handleDrawerToggle} style={{ cursor: "pointer" }} />
            </div>
            <Divider />
            <List>
                {navItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <Link to={item.nav} className="drawer-nav">
                            <ListItemText primary={<CustomText>{item.text}</CustomText>} />
                        </Link>
                    </ListItem>
                ))}
            </List>
            <div style={{ textAlign: "center", marginTop: "70px" }}>
                <CustomText style={{ marginBottom: "20px", fontSize: "14px", opacity: "0.4" }} onClick={() => handleNavigation("/login")}>
                    Зарегистрироваться
                </CustomText>
                <CustomButton
                    variant="blue"
                    style={{ backgroundColor: colors.colorLightBlue, color: colors.colorBlack }}
                    onClick={handleAuthAction}
                >
                    {logged.is_Auth || localStorage.getItem("accessToken") ? "Выйти" : "Войти"}
                </CustomButton>
            </div>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <CustomContainer>
            <AppBar
                sx={{
                    boxShadow: "none",
                    backgroundColor: "transparent",
                    display: "block",
                    position: "relative",
                    paddingTop: "5px"
                }}
            >
                <CssBaseline />
                <Toolbar sx={{ padding: { lg: "0 !important" } }}>
                    <Box sx={{ flexGrow: 2, textAlign: "left", width: { md: "120px" } }}>
                        <a href="/"><img src={headerLogo} alt="headerLogo" /></a>
                    </Box>
                    <nav className="nav-desktop">
                        {navItems.map((item, index) => (
                           <Link to={item.nav} key={index} className="nav-desktop-item">
                               {item.text}
                        </Link>
                        ))}
                    </nav>
                    {logged.is_Auth || localStorage.getItem("accessToken") ? (
                        <>
                            <InfoBlock />
                            <Authorized />
                        </>
                    ) : (
                        <Unauthorized />
                    )}
                    <Box sx={{ flexGrow: 2, display: { lg: "none" }, textAlign: "right" }}>
                        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}>
                            <img src={burgerIcon} alt="BurgerIcon" />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box component="nav">
                <Drawer
                    PaperProps={{
                        sx: {
                            color: colors.colorWhite,
                            backgroundColor: colors.colorAqua,
                        },
                    }}
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { md: "block", lg: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </CustomContainer>
    );
};

export { Header };