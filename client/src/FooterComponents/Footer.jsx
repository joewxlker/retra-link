import './footer.css'

const Footer = () => {
    return (
        <footer>
            <h5>Retra Link</h5>
            <span>
                <p>This decentralised application runs on the blockchain and is assisted by web3 to transfer and store data securely on the Ropsten testnet. <br>
                </br>Welcome to alpha build 1.0, you may experince bugs. You will need a wallet provider installed to interact with this application, You can install metamask
                    <p className='p-link'onClick={e => { e.preventDefault(); window.open('https://metamask.io/download/')}}>here</p></p>
                </span>
        </footer>
      );
}

export default Footer;