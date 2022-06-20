import { useState } from "react";

const useAccountListener = (() => {

    const [bool, setBool] = useState(false);

    window.ethereum.on('accountsChanged', () => {
        setBool(true)
        window.location.reload();
        localStorage.setItem('username', '')
        localStorage.setItem('address', '')
    }, setBool(false))

    return bool
});

export default useAccountListener;