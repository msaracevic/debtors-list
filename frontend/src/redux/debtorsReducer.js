export default function reducer(state = [], action) {
  switch (action.type) {
    case 'FETCH_DEBTORS': {
      return {
        ...state,
        list: [...action.payload]
      };
    }
    case 'SET_DEBTOR_AMOUNT': {
      return {
        ...state,
        list: state.list.map(debtor => {
          if (debtor.id === action.payload.id) return action.payload;
          else return debtor;
        })
      };
    }
    default: {
      return state;
    }
  }
};
