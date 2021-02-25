import React from 'react'

const UserList = (props) => {

const {item} = props

return(

    <div>
        <h2>{item.name}</h2>
        <p>{item.email}</p>
    </div>
)

} 

export default UserList