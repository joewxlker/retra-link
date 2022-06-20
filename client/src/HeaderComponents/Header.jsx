import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {

    return (
        <>
            <div className='header-container'>
                <image className='header-logo' src='' alt='logo' />
                {/* <Link to='/Login'><button className='btn-main header-launch-button'>Launch App</button></Link> */}
            </div>
        </>
    )
};

export default Header;