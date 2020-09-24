import React from 'react'
import { Select, InputNumber, Button, Alert } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import WaitApiService from '../services/wait-api-service';
import * as dayjs from 'dayjs'

class WaitForm extends React.Component {
    state = {
        formOpen: false,
        location_id: '',
        wait: 20,
        submitted: false
    }
    handleChange = (value) => {
        console.log(`selected ${value}`);

        this.setState({
            location_id: value
        })
    }

    onChange = (value) => {
        this.setState({
            wait: value
        })
    }

    handleClick = () => {
        this.setState({
            formOpen: true
        })
    }

    handleSubmit = () => {
       const { location_id, wait } = this.state;

    
       if (location_id > 0) {
       const today = dayjs();
        const date = dayjs(today).format('YYYY-MM-D')
        const hour = dayjs(today).format('HH')
        const prevHour = hour - 1

        WaitApiService.createWait(date, hour, location_id, wait)
        .then(res => {
            this.props.refreshData()

            this.setState({
                submitted: true
            }, () => {
                setTimeout(() => {
                    this.setState({
                        submitted: false,
                
                    }, () => {
                        this.setState({
                            formOpen: false
                        })
                    })
                }, 3500)
            })
        })
    } else {
        alert("Please select a location");
    }

    }

    render() {
        const { Option } = Select;
        console.log(this.state)
        const today = dayjs();
        const date = dayjs(today).format('YYYY-MM-D')
        const hour = dayjs(today).format('HH')
        const prevHour = hour - 1
        console.log(date)
        console.log(hour)
        console.log(prevHour)

        return (
            <div className="wait-form">
                <div className="form">
                
                    <div className="content-container low-padding">
                        {this.state.formOpen === false && 
                        <div className="form-input">

                        
                  
                        <p className="form-label">Are you at an assessement centre?</p>
                        <div className="button-box">
                        <Button className="button"
                            onClick={this.handleClick}>
                            Report Wait Time
                        </Button>
                        </div>
                    
                        

                    
                </div>
                        }

              
                
    {this.state.formOpen && this.state.submitted === false &&
                    
                <div className="select-form">
                    <div className="location-input">
                    <p className="form-label">Which assessment center are you at?</p>
                    <Select className="selector" defaultValue="Select a location" style={{ width: "90%" }} onChange={this.handleChange}>
                        <Option value="1">Etobicoke General Hospital Drive-Thru</Option>
                        <Option value="2">Humber River Hospital, Reactivation Care Centre – Finch Site</Option>
                        <Option value="3">Michael Garron Hospital</Option>
                        <Option value="4">Mount Sinai Hospital</Option>
                        <Option value="5">North York General Hospital</Option>
                        <Option value="6">North York General Hospital – Branson Site</Option>
                        <Option value="7">Scarborough Health Network – Birchmount Hospital</Option>
                        <Option value="8">Scarborough Health Network – Centenary Hospital</Option>
                        <Option value="9">Sunnybrook Health Sciences Centre</Option>
                        <Option value="10">UHN Toronto Western Hospital</Option>
                        <Option value="11">Unity – St. Joseph’s Health Centre</Option>
                        <Option value="12">Unity – St. Michael’s Hospital</Option>
                        <Option value="13">Women’s College Hospital</Option>
                    </Select>
                    </div>

                    <div className="wait-time-input">
                    <p className="form-label">What is the current estimated wait time?</p>
                    
                    <InputNumber className="wait-input" min={1} max={300} defaultValue={20} onChange={this.onChange} />
                    {` minutes`}
                    </div>
              
                    <div className="button-box">
                    <Button className="button"
                        onClick={(e) => this.handleSubmit(e)}>
                        Submit Wait Time Report
                    </Button>
                </div>
                </div>
                }
                 <div className="thank-you-message">
                {this.state.submitted && 
                <div>
                    <CheckCircleTwoTone className="thank-you-icon" twoToneColor="#52c41a" />
                    <p className="thank-you-heading">Thank you for submitting a wait time</p>
                </div>
                
                }
            </div>
            </div>
            </div>
           
            </div>
        )
    }
}

export default WaitForm;