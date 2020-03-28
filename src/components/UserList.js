
import React, {Component} from 'react'
import {useAuth0} from '../contexts/ContextAuth';


const UserList = (props) => {
    const { isLoading, user, loginWithRedirect, logout } = useAuth0()
    console.log(user)
    return (
        <>
        <h3>User List</h3>
        <ul>
            {
                // user && user.map((userDetail) => 
                //     <li>
                //         {userDetail.name}
                //     </li>
                // )

                <li>
                    {user.name}
                </li>
            }
        </ul>
        </>
    )
}

export default UserList
