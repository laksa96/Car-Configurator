import React from 'react'

const Car = (props) => {

    const {id, category, image, name, seats, doors, features, price, newBadge} = props.data

    const featuresElements = features.map(feature => {
        return <li key={feature}>{feature}</li>
    })

    return (
        <div className='car' data-category={category}>
            {newBadge && <span className="car--badge">New</span>}
            <img src={`images/${image}`} alt={name} className="car--img" />
            <span className="car--specs">{seats} Seats, {doors} Doors</span>
            <h3 className="car--name">{name}</h3>
            <button className="car--config" onClick={() => props.openConfig(id)}>Configurator</button>
            <ul className="car--info">
                {featuresElements}
            </ul>
            <div className="car--bottom">
                <div className="car--price">
                    Starting from <br />
                    <span>{price.toLocaleString()} €</span>
                </div>
                <div className="car--btn">
                    <button data-id={id}>Buy Now</button>
                </div>
            </div>
        </div>
    )
}

export default Car