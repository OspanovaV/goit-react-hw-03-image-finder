import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Overlay, ModalStyled } from './ModalStyled';

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    onClose: PropTypes.func,
    children: PropTypes.node.isRequired,
  };
//вешаем слушателя на keydown
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }
//отпишемся от слушателя
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }
//закрываем модалку при клике на Overlay или клавишу Escape
  closeModal = ({ currentTarget, target, code }) => {
        if (currentTarget === target || code === 'Escape') {
          this.props.onClose(); 
       }  
    }

  render() {
    return createPortal(
      <Overlay onClick={this.closeModal}>
        <ModalStyled>{this.props.children}</ModalStyled>       
      </Overlay>,
      modalRoot
    );
  }
}