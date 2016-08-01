import React, { Component, PropTypes } from 'react';
import Zone from './Zone';
import { Dialog, FlatButton } from 'material-ui';

const defaultStyle = {
  marginTop: '20px',
  marginLeft: '20px',
  marginRight: '20px'
};

class MainSection extends Component {
  constructor(props, context) {
    super(props, context);
    this.renderZones = this.renderZones.bind(this);
  }

  renderZones(zones) {
    return zones.map(function(zone){
      return (
        <Zone
          key={zone.zone}
          zone={zone}
          actions={this.props.actions}
        />);
    }.bind(this));
  }

  handleClose() {
    this.props.actions.setError('');
  }

  handleRefresh() {
    location.reload();
  }

  render() {
    const zones = this.renderZones(this.props.zones);
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Refresh"
        primary={false}
        onTouchTap={this.handleRefresh.bind(this)}
      />
    ];
    return (
      <section className="main" style={defaultStyle}>
        {zones}
        <Dialog
          title="Oh no!"
          actions={actions}
          modal={true}
          open={this.props.error!==''}
          onRequestClose={this.handleClose.bind(this)}
        >
          {this.props.error}
        </Dialog>
      </section>
    );
  }
}

MainSection.propTypes = {
  actions: PropTypes.object.isRequired,
  zones: PropTypes.array.isRequired,
  error: PropTypes.string
};

export default MainSection;
