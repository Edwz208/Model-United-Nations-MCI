import styles from './LoginForm.module.css';
import { validateCode, validateCountry } from "../../utils/validators.js";

const LoginForm = ({code, setCode, country, setCountry, handleSubmit, errorSubmit}) => {

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
    }

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    }

    return (
        <form className={styles.container} onSubmit={(e) => {
            if (!validateCountry(country) || !validateCode(code)) {
                e.preventDefault()
                return
            }
            handleSubmit(e)
        }}>
            <input
            className={styles.input}
            type="text"
            name="country"
            value={country}
            placeholder="Country: e.g. 'Canada'"
            aria-label="Enter country here"
            onChange={handleCountryChange}
            />

            {!validateCountry(country) && (
            <div className={styles.error}>
                Country must be at least one character and alphanumeric
            </div>
            )}

            <input
            className={styles.input}
            type="text"
            name="code"
            value={code}
            placeholder="Access Code: e.g. '123abc'"
            aria-label="Enter code here"
            onChange={handleCodeChange}
            />
            {!validateCode(code) && (
            <div className={styles.error}>Code must be at least one character</div>
            )}

            <div className={styles.techDesk}>
            (See tech desk if you forgot your access code)
            </div>

            <button className={styles.loginButton}>Login</button>
            {errorSubmit && <div className={styles.error}>{errorSubmit}</div>}
        </form>
        );
}

export default LoginForm;