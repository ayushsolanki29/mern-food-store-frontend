import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios"
import { toast } from 'react-toastify';
const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken, token } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Sign Up");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }
    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login"
        } else {
            newUrl += "/api/user/register"
        }
        const response = await axios.post(newUrl, data);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            toast.success(response.data.message);
            setShowLogin(false);
        }else{
            toast.error(response.data.message);
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-input">
                    {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Username' />}

                    <input type="email" name='email' onChange={onChangeHandler} value={data.email} autoComplete="current-username" placeholder='Your Email' />
                    <input type="password" name='password' onChange={onChangeHandler} value={data.password} autoComplete="current-password" placeholder='Password' />
                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create Account " : "Login"}</button>
                <div className="login-popup-cond">
                    <input type="checkbox" checked required id='login_conditions' />
                    <label htmlFor="login_conditions">By continuing, i agree to the terms of use & privacy policy.</label>
                </div>
                {currState === "Login" ? <p>Create a new account ? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p> : <p>Already have an account ? <span onClick={() => setCurrState("Login")}>Login here</span></p>}


            </form>
        </div>
    )
}

export default LoginPopup
