import React from 'react'

const Configurator = (props) => {

    const {opened, closeConfig} = props
    
    const {image, name, seats, doors, price, newBadge, configuration} = props.selectedCar[0]

    const configElements = configuration.map((config, index) => {
        return (
            <div key={config.name} className="config--row row justify-content-between">
                <label className="col config--label">
                    <input data-index={index} type="checkbox" hidden defaultChecked = {config.checked === true ? true : false} onChange={(e) => props.handleCheck(e)} />
                    <div className="config--checkmark"><img src="images/checkmark.png" alt="Checkmark" /></div>
                    <p>{config.name}</p>
                </label>
                <span className="col">
                    {config.price.toLocaleString(undefined, {maximumFractionDigits: 2})} EUR
                </span>
            </div>
        )
    })

    return (
        <div className="config config__hidden" className={`config ${opened === true ? '' : 'config__hidden' }`}>
            <div className="row config--window">
                <div className="config--close" onClick={() => closeConfig()}>
                    <img src="images/close.png" alt="Close" />
                </div>
                <div className="config--left col-12 col-md-4">
                <div className="config--img">
                    {newBadge === true ? <span className="config--badge">New</span> : ''}
                    <img src={`images/${image}`} alt="Audi" />
                </div>
                    <span className="config--specs">{seats} Seats, {doors} Doors</span>
                    <h3 className="config--name">{name}</h3>
                <div className="config--price">
                    Starting from <br />
                    <span className="config--price--num">{price.toLocaleString(undefined, {maximumFractionDigits: 2})} €</span>
                </div>
                </div>
                <div className="config--right col-12 col-md-8">
                    <h4>Audi Configurator</h4>
                    <p>Create your own audi.</p>
                    <div className="config--list">
                        {configElements}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Configurator