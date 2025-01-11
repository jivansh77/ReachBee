import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Documents from './pages/Documents'
import Results from './pages/results'
import Pricing from './pages/pricing'
import StudyTools from './pages/studytools'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Contact from './pages/Contact'
import About from './pages/About'

const AppContent = () => {
  const location = useLocation();
  const showSidebar = ['/documents', '/results', '/Memory'].includes(location.pathname);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {!showSidebar && <Navbar />}
      
      <div className="flex flex-1">
        {showSidebar && <Sidebar />}
        
        <main className={`${showSidebar ? 'flex-1' : 'w-full'} overflow-y-auto`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/results" element={<Results />} />
            <Route path="/Memory" element={<StudyTools />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
      {!showSidebar && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}