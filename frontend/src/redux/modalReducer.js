const defaultState = {
  visible: false,
  type:    ''
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'SHOW_MODAL': {
      return {
        visible: true,
        ...action.payload
      };
    }
    case 'CLOSE_MODAL': {
      return defaultState;
    }
    default: {
      return {...state};
    }
  }
};
