import React from 'react';
import { Button } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';


class Navbar extends React.Component {
    render() {
        return(
            <div className="footer">
              
                <p className="footer-heading">Do you have any feedback? Please submit your feedback here</p>
                <div className="footer-button-box">
                <a target='_blank' rel="noopener noreferrer" href="https://covidwaits.typeform.com/to/G2vhScc1">
                    <Button className="button">
                        Submit Feedback
                    </Button>
                
                </a>
                </div>
            </div>
        )
    }
}

export default Navbar;