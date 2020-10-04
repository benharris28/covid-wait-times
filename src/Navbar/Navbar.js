import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';


class Navbar extends React.Component {
    render() {
        return(
            <div className="navbar">
                <InfoCircleOutlined className="nav-icon" />
                <p className="nav-text">Updated: see centres around the GTA in one place</p>
            </div>
        )
    }
}

export default Navbar;