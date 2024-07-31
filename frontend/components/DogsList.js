import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function DogsList({dogs, fetchDogs, setCurrentDogId}) {
  const navigate = useNavigate()


  const editing = (id) => {
    setCurrentDogId(id)
    navigate('form')
  }

  const deleting = (id) => {
    fetch (`api/dogs/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if(!res.ok){
          throw new Error('Problem deleting dog!')
        }
      })
      .catch(err => console.error(err))
      
    fetchDogs()
    setCurrentDogId(null)
  }
  
  return (
    <div>
      <h2>Dogs Shelter</h2>
      <ul> 
        {
          dogs.map(dog => (
            <li key= {dog.id}>
              {dog.name}, {dog.breed}, {dog.adopted ? '' : 'NOT '} adopted
              <div>
                <button onClick={() => editing(dog.id)}>Edit</button>
                <button onClick={() => deleting(dog.id)}>Delete</button>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}



