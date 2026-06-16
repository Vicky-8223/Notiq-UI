import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Overview    from "./pages/Overview";
import Docs        from "./pages/Docs";
import Playground  from "./pages/Playground";   // ← add this

export default function App() {
  return (
    <BrowserRouter>
      <div className="h-screen bg-white text-[#202124] flex flex-col overflow-hidden">
        <Topbar />
        <div className="flex flex-1 overflow-hidden h-full">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/"           element={<Overview />} />
              <Route path="/docs"       element={<Docs />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="*"           element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}