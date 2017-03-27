
export const SET_SETTING = 'SET_SETTING';

export function setSetting(setting, value) {
  return {
    type: SET_SETTING,
    payload: { setting, value }
  };
}

