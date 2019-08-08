import React, {Component} from 'react';

export default class LoadingScreen extends Component {
  render() {
    let position = this.props.position || 'center',
        message  = this.props.message || null;

    return (
      <div className={`loading-screen loading-screen--${position}`}>
        {message && <p className="loading-screen__message">{message} ...</p>}
      </div>
    );
  }
}
