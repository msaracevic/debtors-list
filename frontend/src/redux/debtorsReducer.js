export default function reducer(state = [], action) {
  switch (action.type) {
    case 'FETCH_DEBTORS': {
      return [...action.payload];
    }
    default: {
      return state;
    }
  }
};
