import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import menu from '../../constants/menu';
import { connect } from 'react-redux';
import { logOut } from '../../redux/actions/user';
import Loader from '../common/Loader';

@connect((store) => {
  return {
    user: store.user.details
  };
})

export default class LogOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      home: menu.home.url
    }
  }

  remainSame = () => {
    this.setState({ redirect: true });
  }

  logOut = () => {
    this.props.dispatch(logOut());
    if (!this.props.user.loading) {
      this.setState({ redirect: true });
    }
  };

  render() {
    if (this.state.redirect) {
      return (<Redirect to={this.state.home} />)
    }
    if (this.props.user.loading)
      return (<Loader />);
    return (
      <div className='container align-center'>
        <p>Continue to Logout </p>
        
       
        <div className='row justify-content-md-center'>
          <div className='col-2'>
          <button type="button" className="btn btn-primary btn-block" onClick={this.logOut}>Yes</button>
          </div>
          <div className='col-2'>
             <button type="button" className="btn btn-primary btn-block" onClick={this.remainSame}>No</button>
          </div>
        </div>
      </div>
    );
  }

};
