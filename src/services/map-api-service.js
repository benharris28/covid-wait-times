import config from '../config';

const MapApiService = {
    getGeocode(address) {
        const key = config.API_KEY
        console.log(key)
        return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`, {
            headers: {
       
            },
        
          })
            .then(res =>
              (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
        },
        getMarkers(lat,lng) {
            return fetch(`${config.API_ENDPOINT}/map/?lat=${lat}&lng=${lng}`, {
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

export default MapApiService;