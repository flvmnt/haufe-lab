import { Link } from 'react-router-dom';

function SignIn() {
    return (
        <main className="auth">
            <div className="auth-card">
                <Link to="/" className="wordmark auth-logo">
                    stack-my-overflow
                </Link>
                <h1 className="auth-title">Sign in</h1>
                <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                    <label className="auth-label">
                        Email
                        <input type="email" name="email" autoComplete="email" required />
                    </label>
                    <label className="auth-label">
                        Password
                        <input
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            required
                        />
                    </label>
                    <button type="submit" className="btn btn-primary auth-submit">
                        Sign in
                    </button>
                </form>
                <p className="auth-foot">
                    Don&apos;t have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </main>
    );
}

export default SignIn;
