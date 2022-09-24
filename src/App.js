import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Playlist from "./pages/Playlist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/playlist" element={<Playlist />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
