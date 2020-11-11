import React from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search'; 
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link} from 'react-router-dom'
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

function Header() {
    const [{ cart, user }, dispatch] = useStateValue()
    
    const handleAuthetication = () => {
        if (user) {
            auth.signOut();
            }
    }

    return (
        <div className='header'>
            <Link  to ='/'>
                <img className='header__logo'  src='http://pngimg.com/uploads/amazon/amazon_PNG25.png'/>    
            </Link>
            
            <div className='header_search'>
                <input className='header__searchInput' type='text'/>
                <SearchIcon className='header_searchIcon' />
            </div>
            <div className='header_nav'>
                <Link to={!user && '/login'}>
                    <div onClick= {handleAuthetication} className='header__option'>
                        <span className='header__optionLineOne'>Hello, {!user ? 'Guest' : user.email}</span>
                        <span className='header__optionLineTwo'>{user ? 'Sign Out' : 'Sign In'}</span>
                    </div>
                </Link>
                <div className='header__option'>
                    <span className='header__optionLineOne'>Returns</span>
                    <span className='header__optionLineTwo'>Orders</span>
                </div>
                <div className='header__option'>
                    <span className='header__optionLineOne'>Your</span>
                    <span className='header__optionLineTwo'>Prime</span>
                </div>
                <Link to='/checkout' >
                    <div className='header__basketOption'>
                        <ShoppingCartIcon />
                        <span className='header__optionLineTwo header__basketCount'>{cart?.length}</span>
                    </div>
                </Link>

            </div>
        </div>
    )
}

export default Header
