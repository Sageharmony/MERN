import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import './';


function App() {
  
  const [car, setCar] = useState([])
  const [carName, setCarName] = useState('') 
  const [carBrand, setCarBrand] = useState('')
  const [carYear, setCarYear] = useState(1999)
  const [carMpg, setCarMpg] = useState('')
  const [carTrans, setCarTrans] = useState('')
  const [carStyle, setCarStyle] = useState('')
  const [carPrice, setCarPrice] = useState(13000)

  
  const handleCarName = (event) =>{
    setCarName(event.target.value)
  }
  const handleCarBrand = (event) =>{
    setCarBrand(event.target.value)
  }
  const handleCarYear = (event) =>{
    setCarYear(event.target.value)
  }
  const handleCarMpg = (event) =>{
    setCarMpg(event.target.value)
  }
  const handleCarTrans = (event) =>{
    setCarTrans(event.target.value)
  }
  const handleCarStyle = (event) =>{
    setCarStyle(event.target.value)
  }
  const handleCarPrice = (event) =>{
    setCarPrice(event.target.value)
  }


  const addNewCar = (event) =>{
    event.preventDefault()
  axios.post(
    'http://localhost:3000/cars',
    {
      name: carName,
      manufacturer: carBrand, 
      year: carYear,
      mpg: carMpg,
      transmission: carTrans,
      style: carStyle,
      price: carPrice,
    }
  
  ).then(() =>{
    axios
    .get('http://localhost:3000/cars').then((response) =>{
      setCar(response.data)
    })
  })
  }

  const handleCarUpdate = (carsData) =>{
    axios
    .put(
      `http://localhost:3000/cars/${carsData._id}`,
      {
          name: carsData.name,
          manufacturer: carsData.brand, 
          year: carsData.year,
          mpg: carsData.mpg,
          transmission: carsData.trans,
          style: carsData.style,
          price: carsData.price,
      }
        ) 
        .then(()=>{
          axios
          .get('http://localhost:3000/cars')
          .then((response)=>{
            setCar(response.data)
          })
        }) 
}

const handleDelete=(carsData)=>{
    axios
    .delete(`http://localhost:3000/cars/${carsData._id}`,)
    .then(()=>{
      axios
      .get('http://localhost:3000/cars')
      .then((response)=>{
        setCar(response.data)
      })
    
    })
}
  useEffect(()=>{
    axios
        .get('http://localhost:3000/cars')
        .then((response)=>{
        	setCar(response.data);
        })
},[])

  return (
    <>
    <h1>Dealership.</h1>
    <h4>For People Who Know About Cars.</h4>
    <form onSubmit={addNewCar}>
      Name: <input type='text' onChange={handleCarName}></input>
      manufacturer: <input type='text' onChange={handleCarBrand}></input>
      year: <input type="number" onChange={handleCarYear}></input>
      mpg: <input type='text' onChange={handleCarMpg}></input>
      transmission: <input type='text' onChange={handleCarTrans}></input>
      style: <input type='text' onChange={handleCarStyle}></input>
      price: <input type='number' onChange={handleCarPrice}></input>
      <input type="submit" value='Add Car'/>
    </form>
    <h1>Current Cars</h1>
    {car.map((cars) =>{
      return(
        <div key={cars._id}>
        
        <h1>{cars.name}</h1>
        <p>{cars.manufacturer}</p>
        <p>{cars.year}</p>
        <p>{cars.mpg}</p>
        <p>{cars.transmission}</p>
        <p> {cars.style}</p>
        <p> {cars.price}</p>
        <button onClick={(event) => handleCarUpdate(cars)}>Update This Car Listing</button>
        <button onClick={(event) => handleDelete(cars)}>Delete this Listing </button>
        </div>
        
      )
    })}
    </>
  )
}

export default App;
