import React from 'react'



const Form = (props) => {

    const {values, errors, disabled, submit, change} = props

    const onChange=(e)=>{
        const{name,value,type,checked} = e.target
        const valueToUse = type==='checkbox'? checked : value
        change(name,valueToUse)
    }

    const onSubmit = (e)=>{
        e.preventDefault()
        submit()
    }



return(

    <div>

        <form onSubmit={onSubmit} className='userForm'>

            <label>Name
                <input
                name='name'
                type='text'
                placeholder='enter name here'
                value={values.name}
                onChange={onChange}/>
            </label>

            <label>Email
                <input
                name='email'
                type='text'
                placeholder='enter email here'
                value={values.email}
                onChange={onChange}/>
            </label>

            <label>Password
                <input
                name='password'
                type='text'
                placeholder='enter password here'
                value={values.password}
                onChange={onChange}/>
            </label>

            <label>Terms and Conditions
                <input
                name='terms'
                type='checkbox'
                value={values.terms}
                onChange={onChange}/>
            </label>

            <button disabled={disabled}> Submit </button>

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