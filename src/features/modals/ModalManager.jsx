import React from 'react';
import { connect } from 'react-redux';
import TestModal from './TestModal.jsx';
import LoginModal from './LoginModal.jsx';
import RegisterModal from './RegisterModal.jsx';
import UnauthModal from './UnauthModal.jsx';

const modalLookup = {
  TestModal,
  LoginModal,
  RegisterModal,
  UnauthModal
};

const ModalManager = ({ currentModal }) => {
  let renderedModal;

  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];

    renderedModal = <ModalComponent {...modalProps} />;
  }
  return <span>{renderedModal}</span>;
};

const mapStateToProps = state => ({
  currentModal: state.modals
});

export default connect(mapStateToProps)(ModalManager);
