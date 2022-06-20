import { useEffect, useState } from "react";

const useSetUserAddress = () => {

    const [address, setAddress] = useState()
    // console.log('useSetUserAddress', address);

    useEffect(() => {
        const getAccount = async () => {
                let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                let account = accounts[0]
                setAddress(account)
            }
        getAccount();
    }, [address])
    return address
};

export default useSetUserAddress;