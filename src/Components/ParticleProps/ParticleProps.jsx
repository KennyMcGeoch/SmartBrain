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

  export default particleOpts