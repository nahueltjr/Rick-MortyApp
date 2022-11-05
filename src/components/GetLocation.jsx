import React from 'react';

const GetLocation = ({data}) => {

    return (
        <article className='Location'>
            <h2>" {data?.name} "</h2>
            <ul>
                <li><span>Type:</span> <br /> {data?.type}</li>
                <li><span>Dimension:</span> <br /> {data?.dimension}</li>
                <li><span>Population:</span>  <br />{data.residents?.length}</li>
            </ul>
        </article>
    );
};

export default GetLocation;