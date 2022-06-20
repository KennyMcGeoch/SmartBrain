import React from 'react';

const Rank = ({ name, entries}) => {
    return(
        <div >
            <div className='black f3 centre'>
                {`${name}, your current entry count is... ${entries}`}
            </div>
            <div className='black f1 centre'>
                {'#5'}
            </div>
        </div>
    );
    }
    
    export default Rank;