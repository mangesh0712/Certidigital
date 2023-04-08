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
import Studentview from './Pages/StudentView';
import CSVDemo from "./Demo/CSVDemo";
import BulkCertificates from './Pages/BulkCertificates';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/confirmAccount" element={<ConfirmAccount />} />
        <Route path="/confirmSuccess/:id" element={<ConfirmSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/csvTojson/:id" element={<Csvtojson />} />
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
        <Route path="/uploadtemplate" element={<SampleTemplate />} />
        <Route path="/userview" element={<Studentview />} />
        <Route path="templates" element={<Alltemplate />} />
        <Route path="/uploadtemplate/:id" element={<SampleCertificate />} />
        <Route path="/bulkCertificates/:id" element={<BulkCertificates />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/democsv" element={<CSVDemo />} />
      </Routes>
    </div>
  );
}

export default App;
