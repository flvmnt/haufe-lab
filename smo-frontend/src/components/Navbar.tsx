import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Navbar() {
    const { user } = useAuth();

    const handleAsk = () => {
        alert('Open new question form');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="wordmark">
                stack-my-overflow
            </Link>
            <div className="navbar-actions">
                {user ? (
                    <>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleAsk}
                        >
                            Ask question
                        </button>
                        <span className="navbar-handle">@{user.username}</span>
                    </>
                ) : (
                    <>
                        <Link to="/signin" className="btn btn-ghost">
                            Sign in
                        </Link>
                        <Link to="/signup" className="btn btn-primary">
                            Sign up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
