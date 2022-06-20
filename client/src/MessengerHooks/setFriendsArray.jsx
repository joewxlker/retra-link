import { useEffect, useState } from "react";
import useSetUserAddress from './setAddress'

const useSetFriendsArray = () => {

    const [friends, setFriends] = useState();
    const address = useSetUserAddress();

    useEffect(() => {
        fetch('https://retralinkapi.herokuapp.com//api/friendList', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sender: address })
            })
                .then((res) => res.json())
                .then((data) => {
                    try {
                        setFriends(data.friendList);
                    } catch (err) { console.log(err) }
                });
    }, [address])

    return [friends];
}

export default useSetFriendsArray