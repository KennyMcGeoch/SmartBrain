import './App.css';
import 'tachyons';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Clarifai from 'clarifai';
import Particles from "react-tsparticles";
import { Component } from 'react/cjs/react.production.min';
import eslintConfigReactApp from 'eslint-config-react-app';


const app = new Clarifai.App({
  apiKey: 'ba619e535c3d41568ea89cf92ceb3916'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  
  }

  onButtonSubmit = () => {
    app.models
      .predict(
        Clarifai.COLOR_MODEL,
        "https://samples.clarifai.com/face-det.jpg")
      .then(
      function(response) {
        console.log(response);
      },
      function(err){

      }

    );

  }

  render() {
  return (
    <div className="App">
      <Particles options={particleOpts}/>
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
      {/* <FaceRecognition /> */}
    </div>
  );
  }
}

const particleOpts = {
  fullScreen: {
    enable: true,
    zIndex: -1
  },
  background: {
    image:
      "url(https://img4.goodfon.com/original/1920x1080/d/b1/abstract-dark-blue-polygonal-background-abstraktsiia-geometr.jpg?d=1)"
  },
  backgroundMask: {
    enable: true
  },
  fpsLimit: 60,
  emitters: {
    direction: "random",
    size: {
      width: 100,
      height: 100
    },
    position: {
      x: 50,
      y: 50
    },
    rate: {
      delay: 0.25,
      quantity: 2
    }
  },
  particles: {
    number: {
      value: 0
    },
    color: {
      value: ["#fff"]
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.5
    },
    size: {
      value: 200,
      anim: {
        enable: true,
        speed: 50,
        size_min: 2,
        sync: true,
        startValue: "min",
        destroy: "max"
      }
    },
    move: {
      enable: true,
      speed: 5,
      direction: "none",
      random: false,
      straight: false,
      outModes: {
        default: "destroy"
      },
      attract: {
        enable: true,
        distance: 250,
        rotateX: 600,
        rotateY: 1200
      }
    },
    stroke: {
      width: 10,
      opacity: 1
    }
  },
  interactivity: {
    detectsOn: "canvas",
    events: {
      resize: true
    }
  },
  detectRetina: true
}

export default App;
