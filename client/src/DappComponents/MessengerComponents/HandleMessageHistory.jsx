import React, { Fragment, useState } from 'react'
import { useEffect } from 'react';
import '../Messenger.css'
import useSetForm from '../../MessengerHooks/setUserData';
import useSetUserAddress from '../../MessengerHooks/setAddress';
import useSetActive from '../../MessengerHooks/setActive';

export const HandleMessageHistory = () => {

    const [value, setForm] = useSetForm({message: ''});
    const [loading, setLoading] = useState(false);
    const [friendCode, setFriendCode] = useState();
    const [messages, setMessages] = useState();
    const address = useSetUserAddress();
    const activeChat = useSetActive();
    // const bool = useAccountListener();

    useEffect(() => {
        if (address === undefined) { return };
        if (activeChat === undefined) { return };
        fetch('https://retralinkapi.herokuapp.com//api/friendCode', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sender: address, receiver: activeChat })
        })
            .then((res) => res.json())
            .then((data) => setFriendCode(data))
    }, [address, activeChat]);

    useEffect(() => {
        if (friendCode === undefined) { return };
        // console.log('getting messages')
        fetch('https://retralinkapi.herokuapp.com//api/getMessages', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ friendCode: friendCode })
        })
            .then((res) => res.json())
            .then((data) => { setMessages(data) })
    }, [friendCode]);

    
    
    //messageMap, implemented to seperate 2D message arrays sent from solidty into sender/receiver arrays 
    const MessageMap = () => {
        if (messages === undefined) return; //address && messages must be defined to avoid errors
        const _messages = messages.receivedMessages;
        const newMessages = [];
        const sent = [];
        const received = [];
        let id = 0;
        console.log(_messages)
        for (let k in _messages) {
            id++
            newMessages.push([_messages[k][0].toUpperCase(), _messages[k][1], id]);
            console.log(id)
        }
        const messageObj = newMessages.map(([_address, _message, id]) => ({ _address, _message, id }));
        for (let v in messageObj) {
            if (messageObj[v]._address === address.toUpperCase()) {
                sent.push([messageObj[v]._address, messageObj[v]._message, id++])
            }
            else received.push([messageObj[v]._address, messageObj[v]._message, id++])
        }
        console.log([messageObj._address, address])
        console.log({messageObj, newMessages})
        return (
            <>
                {messageObj.map((msg, id) => {
                    return (
                        <div className='message-sent'>
                            <h5 key={id}>{msg._address}</h5>
                            <h6 key={(id+1)*10}>{msg._message}</h6>
                        </div>
                    )
                })}
            </>
        )
    }

    const sendMessage = async (event) => {
        // handles messages sent, setLoading is used to prevent multiple message requests at once as the server cant handle too many requests until
        // more addresses are implemented to handle transactions or frontend web3 handling is implemented...
        // in that case the user will be required to process their own transactions manually using their web3 provider
        // attempting to send multiple transactions from the same address requires gas/nonce handling
        event.preventDefault();
        setLoading(true)
        await fetch('https://retralinkapi.herokuapp.com//api/sendMessage', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sender: address, receiver: activeChat, message: value.message })
        })
            .then((res) => res.json())
            .then((data) => { alert(JSON.stringify(data)); alert('Refresh your browser to see updates'); setLoading(false); });
    };

    return (
        <Fragment>
            <header className='Messenger-Component-header'>
                messaging: {activeChat}
            </header>
            <div className='Messenger-message-history-body h-100 p-3'>
                <MessageMap />
            </div>
            <div className='Messenger-main-input'>
                {!loading ? (<form className='w-100' name='message' value={''} onSubmit={sendMessage}>
                    <input className='w-100' name='message' value={value.message} onChange={setForm}></input>
                </form>
                ) : (
                    <div className='w-100 h-100 bg-light d-flex justify-content-center align-items-center'>
                        <h4>Transaction Pending</h4>
                    </div>
                )}
            </div>
        </Fragment>
    );
};
// export default HandleMessageHistory