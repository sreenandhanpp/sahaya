import React from 'react'
import Logout from './Logout'
import { getItem } from '../localStorage/getItem'

const Navbar = () => {
  const user = getItem('user');
  return (
    <div className='header-wrapper'>
      <header>
        {
          user.isAdmin ? 
        (<h2 className="logo" >ADMIN</h2>)
        : 
        (<h2 className="logo" >{user.username}</h2>)
        }
        <nav>
            <ul className="nav__links">
                <li>
                    <a href="#">Home</a>
                </li>
            </ul>
        </nav>
        <Logout />
    </header>
    </div>
  )
}

export default Navbar
