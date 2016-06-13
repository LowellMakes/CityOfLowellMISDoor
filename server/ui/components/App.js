// Dependencies

var React = require('react');
var io = require('socket.io-client')

// Components

var Forecast = require('react-forecast');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Config = require('./Config');
// Connect to server

let socket = io();

var globalStyle = {
  color: Config.textColor
}
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

var rowStyle = {
  display: 'flex',
  justifyContent: 'spaceBetween',
}

var smallTextStyle = {
  fontSize: Config.smallTextSize  
}

var medTextStyle = {
  fontSize: Config.medTextSize
}

var largeTextStyle = {
  fontSize: Config.largeTextSize 
}

var App = React.createClass({
  getInitialState: function(){
    return {switchState: 0};
  },

  componentDidMount: function(){
    socket.on('switch', data => {
      this.setState({switchState: data.state});
      console.log(data);
    });
  },

  getSignUnlocked: function(){
    if(this.state.switchState == 0){
      if(Config.showWeather){
        return (<Forecast latitude={42.6334} longitude={-71.3162} name='Lowell' color={Config.textColor}/>);
      } else {
        return (<div></div>);
      }
    } else {
      return (<div style={unlockedStyle}><span style={medTextStyle}>{Config.unlockedText}</span></div>);
    }
    
  },

  getSignLocked: function(){
    if(this.state.switchState == 0){
      return (<div style={lockedStyle}><span style={medTextStyle}>{Config.lockedText}</span></div>);
    } else {
      if(Config.showWeather){
        return (<Forecast latitude={42.6334} longitude={-71.3162} name='Lowell' color={Config.textColor}/>);
      } else {
        return (<div></div>);
      }
    }
  },

  render: function() {
    return (
      <div style={globalStyle}>
        <div style={rowStyle}>
          <div style={boxLeft}><center><img src="./Lowell_City_Seal.jpg" /></center></div>
          <div style={boxRight}>
            <center>
              <span style={smallTextStyle}>Lowell</span><br/>
              <span style={largeTextStyle}>MIS</span><br/>
              <span style={smallTextStyle}>Department</span>
            </center>
          </div>
        </div>

        <div style={rowStyle}>
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
        </div>
      </div>
    );
  }
});

module.exports = App
