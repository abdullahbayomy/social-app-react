import React, { Component } from 'react';
import classes from './Modal.module.css';

class Modal extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          className={classes.Modal}
          style={{
            display: this.props.show ? 'block' : 'none',
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100)',
            opacity: this.props.show ? '1' : '0',
          }}
        >
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;
