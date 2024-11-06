import "./App.css";

import { Header } from "./components/Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import { MainPage } from "./components/MainPage/MainPage";
import AuthPage from "./components/AuthPage/AuthPage";
import SearchPage from "./components/SearchPage/SearchPage";
import { ResultPage } from "./components/ResultPage/ResultPage";
import Footer from "./components/Footer/Footer";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route element={<ProtectedRoutes />}>
                    <Route path="/search/" element={<SearchPage />} />
                    <Route path="/result/" element={<ResultPage />} />
                </Route>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
