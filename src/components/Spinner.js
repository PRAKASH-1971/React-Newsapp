import React from 'react'
import Snake from './Snake.gif'

const Spinner = () =>{
        return (
            <div className="text-center">
                <img className="my-3" src={Snake} alt="loading" />
            </div>
        )
    }


export default  Spinner