import { useState } from 'react';
import './Login.css';
import SignUpScreen from './SignUpScreen/SignUpScreen';

export default function Login() {

    const [signIn, setSignIn] = useState(false);
    const [emailText, setEmailText] = useState("");

    return (
        <div className='login'>
            <div className="login__background">
                <img
                 className='login__logo'
                 src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" 
                 alt=""
                />
                <button
                 onClick={() => setSignIn(true)}
                 className='login__button'
                 >Sign In</button>

                <div className="login__gradient" />
            </div>

            <div className="login__body">
                {
                    signIn
                    ? <SignUpScreen emailText={emailText} setEmailText={setEmailText} />
                    : (
                        <>
                            <h1>Unlimited films, TV programmes and more.</h1>
                            <h2>Watch anywhere. Cancel at any time.</h2>
                            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>

                            <div className="login__input">
                                <form>
                                    <input
                                    type="email" 
                                    placeholder='Email Address' 
                                    value={emailText}
                                    onChange={(e) => setEmailText(e.target.value)}
                                    />
                                    <button
                                    onClick={() => setSignIn(true)}
                                    className='login__getStarted'
                                    >GET STARTED</button>
                                </form>
                            </div>
                        </>
                    )
                }
            </div>

        </div>
    );
};
