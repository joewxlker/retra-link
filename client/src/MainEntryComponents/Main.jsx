import './Main.css'
import HandleLogin from '../DappComponents/LoginComponents/HandleLogin';

const Main = () => {
    return (
        <>
            <div className='main-container'>
                <div className='main-title-container'>
                    <h1 className='main-h1'> retralink </h1>
                    <h4 className='main-h4'> The messaging system of the future</h4>
                </div>
                    <HandleLogin />
            </div>
        </>
    )
};

export default Main;