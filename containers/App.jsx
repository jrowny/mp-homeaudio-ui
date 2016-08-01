import React, { Component, PropTypes } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as AppActions from '../actions/app';

class App extends Component {
  render() {
    const { actions } = this.props;
    return (
      <div>
        <Header />
        <MainSection zones={this.props.zones} error={this.props.error} actions={actions} />
      </div>
    );
  }
}


App.propTypes = {
  actions: PropTypes.object.isRequired,
  zones: PropTypes.array.isRequired,
  error: PropTypes.string
};

App.defaultProps = {
  error: ''
};

function mapStateToProps(state) {
  return {
    zones: state.app.zones,
    error: state.app.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AppActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
