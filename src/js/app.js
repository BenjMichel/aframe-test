import 'aframe';
import 'babel-polyfill';
require('file?name=[name].[ext]!../index.html');
import {Animation, Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

const socket = io();
// const socket = io.connect();

import Camera from './components/Camera';
import Cursor from './components/Cursor';
import Sky from './components/Sky';

class BoilerplateScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red'
    }

    document.addEventListener('keydown', (event) => {
      const keyName = event.key;

      if (keyName === 'Control') {
        // not alert when only Control key is pressed.
        return;
      }

      if (event.ctrlKey) {
        // Even though event.key is not 'Control' (i.e. 'a' is pressed),
        // event.ctrlKey may be true if Ctrl key is pressed at the time.
        alert(`Combination of ctrlKey + ${keyName}`);
      } else {
        console.log(`Key pressed ${keyName}`);
        socket.emit('move', keyName);
      }
    }, false);

    socket.on('move', function (data) {
      console.log('move', data);
    });
  }

  changeColor = () => {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  };

  render () {
    return (
      <Scene>
        <Camera />

        <Sky/>

        <Entity light={{type: 'ambient', color: '#888'}}/>
        <Entity light={{type: 'directional', intensity: 0.5}} position={[-1, 1, 0]}/>
        <Entity light={{type: 'directional', intensity: 1}} position={[1, 1, 0]}/>

        <Entity geometry="primitive: box" material={{color: this.state.color}}
                onClick={this.changeColor}
                position="0 0 -5">
          <Animation attribute="rotation" dur="5000" repeat="indefinite" to="0 360 360"/>
        </Entity>
      </Scene>
    );
  }
}

ReactDOM.render(<BoilerplateScene/>, document.querySelector('.scene-container'));
