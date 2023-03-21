import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import SampleTemplate from './Pages/SampleTemplate';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sampleTemplate" element={<SampleTemplate />} />
      </Routes>
    </div>
  );
}

export default App;
