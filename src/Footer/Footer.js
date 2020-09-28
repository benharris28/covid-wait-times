import React from 'react';
import { Button } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';


class Navbar extends React.Component {
    render() {
        return(
            <div className="footer">
              
                <p className="footer-heading">This site is for the community and is completely free. There is no user tracking or monetization.</p>
                <p>If you have any feedback, please email Ben Harris at benjaminharris28@gmail.com</p>
                
            </div>
        )
    }
}

export default Navbar;