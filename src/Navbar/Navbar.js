import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';


class Navbar extends React.Component {
    render() {
        return(
            <div className="navbar">
                <InfoCircleOutlined className="nav-icon" />
                <p className="nav-text">Starting tonight, the site will provide a list of testing centres in the GTA and links to book appointments</p>
               
            </div>
        )
    }
}

export default Navbar;