import React, { Component } from 'react';
import { faMap} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MapGL, {Marker, Popup,NavigationControl} from 'react-map-gl';
const TOKEN = 'pk.eyJ1Ijoic2FyYWhhYnUiLCJhIjoiY2p2cDMzbTF2MjRucDQ5bDZpNTI3MmYxMSJ9.mmDT7xUEAoLivnu8mY4YsA';
const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

export default class ReactMap extends Component {

constructor(props) {
  super(props);
  this.state = {
    viewport: {
      latitude: 24.68773,
      longitude:  46.72185,
      zoom: 9.8,
      bearing: 0,
      pitch: 0,
      width: 500,
      height: 300,
    },
    popupInfo: null
  };

}
renderPopup(){
  return this.state.popupInfo && (
    <Popup tipSize={5}
      anchor="bottom-right"
      longitude={this.state.popupInfo.state.longitude}
      latitude={this.state.popupInfo.state.latitude}
      onClose={() => this.setState({popupInfo: null})}
      closeOnClick={true}>
 
    </Popup>
  )
}
  render() {
    const {viewport} = this.state;
    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={TOKEN} >
        {this.renderPopup()}
        <div className="nav" style={navStyle}>
          <NavigationControl/>
          </div>
      </MapGL>
    )
  }
}
