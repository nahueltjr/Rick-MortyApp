import React from 'react';

const FilterList = ({suggestList, setSearchInput}) => {

    const handleClick = id => setSearchInput(id)

    return (
            <ul className='SuggestedList'>
                {
                    suggestList?.map(location => (
                          <li onClick={()=> handleClick(location.id)} key={location.id}>
                            {location.name}
                          </li>  
                    ))
                }
            </ul>
    );
};

export default FilterList;