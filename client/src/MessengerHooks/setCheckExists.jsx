import { useEffect, useState } from "react";
import useSetUserAddress from './setAddress'

const useCheckExists = () => {

    const [exists, setExists] = useState(false);
    const address = useSetUserAddress();


    useEffect(() => {
        fetch('/api/allUsers', {
            method: 'post',
            headers: { 'Data-Type': 'applications/json' },
            body: JSON.stringify({ null: null })
        })
            .then((res) => res.json())
            .then((data) => { 
                if (address === undefined) { return }
                let accounts = data.allUsers
                let account = address;
                let lowerCase = account.toLowerCase();
                for (let v in accounts) {
                    let _account = accounts[v]
                    let _lowerCase = _account.toLowerCase();
                    if (lowerCase === _lowerCase) {
                        setExists(true)
                        break
                    }
                    else setExists(false);
                }
            })
    }, [address])

    return exists;
}

export default useCheckExists
