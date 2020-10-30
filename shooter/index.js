import { Screen } from "./modules/Screen.js";
import { Vector2 } from "./modules/System.js";
import { Keyboard, Mouse } from "./modules/Controllers.js";

const $ = document

class Player {
  constructor(coord, size, color, velocity) {
    this.coord = coord
    this.size = size
    this.color = color
    this.velocity = velocity
  }
  
  Update(data) {
    const keys = data.keys
    if (keys.up) {
      this.coord.y -= this.velocity.y
    } else if (keys.down) {
      this.coord.y += this.velocity.y
    }

    if (keys.right) {
      this.coord.x += this.velocity.x
    } else if (keys.left) {
      this.coord.x -= this.velocity.x
    }
  }

  Draw(screen) {
    const ctx = screen.ctx
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.shadowBlur = 6
    ctx.shadowColor = "#af1313"
    ctx.arc(this.coord.x, this.coord.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
    ctx.restore()
  }
}

const screen = new Screen($.querySelector("canvas#main"))
screen.Resize(innerWidth, innerHeight)
screen.SetBackground("black")

const p = new Player(screen.origin, 25, "#a80707", new Vector2(4, 4))
screen.AddComponent(p)


const keys = new Keyboard()
keys.Connect(window)
const mouse = new Mouse()
mouse.Connect(window)

function frame() {
  if (keys.escape) {
    return
  }
  screen.Update({ keys, mouse })
  screen.Draw()
  requestAnimationFrame(frame)
}

frame()
