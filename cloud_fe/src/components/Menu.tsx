import React from 'react';
import { Link } from "react-router-dom";
import './Menu.css';

interface Props {}

const Menu = (props: Props) => {
    return (
        <div className='Menu'>
            <Link to='/search' className='MenuItem'>
                Wyszukaj
            </Link>
            <Link to='/create' className='MenuItem'>
                Stwórz węzły
            </Link>
        </div>
    );
}

export default Menu;