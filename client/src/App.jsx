import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;