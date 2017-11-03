import React, { Component } from 'react';

class BotaoEnviarCustomizado extends Component {

  render() {
    return (
      <div className="pure-control-group">
        <label></label>
        <button type="submit" className="pure-button pure-button-primary">{ this.props.text }</button>
      </div>
    )
  }
}

export default BotaoEnviarCustomizado
