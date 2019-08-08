import axios from 'axios';

export function fetchDebtors() {
  return (dispatch) => {
    return axios.get('/api/v1/debtors').then(response => dispatch({
      type:    'FETCH_DEBTORS',
      payload: response.data
    })).catch(err => console.log(err));
  };
}
