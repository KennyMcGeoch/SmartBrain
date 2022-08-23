import './App.css';
import 'tachyons';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Registration/Registration';
import Particles from "react-tsparticles";
import { Component } from 'react/cjs/react.production.min';
// import eslintConfigReactApp from 'eslint-config-react-app';


const initialState = {
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
class App extends Component {
  
  constructor() {
    super();
    this.state = initialState;
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
    this.setState({imageUrl: this.state.input});
    fetch('https://lit-meadow-09763.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
      .then(response => {
        console.log('hi', response)
        if (response) {
          fetch('https://lit-meadow-09763.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
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
