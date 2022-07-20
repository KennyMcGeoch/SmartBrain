import React from 'react';

const Rank = ({ name, entries}) => {
    return(
        <div >
            <div className='black f3 centre'>
                {`${name}, your current entry count is... `}
            </div>
            <div className='black f1 centre'>
                {`${entries}`}
            </div>
        </div>
    );
    }
    
    export default Rank;