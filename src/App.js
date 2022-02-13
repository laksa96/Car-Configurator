import React, {useState, useEffect} from 'react'
import carsData from './carsData'
import Car from './components/Car'
import FilterButton from './components/FilterButton'
import Configurator from './components/Configurator'

const App = () => {
    // State for holding all cars data
    const [cars, setCars] = useState(JSON.parse(localStorage.getItem('carsData')) || carsData)
    // State for selected selectedCategory of cars
    const [selectedCategory, setSelectedCategory] = useState('All')
    // State for holding cars from selected category
    const [selectedCategoryCars, setSelectedCategoryCars] = useState(cars)
    // State for toggle configurator
    const [configOpened, setConfigOpened] = useState(false)
    // State for selected car for configuration
    const [selectedCar, setSelectedCar] = useState('')

    // Function for handling click on selectedCategory filter
    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat)
    }

    // Function for toggle configurator popup
    const openConfigurator = (id) => {
        setSelectedCar(cars.filter(car => car.id === id))
        setConfigOpened(true)
    }
    const closeConfigurator = () => {
        setConfigOpened(false)
    }

    // Function for handling onchange for configuration items
    const handleCheckboxChange = (e) => {
        // Get index of configuration item that changed
        const configIndex = Number(e.target.dataset.index)
        // Create new configuration array
        const newConfiguration = selectedCar[0].configuration.map((config, index) => {
            return index === configIndex
            ? {...config, checked: !config.checked}
            : config
        })
        // Get old price
        const oldPrice = selectedCar[0].price
        let newPrice = 0
        // If config is checked add to price , if not substract
        newConfiguration[configIndex].checked
        ? newPrice = Number(oldPrice + newConfiguration[configIndex].price)
        : newPrice = Number(oldPrice - newConfiguration[configIndex].price)
        
        // Update selected car and add new configuration instead
        setSelectedCar(prevSelectedCar => prevSelectedCar.map(car => {
            return {
                ...car,
                price: newPrice,
                configuration: newConfiguration
            }
        }))
    }

    // Effect for watching selectedCar changes and updating all cars state
    useEffect(() => {
        if (selectedCar) {
            setCars(prevCars => prevCars.map(car => {
                return car.id === selectedCar[0].id
                ? selectedCar[0]
                : car
            }))
        }
    }, [selectedCar])

    // Effect for updating localStorage if cars state changes
    useEffect(() => {
        localStorage.setItem('carsData', JSON.stringify(cars))
    }, [cars])

    // Effect for watching selectedCategory change
    useEffect(() => {
        if (selectedCategory !== 'All') {
            setSelectedCategoryCars(cars.filter(car => car.category === selectedCategory))
        }
        else {
            setSelectedCategoryCars(cars)
        }
    }, [selectedCategory, cars])


    // Generate Cars
    const carElements = selectedCategoryCars.map(car => {
        return <Car
         key = {car.id}
         data = {car}
         selectedCategory = {selectedCategory}
         openConfig = {(id) => openConfigurator(id)}
         />
    })

    return (
        <div className='shop container my-5'>
            <h1 className="shop--title text-center">You might take a look...</h1>
            <div className="shop--nav">
                <FilterButton value='All' handleCategoryChange = {() => handleCategoryChange('All')} selectedCategory = {selectedCategory} />
                <FilterButton value='Hatchback' handleCategoryChange = {() => handleCategoryChange('Hatchback')} selectedCategory = {selectedCategory} />
                <FilterButton value='Sportback' handleCategoryChange = {() => handleCategoryChange('Sportback')} selectedCategory = {selectedCategory} />
                <FilterButton value='Limousine' handleCategoryChange = {() => handleCategoryChange('Limousine')} selectedCategory = {selectedCategory} />
                <FilterButton value='SUV' handleCategoryChange = {() => handleCategoryChange('SUV')} selectedCategory = {selectedCategory} />
                <FilterButton value='Cabrio' handleCategoryChange = {() => handleCategoryChange('Cabrio')} selectedCategory = {selectedCategory} />
            </div>
            <div className='shop--cars'>
                {carElements}
            </div>
            {configOpened && <Configurator 
                closeConfig={() => closeConfigurator()} 
                opened={configOpened} 
                selectedCar={selectedCar}
                handleCheck={(e) => handleCheckboxChange(e)} 
            />}
        </div>
    )
}

export default App