import * as types from '../constants/ActionTypes';

const initialState = {
  zones: [],
  error: ''
};

export default function todos(state = initialState, action) {
  switch (action.type) {

    case types.SET_ERROR:
      return Object.assign({}, state, { error: action.error });

    case types.UPDATE_ATTRIBUTE:
      return {zones: state.zones.map(function(z) {
        if(z.zone === action.zone) {
          const update = {};
          update[action.attribute] = action.value.toString();
          return Object.assign({}, z, update);
        }
        return z;
      })};

    case types.LOAD:
      return {zones: action.data};

    default:
      return state;
  }
}
