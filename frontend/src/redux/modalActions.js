export function showModal(arg) {
  return {
    type:    'SHOW_MODAL',
    payload: {
      type:          arg.type,
      data:          arg.data,
      submitHandler: arg.submitHandler || null,
      cancelHandler: arg.cancelHandler || null
    }
  };
}

export function closeModal() {
  return {type: 'CLOSE_MODAL'};
}
