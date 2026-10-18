import {useNavigate, Link} from "react-router";
import {useAuth} from "../hooks/useAuth";
import {useState} from "react";
import "../auth.form.scss"
import LoadingScreen from "../../../components/LoadingScreen";

const Register = () => {
    const navigate = useNavigate();

    const {loading, handleRegister} = useAuth();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleRegister({username, email, password});
        navigate("/");
    }

    if(loading){
        return <LoadingScreen message="Creating your account..." />
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
                        <h2>Make your preparation count.</h2>
                        <p>Create an account to build interview plans shaped around your experience and goals.</p>
                    </div>
                    <span className="auth-intro__footer">Personalized preparation. More confidence.</span>
                </section>
                <section className="auth-form-panel">
                    <div className="auth-form-container">
                        <div className="auth-form-container__heading">
                            <h1>Create your account</h1>
                            <p>Get started with your personalized interview strategy.</p>
                        </div>
                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" id="username" name="username" placeholder="Enter username" value={username} 
                            onChange={(e) => setUsername(e.target.value)} autoComplete="username" required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" id="email" name="email" placeholder="you@example.com" value={email} autoComplete="email" required
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" id="password" name="password" placeholder="Create a password" value={password} autoComplete="new-password" required
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <button className="auth-submit" type="submit">Create account <span aria-hidden="true">→</span></button>
                </form>

                        <p className="auth-form-container__switch">Already have an account? <Link to="/login">Sign in</Link></p>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Register;