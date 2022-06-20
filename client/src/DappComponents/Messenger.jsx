import React, { useEffect} from 'react';
import './Messenger.css'
import LoginAuth from './LoginComponents/LoginAuth';
import HandleUsers from './MessengerComponents/HandleUsers.jsx'
import { HandleMessageHistory } from './MessengerComponents/HandleMessageHistory.jsx'
import { useState } from 'react';

const Messenger = () => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => setLoading(false), 2000)
        //load page
    }, [])

    //need to define some code somwehere which
    //will run once everything has finished loading
    //and determine this setLoading value;

    return (
        <>
            {loading === false ? (
                <>
                    <div className='Messenger-main-container'>
                        {/* <div className='Messenger-main-sidebar bg-dark'>
                            <SideBar />
                        </div> */}
                        <div className='Messenger-main'>
                            <header className='Messenger-header'>
                            </header>
                            <div className='Messenger-main-body bg-dark'>
                                <div className='Messenger-users'>
                                    <HandleUsers />
                                </div>
                                <div className='Messenger-message-history h-100'>
                                    <HandleMessageHistory />
                                </div>
                                {/* <div className='Messenger-media-content'>
                                    <HandleMediaContent />
                                </div> */}
                            </div>
                            <footer className='Messenger-footer'>
                            </footer>
                        </div>
                    </div>
                </>) : (
                <div className='Messenger-main-loader bg-dark'>
                    <div className='text-light'>
                        <h1>APP LOADING...</h1>
                    </div>
                </div>
                //Need to change the css of this element and add spinner
            )}
                
        </>
    );
}



export default LoginAuth(Messenger)