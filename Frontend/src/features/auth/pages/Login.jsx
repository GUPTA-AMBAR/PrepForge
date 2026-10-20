import "../auth.form.scss"
import {useNavigate, Link} from "react-router";
import {useAuth} from "../hooks/useAuth";
import {useState} from "react";
import LoadingScreen from "../../../components/LoadingScreen";

const Login = () => {
    const navigate = useNavigate();
    const {loading, handleLogin} = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");  

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin({email, password});
        navigate("/");
    }

    if(loading){
        return <LoadingScreen message="Signing you in..." />
    }

    return (
        <main className="auth-page">
            <div className="auth-card">
                <section className="auth-intro">
                    <div className="auth-intro__brand">
                        <span className="auth-intro__mark" aria-hidden="true">✦</span>
                        Interview Strategy
                    </div>
                    <div className="auth-intro__copy">
                        <h2>Walk into your next interview prepared.</h2>
                        <p>Get a tailored strategy, practice questions, and a focused preparation roadmap.</p>
                    </div>
                    <span className="auth-intro__footer">Your next opportunity starts here.</span>
                </section>
                <section className="auth-form-panel">
                    <div className="auth-form-container">
                        <div className="auth-form-container__heading">
                            <h1>Welcome back</h1>
                            <p>Sign in to continue to your interview plans.</p>
                        </div>
                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" id="email" name="email" placeholder="you@example.com" autoComplete="email" required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" id="password" name="password" placeholder="Enter your password" autoComplete="current-password" required
                        />
                    </div>
                    <button className="auth-submit" type="submit">Sign in <span aria-hidden="true">→</span></button>
                </form>
                        <p className="auth-form-container__switch">New here? <Link to="/register">Create an account</Link></p>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Login;