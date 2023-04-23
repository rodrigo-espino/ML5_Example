import {Routes, Route } from 'react-router-dom';

import { ML5 } from './Pages/ML5';
import { TM } from './Pages/TM';
import { Navbar } from './Components/Navbar';
function App() {
  return (
    <>
    <Navbar/>
    <div className="container p-4">
    <Routes>
      <Route path="/" element={<ML5 />} />
      <Route path="/tm" element={<TM />} />
    </Routes>

    </div>
    </>
  );
}

export default App;
