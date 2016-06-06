// Dependencies

import React, { Component } from 'react'
import io from 'socket.io-client'

// Components

import { Center,Col,Row } from 'components/Flex'
import Forecast from 'react-forecast'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Config} from './Config'
// Connect to server

let socket = io(`http://localhost:8000`);

var boxLeft = {
  flexGrow: 0,
  flexBasis: '50%',
  flexPack: 'start',
  flexShrink: 0,
  height: '50%'
};

var boxRight = {
  flexGrow: 1,
  flexBasis: '50%',
  flexPack: 'end',
  flexShrink: 0,
  width: '100%',
  height: '50%'
};

var unlockedStyle = {
  flex:1,
  backgroundColor: Config.unlockedColor,
  height: '100%',
  textAlign: 'center',
};


var lockedStyle = {
  backgroundColor: Config.lockedColor,
  textAlign: 'center',
  height: '100%',
  textAlign: 'center',
};

var smallTextStyle = {
  fontSize: Config.smallTextSize  
}

var medTextStyle = {
  fontSize: Config.medTextSize
}

var largeTextStyle = {
  fontSize: Config.largeTextSize 
}


export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {switchState: 0};
    socket.on('switch', data => {
      this.setState({switchState: data.state});
      console.log(data);
    });
  }

  getSignUnlocked(){
    if(this.state.switchState == 0){
      if(Config.showWeather){
        return (<Forecast latitude={42.6334} longitude={71.3162} name='Lowell' />);
      } else {
        return (<div></div>);
      }
    } else {
      return (<div style={unlockedStyle}><span style={medTextStyle}>{Config.unlockedText}</span></div>);
    }
    
  }

  getSignLocked(){
    if(this.state.switchState == 0){
      return (<div style={lockedStyle}><span style={medTextStyle}>{Config.lockedText}</span></div>);
    } else {
      if(Config.showWeather){
        return (<Forecast latitude={42.6334} longitude={71.3162} name='Lowell' />);
      } else {
        return (<div></div>);
      }
    }
  }

  render () {
    return (
      <div>
        <Row>
          <div style={boxLeft}><center><img src="./Lowell_City_Seal.jpg" /></center></div>
          <div style={boxRight}>
            <center>
              <span style={smallTextStyle}>Lowell</span><br/>
              <span style={largeTextStyle}>MIS</span><br/>
              <span style={smallTextStyle}>Department</span>
            </center>
          </div>
        </Row>

        <Row>
          <div style={boxLeft}>
            <ReactCSSTransitionGroup transitionName="unlocklock" transitionAppear={true} transitionAppearTimeout={1000} transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
              {this.getSignUnlocked()}
            </ReactCSSTransitionGroup>
          </div>
          <div style={boxRight}>
            <ReactCSSTransitionGroup transitionName="unlocklock" transitionAppear={true} transitionAppearTimeout={1000} transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
              {this.getSignLocked()}
            </ReactCSSTransitionGroup>
          </div>
        </Row>
      </div>
    );
  }
}
