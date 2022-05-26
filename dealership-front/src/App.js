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

  const handleCarUpdate = (event, carsData) =>{
    event.preventDefault();
    axios.put(
      `http://localhost:3000/cars/${carsData._id}`,
      {
          name: carName,
          manufacturer: carBrand, 
          year: carYear,
          mpg: carMpg,
          transmission: carTrans,
          style: carStyle,
          price: carPrice,
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
    <h1 className="title is-2">Cupid Dealership</h1>
    <h4 className="subtitle is-5">For The Car Lovers 	
&#10084;</h4>
    

    <form className="newCar is-form"onSubmit={addNewCar}>
      Name: <input type='text' onChange={handleCarName}></input>
      manufacturer: <input type='text' onChange={handleCarBrand}></input>
      year: <input type="number" onChange={handleCarYear}></input>
      mpg: <input type='text' onChange={handleCarMpg}></input>
      transmission: <input type='text' onChange={handleCarTrans}></input>
      style: <input type='text' onChange={handleCarStyle}></input>
      price: <input type='number' onChange={handleCarPrice}></input>
      <input type="submit" value='Add Car'/>
    </form>
    <h1 className="title is-3">Find Your Next Love</h1>
    {car.map((cars) =>{
      return(
        <div key={cars._id}>
        <div className="carInfo is-box">
        <p>Model:  {cars.name} {cars.manufacturer}</p>
        <p>Model Year: {cars.year}</p>
        <p>Combined MPG: {cars.mpg}</p>
        <p>Transmision: {cars.transmission}</p>
        <p>Style: {cars.style}</p>
        <p>Price: {cars.price}</p>
        </div>
        <form className="updateCar"onSubmit={(event) => { handleCarUpdate(event, cars) }}>
              Name: <input type="text" onChange={handleCarName}/><br/>
              manufacturer: <input type="text" onChange={handleCarBrand}/><br/>
              year: <input type="text" onChange={handleCarYear}/><br/>
              mpg: <input type="text" onChange={handleCarMpg}/><br/>
              transmission: <input type="text" onChange={handleCarTrans}/><br/>
              style: <input type="text" onChange={handleCarStyle}/><br/>
              price: <input type="text" onChange={handleCarPrice}/><br/>
              <input type="submit" value="Update Car Listing"/>
              <button onClick={(event) => handleDelete(cars)}>Delete this Listing </button>
            </form>

        
        </div>
        
      )
    })}
    </>
  )
}

export default App;
