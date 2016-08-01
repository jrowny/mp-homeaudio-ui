import React, { Component, PropTypes } from 'react';
import { Paper, Slider, DropDownMenu, MenuItem, Toggle, ToolbarGroup, Toolbar, ToolbarTitle} from 'material-ui';

class Zone extends Component {
  constructor(props, context) {
    super(props, context);
    this.setVolume = this.setVolume.bind(this);
    this.setChannel = this.setChannel.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.state = {
      dragging: false
    };
  }

  setMute(zone, e, toggled) {
    const value = toggled ? "01" : "00";
    this.props.actions.setAttribute(zone, 'mu', value);
  }

  setPower(zone, e, toggled) {
    const value = toggled ? "01" : "00";
    this.props.actions.setAttribute(zone, 'pr', value);
  }

  setChannel(zone, e, i, value) {
    this.props.actions.setAttribute(zone, 'ch', value);
  }

  setVolume(zone, e, value) {
    if (!this.state.dragging) {
      this.props.actions.setAttribute(zone, 'vo', Math.round(value));
    }
  }

  onDragStart() {
    this.setState({
      dragging: true
    });
  }

  onDragEnd(zone) {
    const volume = Math.round(this.refs['slider' + zone].getValue());
    this.props.actions.setAttribute(zone, 'vo', volume);
    this.setState({
      dragging: false
    });
  }

  render() {
    const paperStyle = {
      clear: 'both'
    };
    const sliderStyle = {
      padding: '10px 20px'
    };
    const toggleStyle = {
      float: 'right',
      paddingTop: '15px',
      paddingRight: '10px'
    };
    const dropStyle = {
      clear: 'both',
      float: 'right',
      margin: '-55px 10px'
    };
    const zone = this.props.zone;
    const vol = parseInt(zone.vo);
    const title = `Zone ${zone.zone.substr(1, 2)}`;

    return (
      <Paper key={zone.zone} style={paperStyle}>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={title}/>
          </ToolbarGroup>
          <ToolbarGroup style={toggleStyle}>
            <Toggle
              label="Power"
              onToggle={this.setPower.bind(this, zone.zone)}
              labelPosition="right"
              toggled={zone.pr === '01'}
            />
          </ToolbarGroup>
          <ToolbarGroup style={toggleStyle}>
            <Toggle
              label="Mute"
              disabled={zone.pr === '00'}
              labelPosition="right"
              onToggle={this.setMute.bind(this, zone.zone)}
              toggled={zone.mu === '01'}
            />
          </ToolbarGroup>

        </Toolbar>
        <div style={sliderStyle}>
          <Slider ref={'slider' + zone.zone}
                  disabled={zone.pr === '00'}
                  value={vol}
                  min={10}
                  max={38}
                  step={1}
                  onChange={this.setVolume.bind(this, zone.zone)}
                  onDragStart={this.onDragStart}
                  onDragStop={this.onDragEnd.bind(this, zone.zone)}/>
        </div>
        <DropDownMenu
          style={dropStyle}
          disabled={zone.pr === '00'}
          value={zone.ch}
          onChange={this.setChannel.bind(this, zone.zone)}>
          <MenuItem index={1} value={'01'} primaryText="Source 1"/>
          <MenuItem index={2} value={'02'} primaryText="Source 2"/>
          <MenuItem index={3} value={'03'} primaryText="Source 3"/>
          <MenuItem index={4} value={'04'} primaryText="Source 4"/>
          <MenuItem index={5} value={'05'} primaryText="Source 5"/>
          <MenuItem index={6} value={'06'} primaryText="Source 6"/>
        </DropDownMenu>
      </Paper>)
  }
}

Zone.propTypes = {
  actions: PropTypes.object.isRequired,
  zone: PropTypes.object.isRequired
};

export default Zone;
