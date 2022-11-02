import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

class TweetTextbox extends React.Component {
    render() {
        return (
            <>
                <div className="flex">
                    <div className="m-2 w-10 py-1">
                        <img className="inline-block h-10 w-10 rounded-full" src="https://picsum.photos/id/1/200/300" alt="" />
                    </div>
                    <div className="flex-1 px-2 pt-2 mt-2">
                        <textarea className=" bg-transparent text-gray-400 font-medium text-lg w-full" rows="2" cols="50" placeholder="What's happening?"></textarea>
                    </div>                    
                </div>
                
                <div className="flex">
                    <div className="w-10"></div>

                    <div className="w-64 px-2">
                        
                        <div className="flex items-center">
                            <div className="text-center px-1 py-1 m-2">
                                <span className="mt-1 flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-400/10 hover:text-blue-400">
                                    <FontAwesomeIcon icon={faWarning} className="mr-2"/>
                                    Be careful of scammers
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <button className="bg-blue-400 mt-5 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-full mr-8 float-right">
                            Tweet
                        </button>
                    </div>
                </div>
            </>
        )
    }
}

export default TweetTextbox;