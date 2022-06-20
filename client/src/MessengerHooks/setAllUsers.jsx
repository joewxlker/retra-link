import { useEffect, useState } from "react";
import useSetUserAddress from './setAddress'

const useAllUsers = () => {
    const address = useSetUserAddress();
    const [allUsers, setAllUsers] = useState()

    useEffect(() => {
        console.log('useAllUsers')
            fetch('https://retralinkapi.herokuapp.com//api/allUsers', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'null': 'null' })
            })
                .then((res) => res.json())
                .then((data) => setAllUsers(data));
    }, [address])
    
        return allUsers;
}

export default useAllUsers;