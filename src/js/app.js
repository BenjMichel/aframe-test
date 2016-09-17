import 'aframe';
import 'babel-polyfill';
require('file?name=[name].[ext]!../index.html');
import {Animation, Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

const socket = io();

import Camera from './components/Camera';
import Cursor from './components/Cursor';
import Sky from './components/Sky';

class BoilerplateScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      camera : { x: 0, y: 0, z: 0 },
    };

    document.addEventListener('keydown', (event) => {
      const keyName = event.key;

      if (keyName === 'Control') {
        // not alert when only Control key is pressed.
        return;
      }

      if (event.ctrlKey) {
        // Even though event.key is not 'Control' (i.e. 'a' is pressed),
        // event.ctrlKey may be true if Ctrl key is pressed at the time.
        console.log(`Combination of ctrlKey + ${keyName}`);
      } else {
        this.handleKey(keyName);
      }
    }, false);

  }

  componentDidMount() {
     socket.on('move', (data) => {
       this.setState({ camera: data.camera });
     });
  }

  handleKey(keyName) {
    let newCamera = this.state.camera;
    if (keyName === 'ArrowUp') {
      newCamera = { ...this.state.camera, y: this.state.camera.y - 1 };
    } else if (keyName === 'ArrowDown') {
      newCamera = { ...this.state.camera, y: this.state.camera.y + 1 };
    } else if (keyName === 'ArrowRight') {
      newCamera = { ...this.state.camera, x: this.state.camera.x + 1 };
    } else if (keyName === 'ArrowLeft') {
      newCamera = { ...this.state.camera, x: this.state.camera.x - 1 };
    } else {
      return;
    }
    this.setState({ camera: newCamera });
    socket.emit('move', { camera: newCamera });
  }

  formatPosition() {
    return `${this.state.camera.x} ${this.state.camera.y} ${this.state.camera.z}`
  }

  render () {
    return (
      <Scene>
        <Camera position={this.formatPosition()} />
        <Sky/>
        <Entity light={{type: 'directional', intensity: 0.5}} position={[-1, 1, 0]}/>
        <Entity light={{type: 'directional', intensity: 1}} position={[1, 1, 0]}/>
        <a-sphere position="0 10 -10" radius="1.25" color="#EF2D5E"></a-sphere>
      </Scene>
    );
  }
}

ReactDOM.render(<BoilerplateScene/>, document.querySelector('.scene-container'));
