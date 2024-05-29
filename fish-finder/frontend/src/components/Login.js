import {useRef, useState, useEffect, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import AuthContext from '../context/AuthProvider';
import axios from "../api/axios";

const LOGIN_URL = '/user/signIn';
const Login = () => {
    const {setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errorRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
       setErrorMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({user, pwd}), 
            {
                headers: {'Content-Type': 'application/json'},
            }
            );
            const accessToken = response?.data.accessToken;
            console.log(accessToken);
            console.log('succcc')
            setAuth({user, pwd, accessToken});
            setUser('');
            setPwd('')
            setSuccess(true);
        } catch (error) {
            if(!error.response){
                setErrorMsg('No Server Response');
            }else if(error.response?.status === 400){
                setErrorMsg('Missing Username or Password');
            }else if(error.response?.status === 401){
                setErrorMsg('Unauthorized');
            }else if(error.response?.status === 404){
                setErrorMsg('Invalid Username or Password');
            }else{
                setErrorMsg('Login Failed');
            }
            errorRef.current.focus();
        }
    }

    return(
        <>
         {success ? (
                <section>
                    <Container>
                        <h1>You are logged in!</h1>
                        <p>
                            <a href="/">Go to Home</a>
                        </p>
                    </Container>
                </section>
            ) : (
            <section>
                <Container>
                    <p ref={errorRef} className={errorMsg ? "errorMsg" : "offscreen"} 
                            araia-live="assertive">{errorMsg}</p>
                    <h1>Sign In</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                        <Form.Label htmlFor="username">Username:</Form.Label>
                        <Form.Control 
                                        type="text"
                                        id="username"
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(input) => setUser(input.target.value)}
                                        value={user}
                                        required
                                    />
                        </Form.Group>
                        <Form.Group className="mb-3">
                                <Form.Label htmlFor="password">Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    id="password"
                                    onChange={(input) => setPwd(input.target.value)}
                                    value={pwd}
                                    required
                                />
                        </Form.Group>
                        <Button onClick={handleSubmit}>Sign In</Button>
                    </Form>
                        <p>
                            Need an Account?<br/>
                            <span className="line">
                                <a href="/register">Sign Up</a>
                            </span>
                        </p>
                </Container>
            </section>
            )}
        </>
    )
}

export default Login