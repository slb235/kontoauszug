import { SET_SETTING } from '../actions/settings';

export default function settings(state = {}, action) {
  switch (action.type) {
    case SET_SETTING: {
      // there has to be a better syntax
      const newSetting = {};
      newSetting[action.payload.setting] = action.payload.value;
      return {
        ...state,
        ...newSetting
      };
    }
    default:
      return state;
  }
}
