import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';


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


  return (
    <>
    <h1>Dealership.</h1>
    <h4>For People Who Know About Cars.</h4>
    <form>
      <input type='text' value='name'></input>
      <input type='text' value=' manufacturer'></input>
      <input type="number" value='year'></input>
      <input type='text' value='mpg'></input>
      <input type='text' value='transmission'></input>
      <input type='text' value='style'></input>
      <input type='number' value='price'></input>
    </form>

    </>
  )
}

export default App;
