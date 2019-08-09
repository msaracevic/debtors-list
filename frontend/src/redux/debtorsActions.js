import axios from 'axios';

export function fetchDebtors() {
  return (dispatch) => {
    return axios.get('/api/v1/debtors').then(response => dispatch({
      type:    'FETCH_DEBTORS',
      payload: response.data
    })).catch(err => console.log(err));
  };
}

export function setDebtorAmount(data) {
  return (dispatch) => {
    return axios.patch(`/api/v1/debtors/${data.id}`, {amount: data.amount})
      .then(response => {
        if (response.data.error) throw new Error('Update debtor amount went wrong');

        return dispatch({
          type:    'SET_DEBTOR_AMOUNT',
          payload: response.data
        });
      })
      .then(() => dispatch({type: 'SHOW_MODAL', payload: {type: 'SuccessModal'}}))
      .catch(err => console.log(err));
  };
}
