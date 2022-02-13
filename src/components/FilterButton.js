import React from 'react'

const FilterButton = (props) => {

    const {handleCategoryChange ,selectedCategory, value} = props

    return (
        <button onClick={() => handleCategoryChange('All')} className={`shop--nav--link ${selectedCategory === value ? 'shop--nav__active' : ''}`}>{value}</button>
    )
}

export default FilterButton