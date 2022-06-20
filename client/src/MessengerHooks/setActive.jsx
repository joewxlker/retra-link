import { useEffect, useState } from "react";
import useSetUserAddress from './setAddress'

const useSetActive = () => {

    const [activeChat, setActiveChat] = useState();
    const address = useSetUserAddress();

    useEffect(() => {
            console.log()
            fetch('https://retralinkapi.herokuapp.com/api/activeChat', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sender: address })
            })
                .then((res) => res.json())
                .then((data) => { setActiveChat(data.activeChat); });

    }, [address])
    
    return activeChat

}

export default useSetActive