import './App.css';
import 'tachyons';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Registration/Registration';
import Clarifai from 'clarifai';
import Particles from "react-tsparticles";
import { Component } from 'react/cjs/react.production.min';
// import eslintConfigReactApp from 'eslint-config-react-app';


const app = new Clarifai.App({
  apiKey: 'ba619e535c3d41568ea89cf92ceb3916'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  
  }

  

  onButtonSubmit = () => {
    console.log("click");
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(
        {
          id: "a403429f2ddf4b49b307e318f00e528b",
        },
        //Cant use imageUrl
        this.state.input
      )
      .then(
        function (response) {
          console.log(
            response.outputs[0].data.regions[0].region_info.bounding_box
          );
        },
        function (err) {
          //there was an error
        }
      );
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
  return (
    <div className="App">
      <Particles options={particleOpts}/>
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          : (
             route === 'signin'
             ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
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
