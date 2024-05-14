import {useRef, useState, useEffect} from "react";
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import baseUrl from "../api/baseUrl";

const USER_REGEX = /^[a-zA-z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = 'user/register';

export const Register = () => {
    const userRef = useRef();
    const errorRef = useRef();


    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const isMatch = pwd === matchPwd;
        setValidMatch(isMatch);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrorMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log('I am in submit logic');
        const var1 = USER_REGEX.test(user);
        const var2 = PWD_REGEX.test(pwd);
        
        if(!var1 || !var2) {
            setErrorMsg("Invalid Entry");
            return;
        }
        try {
            await baseUrl.post(REGISTER_URL, JSON.stringify({user, pwd}),
                {
                    headers: {'Content-Type': 'application/json'},
                }
            );
            setSuccess(true);
        } catch (error) {
            if(!error.response){
                setErrorMsg('No Server Response');
            }else if(error.response?.status === 409){
                setErrorMsg('User Name is in use');
            }else{
                setErrorMsg('Registration Failed');
            }
            errorRef.current.focus();
        }
    }

    return (
        // change the a href tag later to the login url
        <>
            {success ? (
                <section>
                    <Container>
                        <h1>Welcome To Fish Finder!</h1>
                        <p>
                            <a href="/register">Sign In</a>
                        </p>
                    </Container>
                </section>
            ) : (

            <section>
                <Container>
                    <p ref={errorRef} className={errorMsg ? "errorMsg" : "offscreen"} 
                    araia-live="assertive">{errorMsg}</p>
                    <h1>Register</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="username">
                                Username:
                                <span className={validName ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck}/>
                                </span>
                                <span className={validName || !user ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </span>
                            </Form.Label>
                            <Form.Control 
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(input) => setUser(input.target.value)}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <p id = "uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                4 to 24 characters.<br/>
                                Must begin with a letter.<br/>
                                Letters, numbers, underscores, and hyphens are allowed.
                            </p>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="password">
                                Password:
                                <span className={validPwd ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck}/>
                                </span>
                                <span className={validPwd || !pwd ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </span>
                            </Form.Label>
                            <Form.Control
                                type="password"
                                id="password"
                                onChange={(input) => setPwd(input.target.value)}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p id = "pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                8 to 24 characters.<br/>
                                Must include uppercase and lowercase letters, a number and a special character.<br/>
                                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> 
                                <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span>
                            </p>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="confirm_pwd">
                                Confirm Password:
                                <span className={validMatch && matchPwd ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck}/>
                                </span>
                                <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </span>
                            </Form.Label>
                            <Form.Control
                                type="password"
                                id="confirm_pwd"
                                onChange={(input) => setMatchPwd(input.target.value)}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />

                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                Must match the first password input field.
                            </p>
                        </Form.Group>

                        <Button onClick={handleSubmit} disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</Button>
                    </Form>
                    <p>
                        Already registered?<br/>
                        <span className="line">
                            <a href="/register">Sign In</a>
                        </span>
                    </p>
                </Container>
            </section>
            )}
        </>
    )
}