import './App.css';
import React, {useState,useEffect} from 'react'
import Form from './Form.js'
import UserList from './UsersList'
import axios from 'axios'
import * as Yup from 'yup'
import schema from './validation'


function App() {

  const initialCreds = {
    name: '',
    email: '',
    password: '',
    terms: false
  }
  
  const initialErr = {
    name: '',
    email: '',
    password: '',
    terms: false
  }

  const [formData, setFormData] = useState(initialCreds)
  const [errors, setErrors] = useState(initialErr)
  const [disabled,setDisabled] = useState(true)
  const [users,setUsers] = useState([])

/////Helpers i saw in lecture

  const postNewUser = (newUser) => {
    axios.post('https://reqres.in/api/users',newUser)
      .then(res => {
        setUsers(users.concat(newUser))
        console.log(res.data)
      })
      .catch(err => console.log(err , 'something went wrong APP.js postNewUser()'))
  }

/// event handlers

const inputChange = (name,value) => {
  Yup.reach(schema, name)
      .validate(value)
      .then((res) => {setErrors({...errors, [name]: ''}) } )
      .catch(err => {setErrors({...errors, [name]: err.errors[0]}) } )
    setFormData({...formData,[name]: value})

}


const submit= ()=> {

  const newUser = {
    name: formData.name.trim(),
    email: formData.email.trim(),
    password: formData.password.trim(),
    terms: formData.terms
  }

  postNewUser(newUser)

}


useEffect(()=>{
  schema.isValid(formData).then(valid=>setDisabled(!valid))
},[formData])





  return (
    <div className="App">
      
      <Form
      values={formData}
      errors={errors}
      disabled={disabled}
      submit={submit}
      change={inputChange}
      />

    {users.map(item=><UserList item={item}/>)}
  
    </div>
  );

}

export default App;
