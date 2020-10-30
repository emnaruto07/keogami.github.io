import { Coord } from "./System.js"

class Keyboard {
  constructor() {
    this.up = this.down = this.right = this.left = this.escape = false
  }
  Connect(element) {
    element.addEventListener("keydown", (ev) => {
      if (ev.key === "w") {
        this.up = true
      } else if (ev.key === "s") {
        this.down = true
      } else if (ev.key === "d") {
        this.right = true
      } else if (ev.key === "a") {
        this.left = true
      }
    })
    
    element.addEventListener("keyup", (ev) => {
      if (ev.key === "w") {
        this.up = false
      } else if (ev.key === "s") {
        this.down = false
      } else if (ev.key === "d") {
        this.right = false
      } else if (ev.key === "a") {
        this.left = false
      }
    })
  }
}

class Mouse {
  constructor() {
    this.coord = new Coord(0, 0)
  }

  Connect(element) {
    element.addEventListener("mousemove", (ev) => {
      this.coord.x = ev.clientX
      this.coord.y = ev.clientY
    })
  }
}

export { Keyboard, Mouse }