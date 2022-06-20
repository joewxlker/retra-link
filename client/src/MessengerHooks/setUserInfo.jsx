import { useEffect, useState } from "react";
import useSetUserAddress from './setAddress'

const useUserInfo = () => {

    const [userInfo, setUserInfo] = useState();
    const address = useSetUserAddress();

    useEffect(() => {
            fetch('/api/userInfo', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sender: address })
            })
                .then((res) => res.json())
                .then((data) => {setUserInfo(data.userInfo)})        
        }, [address])

        return userInfo
}
    
export default useUserInfo