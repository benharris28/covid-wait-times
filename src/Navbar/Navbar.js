import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import logo from '../Assets/logo.png'


class Navbar extends React.Component {
    render() {
        return(
            <div className="navbar">
               <div className="logo-box">
                   <img className="logo" src={logo} alt="covid waits logo" />
               </div>
            </div>
        )
    }
}

export default Navbar;