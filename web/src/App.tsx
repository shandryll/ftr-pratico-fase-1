import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from "./pages/Home";
import { LinkNotFound } from "./pages/LinkNotFound";
import { LinkRedirect } from "./pages/LinkRedirect";

export function App() {
  return (
    <Router>
      <main className="max-w-7xl mx-auto px-28 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/r/:shortened" element={<LinkRedirect />} />
          <Route path="*" element={<LinkNotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
