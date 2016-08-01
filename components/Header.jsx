import React, { PropTypes, Component } from 'react';

import {AppBar} from 'material-ui';

class Header extends Component {

  render() {
    return (
      <header className="header">
          <AppBar title="HomeAudio Control"  showMenuIconButton={false}/>
      </header>
    );
  }
}

Header.propTypes = {
};

export default Header;
