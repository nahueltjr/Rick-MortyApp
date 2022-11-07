import React from 'react';

const GetLocation = ({data}) => {

    return (
        <article className='Location'>
            <h2>" {data?.name} "</h2>
            <ul>
                <li><span>TYPE:</span> <br /> {data?.type}</li>
                <li><span>DIMENSION:</span> <br /> {data?.dimension}</li>
                <li><span>HABITANTS:</span>  <br />{data.residents?.length}</li>
            </ul>
        </article>
    );
};

export default GetLocation;