import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import SampleTemplate from "./Pages/SampleTemplate";
import Error404 from "./Pages/Error404";
import Csvtojson from './Pages/csvTojson/Csvtojson';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sampleTemplate" element={<SampleTemplate />} />
        <Route path="/csvTojson" element={<Csvtojson />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
