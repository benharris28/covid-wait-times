import React from 'react'
import Select from 'react-select'
import { Button, Result } from 'antd';
import * as dayjs from 'dayjs'
import WaitApiService from '../services/wait-api-service';

class RegionSelector extends React.Component {
    state = {
        formOpen: false,
        regions: '',
        selectedWait: '',
        submitted: false
    }

    handleChange = (regions) => {
        let regionList = [];
        if(regions !== null) {
        regionList = regions.map(region => Number(region.value))

        this.setState({
            regions: regionList
        }, () => this.props.setRegion(regionList))
    }

    else {
        regionList = []
        this.setState({
            regions: []
        }, () => this.props.setRegion(regionList))
    }
}

 
    

    
    render() {
        const { selectedOption, selectedWait } = this.state;
        console.log(this.state)

        const options = [
            { value: '1', label: 'Toronto' },
            { value: '2', label: 'York' },
            { value: '3', label: 'Peel' },
            { value: '4', label: 'Mississauga' },
        


          ]

   

        return(
            <div>
              

            
                <div className="region-selector">
                <div className="content-section low-padding">
                    <div className="content-container">
                        
                
                <Select className="form-select" value={selectedOption}
                        defaultValue={[options[0], options[1], options[2], options[3]]}
                        isMulti
                        name="colors"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={this.handleChange}
                        options={options} 
                        placeholder="Please select regions to display..."
                        />

            </div>
            </div>
            </div>
          

         



            </div>

        )
    }
}

export default RegionSelector;