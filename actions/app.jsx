import * as types from '../constants/ActionTypes';

const HOST = 'http://homeaudio.local:8181/zones/';

function load(data) {
  return {
    type: types.LOAD,
    data
  }
}

export function loadFromApi() {
  return function(dispatch) {
    fetch(HOST).then(function(result) {
      return result.json()
    }).then(function(zones) {
      //Filter out any weird zones that aren't 11-16
      dispatch(load(zones.filter(function(zone){
        const z = parseInt(zone.zone);
        return (z >= 11 && z <= 16);
      })));
    }).catch(function() {
      console.log("wat");
      dispatch(setError(`Can't communicate with HomeAudio System, is it turned off?`));
    });
  }
}

export function updateAttribute(zone, attribute, value) {
  return {
    type: types.UPDATE_ATTRIBUTE,
    zone,
    attribute,
    value
  }
}

export function setAttribute(zone, attribute, value) {
  return function(dispatch) {
    // Update the value locally
    dispatch(updateAttribute(zone, attribute, value));
    fetch(`${HOST}${zone}/${attribute}`, {
      method: 'post',
      body: value.toString()
    }).then(function(){
      // Load everything again in case something didn't set properly
      // TODO: just set the response here to avoid another API call
      dispatch(loadFromApi());
    }).catch(function(){
      dispatch(setError(`Can't communicate with HomeAudio System, is it turned off?`));
    });
  }
}

export function setError(error) {
  console.log("wat", error);
  return {
    type: types.SET_ERROR,
    error
  }
}