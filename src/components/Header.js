

import React from 'react'
import {useAuth0} from '../contexts/ContextAuth';
import './commanStyle.scss';
import {Button} from 'react-bootstrap';

const Header = (props) => {
    const { isLoading, user, loginWithRedirect, logout } = useAuth0() 
    return(
        <div className={`header ${!isLoading && !user && 'SmallHeader'}`}>
            <h1>Photo Gallery</h1>
            {
                !isLoading && user && 
                <>
                <h2>Welcome {user && user.name}</h2>
                <Button onClick={() => logout({returnTo:window.location.origin})}>
                Logout </Button>
                </>
            }
            {
            !isLoading && !user && <Button onClick={loginWithRedirect} className='button'>Login</Button> 
            }
            <style jsx>
                {`
                .SmallHeader {
                    width: 50%;
                    margin: auto;
                    padding: 5rem;
                    margin-top: 5rem;
                }
                
                `}
            </style>
        </div>
    )
}

export default Header