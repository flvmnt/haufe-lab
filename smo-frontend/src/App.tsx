import { Outlet, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import QuestionDetail from './pages/QuestionDetail';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';

function AppLayout() {
    return (
        <>
            <Navbar />
            <main className="app">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

function App() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/q/:id" element={<QuestionDetail />} />
            </Route>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    );
}

export default App;
