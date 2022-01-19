import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
    return(
        <div className='ma4 mt-0'>
            <Tilt perspective="2000">
                <div>
                    <h1><img src={brain} alt="brain logo" height="100" width="100"/></h1>
                </div>
            </Tilt>
        </div>
    );
    }
    
    export default Logo;