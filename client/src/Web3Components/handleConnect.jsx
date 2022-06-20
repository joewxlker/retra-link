import useSetUserAddress from '../MessengerHooks/setAddress'

const ConnectButton = () => {

    const address = useSetUserAddress('');

    const connect = async () => {
        console.log(address)
    }

    return (
        <button
            className='connect-button'
            type='button'
            onClick={connect}>
            Connect
        </button>
    )
}

export default ConnectButton