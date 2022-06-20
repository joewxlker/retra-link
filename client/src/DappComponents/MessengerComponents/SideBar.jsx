import { useState } from "react";
import { useEffect } from "react";


const SideBar = () => {

    const [isOpen, setOpen] = useState(false)

    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])

    const openMenu = () => {
        if (isOpen === true) {
            return (
                <div className='Messenger-side-menu'>
                    hello there brooo
                </div>
            )
        }
        else return;
    }

    return (
        <button className='btn bg-dark text-light' onClick={openMenu}>***</button>
    )
};

export default SideBar