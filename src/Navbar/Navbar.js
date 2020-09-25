import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';


class Navbar extends React.Component {
    render() {
        return(
            <div className="navbar">
                <InfoCircleOutlined className="nav-icon" />
                All data is crowd-sourced. Sites for Peel and York regions have been added!
            </div>
        )
    }
}

export default Navbar;