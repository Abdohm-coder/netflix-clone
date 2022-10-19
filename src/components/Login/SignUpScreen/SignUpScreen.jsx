import { useState } from 'react';
import { useRef } from 'react';
import { auth } from '../../../firebase';
import './SignUpScreen.css';

export default function SignUpScreen({ emailText, setEmailText }) {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [haveAccount, setHaveAccount] = useState(true);
    const [error, setError] = useState(null);

    const register = (e) => {
        setError(null);
        e.preventDefault();
        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).catch(err => setError(err.message));
    };

    const signIn = (e) => {
        setError(null);
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).catch(err => setError(err.message));
    };

    return (
        <div className='signupScreen'>
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} value={emailText} onChange={(e) => setEmailText(e.target.value)} type="email" placeholder='Email' />
                <input ref={passwordRef} type="password" placeholder='Password' />
                <button type='submit' onClick={haveAccount ? signIn : register} >{haveAccount ? "Sign In" : "Sign Up"}</button>
                {
                    error && <span className='login__error'>{error}</span>
                }
                <h4>
                    <span className='signupScreen__gray'>{haveAccount ? "New to Netflix?" : "Already have account?"}</span>
                    <span
                     className='signupScreen__link'
                     onClick={() => setHaveAccount((o) => !o)}
                    >{haveAccount ? "Sign Up now." : "Sign In"}</span>
                </h4>
            </form>
        </div>
    );
};
