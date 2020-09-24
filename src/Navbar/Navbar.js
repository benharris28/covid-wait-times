import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';


class Navbar extends React.Component {
    render() {
        return(
            <div className="navbar">
                <InfoCircleOutlined className="nav-icon" />
                All data is crowd-sourced. Sites in Brampton and Vaughan being added soon!
            </div>
        )
    }
}

export default Navbar;