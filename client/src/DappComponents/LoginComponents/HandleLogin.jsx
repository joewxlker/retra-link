import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import './Login.css'
import useSetForm from '../../MessengerHooks/setUserData';
import useSetUserAddress from '../../MessengerHooks/setAddress';
import useUserInfo from '../../MessengerHooks/setUserInfo';
import useCheckExists from '../../MessengerHooks/setCheckExists';

const HandleLogin = () => {

    const [value, setForm] = useSetForm({ username: '' });
    const [loading, setLoading] = useState(true)
    const [pending, setPending] = useState(false)
    const [userBool, setUserBool] = useState(true)
    const exists = useCheckExists();
    const address = useSetUserAddress()
    const navigate = useNavigate()
    const userInfo = useUserInfo();

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000)
        setTimeout(() => setLoading(true));
        //load page
    }, [])

    const login = async (event, data) => {
        event.preventDefault()
        let username = userInfo[0]
        console.log(username)
        if (value.username === username) {
            setUserBool(true);
            localStorage.setItem('username', `${username}`)
            localStorage.setItem('address', `${address}`)
            navigate(`/Messenger/${address}/${username}`, { replace: true })
        } else {
            setUserBool(false);
            localStorage.setItem('bool', `${userBool}`)
        }
    };

    const createAccount = async (event) => {
        event.preventDefault();
        setPending(true);
        console.log(address, value.username)
        if(address === undefined) return
        await fetch('https://retralinkapi.herokuapp.com/api/createAccount', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sender: address, username: value.username })
        })
            .then((res) => res.json())
            .then((data) => { login(event, data); alert(data.txnHash); setPending(false); window.location.reload(); });
    }

    if(loading) { return ( <div className='loading-login'></div>)}
    if (exists) {
        return (
            <>
                <div className='Login-Form' >
                <h1 className='text-accent'>Login</h1>
                    <form className='w-100' onSubmit={login}>
                        <input className='w-100' name='username' value={value.username} onChange={setForm}>
                        </input>
                    </form>
                    {!userBool ? (<p className='text-danger'> username incorrect </p>) : (<p></p>)}
                </div>
            </>
        );
    }
    else {
        if (!pending) {
            return (
                <>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <h1>Create Account</h1>
                        < div className='Login-Form d-flex flex-row' >
                            <h3>Username: </h3>
                            <form className='w-100' onSubmit={createAccount}>
                                <input className='w-100' name='username' value={value.username} onChange={setForm}>
                                </input>
                            </form>
                        </div>
                    </div>
                </>
            
            );
        } else {
            return (
            <>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <h1>Creating Account</h1>
                        < div className='Login-Form d-flex flex-row' >
                        </div>
                    </div>
                </>
            )
        }
    };
};


export default HandleLogin
