import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LoginPage} from "./components/LoginPage";
import Home from "./components/Home";
import {Registration} from "./components/Register";
import MoreDetailComponent from "./components/MoreDetail";
import {BookingPage} from "./components/BookingPage";
import CustomSwitcher from "./testing/CustomSwitcher";
import PrivateRoutes from "./components/PrivateRoutes";
import {AddRoom} from "./components/AddRoom";

function App() {
    // const {t} = useTranslation();
    return (
        <div className="App">
            <BrowserRouter>
                {/*<LanguageSwitcher/>*/}
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/signup" element={<Registration/>}/>
                    <Route path="/room-detail/:roomId" element={<MoreDetailComponent/>}/>
                    <Route path="/booking/:roomId" element={<BookingPage/>}/>
                    <Route path="/user" element={<PrivateRoutes/>}>
                        <Route path="settings" element={<CustomSwitcher/>}/>
                        <Route path="add-room" element={<AddRoom/>}/>
                    </Route>

                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
