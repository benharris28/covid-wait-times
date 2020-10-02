import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';


class Navbar extends React.Component {
    render() {
        return(
            <div className="navbar">
                <InfoCircleOutlined className="nav-icon" />
                <p className="nav-text">Shortest lines from this past week are up. 
                <a target='_blank' rel="noopener noreferrer" href="https://twitter.com/CovidWaits"> Follow us on twitter for more info!</a></p>
            </div>
        )
    }
}

export default Navbar;