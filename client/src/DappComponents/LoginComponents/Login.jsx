import React, { Component } from 'react'
import { Fragment } from 'react'
import './Login.css'
import HandleLogin from './HandleLogin'


export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: '',
        }
    }

    render() {
        return (
            <Fragment>
                <div className='Login-container bg-dark'>
                <header className='Login-Header'>
                    </header>
                <div className='Login-Main'>
                        <HandleLogin />
                    </div>
                    </div>
            </Fragment>
        );
    }
}

