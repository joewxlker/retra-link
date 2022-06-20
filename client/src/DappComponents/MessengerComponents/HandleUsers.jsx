import React, { Fragment } from 'react'
import { useState } from 'react';
import '../Messenger.css'
import useSetForm from '../../MessengerHooks/setUserData';
import useSetUserAddress from '../../MessengerHooks/setAddress';
import useSetFriendsArray from '../../MessengerHooks/setFriendsArray';
import useAllUsers from '../../MessengerHooks/setAllUsers';

const HandleUsers = () => {

    const [loading, setLoading] = useState(false); // sets loading true before making requests to solidty | sets false once the txn is complete
    const [value, setForm] = useSetForm({ userSearch: '' }); // handles user search input
    const address = useSetUserAddress(''); // gets the connected wallets address 
    const friends = useSetFriendsArray(); // returns friend array
    const allUsers = useAllUsers(); // returns all users array
    const userArray = allUsers;

    const addFriend = async () => {

        let receiver = value.userSearch.toLowerCase();
        let _address = address.toLowerCase();
        //case sensitive input handling
        if (receiver === _address) return console.log('attempted to add self');
        setLoading(true);
        await fetch('https://retralinkapi.herokuapp.com/api/addFriend', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sender: _address, receiver: receiver })
        })
            .then((res) => res.json())
            .then((data) => { alert(JSON.stringify(data)); })
            .then(() => { setActive(receiver); })
            .then(() => { window.location.reload() });
             // response data will either be a txnHash on successful transaction
             //indicating the friend has been added successfully... or it will
             //contain some sort of error, null, reverted etc.
    }

    const FindUserButton = () => {
        if (userArray === undefined) { return }; //hook calls return undefined on firt render
        for (let v in userArray.allUsers) {
            //for loop filters through all users array and determines if input matches smart contract memory
            //if not does nothing
            if (userArray.allUsers[v] === value.userSearch) {
                return (
                    <div className='Messenger-add-user pt-2 pb-2 bg-light w-100' onClick={addFriend}>{value.userSearch}</div>
                )
            }//renders a button which allows users to add the user only if they exist in the db
        }
    };

    const setActive = async (event, props) => {
        if (props === undefined) { return } else if (address === undefined) { return }; // Hook calls return undefined on first render
        setLoading(true);
        event.preventDefault();
        await fetch('https://retralinkapi.herokuapp.com//api/setActive', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sender: address, receiver: props })
        })
            .then((res) => res.json())
            .then((data) => { alert(JSON.stringify(data)); })
            .then(() => { setLoading(false); })
            .then(() => { window.location.reload() })
             // alerts user that the transaction has succeeded, displays transaction hash
    }

    const NoFriends = () => {
        if (friends === undefined)
        return (
        <>
        {!loading? (
            <div className='d-flex flex-column justify-content-center align-items-center h-100'> u got no frands </div>
        ) : (
            <div className='d-flex flex-column justify-content-center align-items-center h-100'> loading... </div>
        )}
    </>
            )
    }
    
    const PreLoadFriends = () => {
        let friend;
        let key = 0;
        if (friends === undefined) { return }
        for (let v in friends) {
            friend = friends[v]
        }
        if (friend !== undefined) return (
            <>
                {!loading ? (
                    <>
                        {friend.map((friends) => {
                            key++ //friend.map is return the connected user address instead of friends...
                            return (             //see MessengerHooks/setUserData.jsx useSetFriendArray...
                                <button key={key} className='btn-friends' onClick={event => { setActive(event, friends[0]) }}><h6>{`${friends.toString().slice(0, 12)}...`}</h6></button>
                            )
                        })}
                    </>
                ) : ( // returns this while loading, Users cannot send multiple set active requests while pending
                    <div className='w-100 h-100 d-flex justify-content-center align-items-center'><h4>selecting user...</h4></div>
                )}
            
            </>
        )
    };

    const LoadFriends = () => {
        return (
            <>
                <NoFriends />
                <PreLoadFriends />
            </>
        )
    };


    return (
        <Fragment>
            <header className='Messenger-Component-header'>
                <input //handles user input
                    className='w-75 h-50'
                    name='userSearch'
                    value={value.userSearch}
                    onChange={setForm}
                >
                </input>
            </header>
            <div className='Messenger-Users-Container'>
                {/* //render user button and friends */}
                <FindUserButton />
                <LoadFriends />
            </div>
        </Fragment>
    );
};

export default HandleUsers