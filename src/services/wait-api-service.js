import config from '../config';

const WaitApiService = {

    createWait(date, hour, location_id, wait) {
        return fetch(`${config.API_ENDPOINT}/waits?location_id=${location_id}&wait=${wait}&date=${date}&hour=${hour}`, {
            method: 'POST',
            headers: {
                
            },
         
        })
        .then(res => 
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    getAllWaits(date, hour) {
        return fetch(`${config.API_ENDPOINT}/waits?date=${date}&hour=${hour}`, {
            headers: {
            
            },
          })
            .then(res =>
              (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
        },

}

export default WaitApiService;