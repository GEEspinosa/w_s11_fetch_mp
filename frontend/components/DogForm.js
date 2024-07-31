import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

const initialForm = { name: '', breed: '', adopted: false }

// Use this form for both POST and PUT requests!
export default function DogForm( {dog, fetchDogs, reset}) {
  
  const navigate = useNavigate()
  const [values, setValues] = useState(initialForm)
  const [breeds, setBreeds] = useState([])

  useEffect(() => {
    if (dog) {
      setValues(dog)
    } else {setValues(initialForm)}
  }
  , [dog])

  useEffect(() => {
    fetchBreeds()
  }, [])

  const fetchBreeds = () => {
    fetch ('http://localhost:3003/api/dogs/breeds')
      .then (res => {
        if (!res.ok) {
          throw new Error('Unable to get breeds!')
        } return res.json()
      })
      .then(data => {setBreeds(data.toSorted())})
      .catch(err => console.error(err))
  }

  const putDog = () => {
    fetch(`http://localhost:3003/api/dogs/${values.id}`, {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: new Headers({'Content-Type': 'application/json'})
    })
    .then (res => {
      if (!res.ok) {throw new Error('Putting failed!')}
      fetchDogs()
      reset()
      navigate('/')
    })
    .catch(err => console.error(err))
  }

  const postDog = () => {
    fetch('http://localhost:3003/api/dogs', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: new Headers({'Content-Type': 'application/json'})
    })
    .then (res => {
      if (!res.ok) {throw new Error('Posting failed!')}
      fetchDogs()
      navigate('/')
    })
    .catch(err => console.error(err))
  }

  const onReset = (event) => {
    event.preventDefault()
    setValues(initialForm)
    reset()
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const action = dog ? putDog : postDog
    action()   
  }
  
  const onChange = (event) => {
    const { name, value, type, checked } = event.target
    setValues({
      ...values, [name]: type === 'checkbox' ? checked : value
    })
  }

  return (
    <div>
      <h2>
        {dog ? 'Update Dog' : 'Create Dog'}
      </h2>
      <form onSubmit={onSubmit}>
        <input
          name="name"
          value={values.name}
          onChange={onChange}
          placeholder="Name"
          aria-label="Dog's name"
        />
        <select
          name="breed"
          value={values.breed}
          onChange={onChange}
          aria-label="Dog's breed"
        >
          <option value="">---Select Breed---</option>
          
          {/* Populate this dropdown using data obtained from the API */
          breeds.map((breed, key) => (
            <option key = {key} value={breed}>{breed}</option>
          ))
         
          }
        </select>
        <label>
          Adopted: <input
            type="checkbox"
            name="adopted"
            checked={values.adopted}
            onChange={onChange}
            aria-label="Is the dog adopted?"
          />
        </label>
        <div>
          <button type="submit">
            {dog ? 'Update Dog' : 'Create Dog'}
          </button>
          <button onClick ={onReset} aria-label="Reset form">Reset</button>
        </div>
      </form>
    </div>
  )
}
