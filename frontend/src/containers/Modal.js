import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as modalActions from '../redux/modalActions';
import DebtorsModal from '../components/DebtorsModal';
import SuccessModal from '../components/SuccessModal';
import {bem} from '../helpers';

const AvailableModalContents = {
  DebtorsModal: DebtorsModal,
  SuccessModal: SuccessModal
};

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitEnabled: true,
      submitData:    null
    };
  }

  enableSubmit = () => {
    this.setState({submitEnabled: true});
  };

  disableSubmit = () => {
    this.setState({submitEnabled: false});
  };

  updateSubmitData = (submitData) => {
    this.setState({submitData: submitData});
  };

  render() {
    const {modal, closeModal} = this.props;
    if (!modal.visible) return null;

    // choose the content of modal we want to display from collection of existing ones in the app
    // set cancelHandler if provided, otherwise use default one which just closes modal
    // set submitHandler if provided, otherwise the button won't show up at all (in case of textual only modals)
    const ModalContent  = AvailableModalContents[modal.type],
          cancelHandler = modal.cancelHandler || closeModal,
          submitHandler = modal.submitHandler;

    return (
      <div className="modal">
        <div className="modal__inner">

          <ModalContent {...modal.data}
                        enableSubmit={this.enableSubmit}
                        disableSubmit={this.disableSubmit}
                        updateSubmitData={this.updateSubmitData}/>

          <div className="modal__buttons">
            <button className="modal__button modal__button--cancel" onClick={cancelHandler}>Close</button>
            {submitHandler &&
            <button className={bem('modal__button', ['action'], {disabled: !this.state.submitEnabled})}
                    onClick={() => submitHandler(this.state.submitData)}>
              Submit
            </button>}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modal: state.modal
  };
};

const mapDispatchToProps = {...modalActions};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
