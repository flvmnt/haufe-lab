import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="wordmark">
                stack-my-overflow
            </Link>
            <div className="navbar-actions">
                <Link to="/signin" className="btn btn-ghost">
                    Sign in
                </Link>
                <Link to="/signup" className="btn btn-primary">
                    Sign up
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
