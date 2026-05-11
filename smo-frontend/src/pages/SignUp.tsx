import { Link } from 'react-router-dom';

function SignUp() {
    return (
        <main className="auth">
            <div className="auth-card">
                <Link to="/" className="wordmark auth-logo">
                    stack-my-overflow
                </Link>
                <h1 className="auth-title">Create your account</h1>
                <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                    <label className="auth-label">
                        Username
                        <input
                            type="text"
                            name="username"
                            autoComplete="username"
                            required
                            minLength={3}
                        />
                    </label>
                    <label className="auth-label">
                        Email
                        <input type="email" name="email" autoComplete="email" required />
                    </label>
                    <label className="auth-label">
                        Password
                        <input
                            type="password"
                            name="password"
                            autoComplete="new-password"
                            required
                            minLength={8}
                        />
                    </label>
                    <button type="submit" className="btn btn-primary auth-submit">
                        Sign up
                    </button>
                </form>
                <p className="auth-foot">
                    Already have an account? <Link to="/signin">Sign in</Link>
                </p>
            </div>
        </main>
    );
}

export default SignUp;
