import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKiwiBird, faHouseCrack } from '@fortawesome/free-solid-svg-icons';
import Connect from './Connection';
import CheckEthConnection from './CheckEthereumConnection';

class Header extends React.Component {
    
    constructor() {
        super();

        this.accounts = window.ethereum._state.accounts;
        this.isConnected = false;

        if(this.accounts) {
            if(this.accounts.length > 0)
                this.isConnected = true;
            else
                this.isConnected = false;
        }

        console.log(this.isConnected, this.accounts);
    }

    handleClick(status) {
        //console.log("Connect To MetaMask");
        CheckEthConnection();
        
        if(!status) Connect();
    }

    render() {
        return <header role="banner" aria-label="sidebar" className="base flex-none items-end max-lg:hidden">
            <div className="base w-[275px]">
                <div className="base h-full top-0 fixed">
                    <div className="base overflow-y-auto h-full w-[275px] px-5">
                        <div className="base items-start">
                            <div className="base logo py-5">
                                <h1 role="heading min-w-[32px]">
                                    <a href="/" role="link" className="base">
                                        <FontAwesomeIcon icon={faKiwiBird} className="h-[2rem]"/>
                                    </a>
                                </h1>
                            </div>
                            <div className="base linklists mt-2 mb-4 w-full">
                                <nav className="space-y-2">
                                    <ul>
                                        <li>
                                            <a href="/" className="w-full flex items-center p-2 text-base font-bold text-gray-900 rounded-full dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <FontAwesomeIcon icon={faHouseCrack} className="h-[1em] text-white" />
                                                <span className="ml-6">Home</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>

                                <div>
                                    <button onClick={ () => this.handleClick(this.isConnected) } className="bg-blue-400 w-full mt-5 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                                        Connect to MetaMask
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    }
}

export default Header;