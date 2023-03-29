import Csvtojson from './Pages/csvTojson/Csvtojson';
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import ConfirmAccount from "./Pages/ConfirmAccount/index";
import ConfirmSuccess from "./Pages/ConfirmSuccess/index";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword/index";
import ForgotPasswordMailSent from "./Pages/ForgotPasswordMailSent/index";
import ResetPasswordSuccess from "./Pages/ResetPasswordSuccess/index";
import ResetPassword from "./Pages/ResetPassword/index";
import SampleTemplate from "./Pages/SampleTemplate";
import SampleCertificate from "./Pages/SampleCertificate";
import Error404 from "./Pages/Error404";
import Alltemplate from './Pages/Alltemplate';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signup />} />

        <Route path="/confirmAccount" element={<ConfirmAccount />} />
        <Route path="/confirmSuccess/:id" element={<ConfirmSuccess />} />
        <Route path="/login" element={<Login />}/> 
        <Route path="/csvTojson" element={<Csvtojson />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route
          path="/forgotPasswordMailSent"
          element={<ForgotPasswordMailSent />}
        />
        <Route path="/resetPassword/:id" element={<ResetPassword />} />

        <Route
          path="/resetPasswordSuccess"
          element={<ResetPasswordSuccess />}
        />
        <Route path="/sampleTemplate" element={<SampleTemplate />} />
        <Route path="/alltemplate" element={<Alltemplate />} />
        <Route path="/edit" element={<SampleCertificate />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
