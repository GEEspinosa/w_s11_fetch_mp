import React, { useState, useEffect } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import DogForm from './DogForm'
import DogsList from './DogsList'

export default function App() {

  const [dogs, setDogs] = useState([])
  const [currentDogId, setCurrentDogId] = useState(null)

  useEffect(() => {
    fetchDogs()
  }, [])

  const fetchDogs = () => {
    fetch(`http://localhost:3003/api/dogs`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`your error is ${res.status}`)
        }
        return res.json()
      })
      .then (data => {
        setDogs(data)
      })
      .catch (err => console.error('Damn, an error:', err))
  }







  return (
    <div>
      <nav>
        <NavLink to="/">Dogs</NavLink>
        <NavLink to="/form">Form</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<DogsList 
          dogs = {dogs}
          fetchDogs = {fetchDogs}
          setCurrentDogId = {setCurrentDogId}
          />} 
        />
        <Route path="/form" element={<DogForm 
          dog = {currentDogId && dogs.find(d => d.id == currentDogId)}
          fetchDogs = {fetchDogs}
          reset = {() => setCurrentDogId(null)}
          />} 
        />
      </Routes>
    </div>
  )
}






 
  
  

