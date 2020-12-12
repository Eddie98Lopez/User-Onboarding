import React, {useState,useEffect} from 'react'
import axios from 'axios'
import * as Yup from "yup"; 

const schema = Yup.object().shape(
    {
        name: Yup
            .string()
            .required('Must enter Name'),
        email: Yup
            .string()
            .email('Must be valid email')
            .required('Must enter email'),

        password: Yup
            .string()
            .required('Must enter password')
            .min(8,"Password must be minimum of 8 characters long."),
        terms: Yup
            .boolean()
            .oneOf([true], 'Must accept Terms and Conditions')
    }
)

const Form = () => {


const [user,setUser]= useState({
    name:"",
    email:"",
    password:"",
    terms: false,

})

const [errors, setErrors] = useState({
    
    name:"",
    email:"",
    password:"",
    terms: "",
  });

const [disabled,setDisabled]=useState(true)

const setFormErrors = (name, value) => {
    Yup.reach(schema,name).validate(value)
        .then(()=>setErrors({...errors, [name]:''}))
        .catch((err)=>setErrors({...errors, [name]:err.errors[0]}))
}

const onChange = (event)=>{

    

    const {checked, name, type, value}= event.target
    const valueToUse = type==='checkbox' ? checked : value
    setFormErrors(name,valueToUse)
    setUser({...user, [name]: valueToUse})
    
}

useEffect(()=>{
    schema.isValid(user).then(valid=>setDisabled(!valid))
},[user])

const [post, setPost] = useState([]);

const formSubmit = e => {
    e.preventDefault();
    console.log("submitted!");
    axios
      .post("https://reqres.in/api/users", user)
      .then(res => {
        setPost(res.data); // get just the form data from the REST api
        console.log("success", res.data);
        alert(res.data.password)
      })
      .catch(err => console.log(err.response));
    
  };


return(

           
    
    <div>

           
            

        <form className="userForm" onSubmit={formSubmit} id='form'>

             <label htmlFor='name'>Name</label>
             <input
             id='name'
             type="text"
             placeholder='Johnny '
             name="name"
             value={user.name}
             onChange={onChange}
             />

             <label htmlFor='email'>Email</label>
             <input
             id='email'
             type='email'
             placeholder='jonny@domain.com'
             name='email'
             value={user.email}
             onChange={onChange}
             />

             <label htmlFor='pass'>Password</label>
             <input
             id='pass'
             type='password'
             placeholder="Passwords"
             name='password'
             value={user.password}
             onChange={onChange}
             />

             <input
             id='terms'
             type='checkbox'
             name='terms'
             checked={user.terms}
             onChange={onChange}
             /> 

             <button type="submit" disabled={disabled}>Submit</button>

        </form>

        

        <div className='errors'>
        <div>{errors.name}</div>
            <div>{errors.email}</div>
            <div>{errors.password}</div>
            <div>{errors.terms}</div>
        </div>
    </div>
)





}

export default Form