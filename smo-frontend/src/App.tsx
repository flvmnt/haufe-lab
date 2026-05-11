import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';

function HomeLayout() {
    return (
        <>
            <Navbar />
            <main className="app">
                <Home />
            </main>
        </>
    );
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomeLayout />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    );
}

export default App;
