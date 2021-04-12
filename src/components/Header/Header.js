import React from 'react';
import clases from './Header.module.css';
import logo from '../../images/njpw_logo.png';

class Header extends React.Component {
    
    render() {
        return (
            <div className={clases.Header}>
                <img src={logo} width="100px" height="100px"/>
                <h1>{this.props.titulo}</h1>
            </div>
        )
    }
}

export default Header;