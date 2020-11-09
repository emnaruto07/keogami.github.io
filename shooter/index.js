import { Screen } from "./modules/Screen.js";
import { Vector2, InfoDict } from "./modules/System.js";
import { Keyboard, Mouse } from "./modules/Controllers.js";
import { Player, Reticle, Projectile, Enemy, ComponentSet } from "./modules/Components.js"
import { Game } from "./modules/Game.js"

const $ = document
const DEBUG = false

const putInfo = ((el) => (it) => {
  return el.innerText = it
})($.querySelector("div#info-pane"))

const screen = new Screen($.querySelector("canvas#main"))
screen.Resize(innerWidth, innerHeight)
screen.SetBackground("#07020b")

const player = new Player(screen.origin, 25, "#a80707", new Vector2(8, 8))
screen.AddComponent("player", player)

const reticle = new Reticle(screen.origin, "blue", 15)
screen.AddComponent("reticle", reticle)

const projectiles = new ComponentSet()
screen.AddComponent("projectiles", projectiles)

const enemies = new ComponentSet()
screen.AddComponent("enemies", enemies)

setInterval(() => {
  if (enemies._components.size > 5) {
    return
  }
  enemies.Add(new Enemy(screen.RandomCoord({outside: true}), "brown", 35, new Vector2(0, 0), enemies))
}, 1000)

addEventListener('click', (ev) => {
  const vel = Vector2.Slope(player.coord, reticle.coord).Scale(16)
  projectiles.Add(new Projectile(player.coord, "pink", 8, vel, 3))
})


const keys = new Keyboard()
keys.Connect(window)
const mouse = new Mouse()
mouse.Connect(window)
const info = new InfoDict()
let timeAVG = 0
let FPS = 0

const game = new Game()
game.state = Game.STATE_RUNNING

const scoreboard = $.querySelector("div#scoreboard")
const printScore = (val) => {
  scoreboard.innerHTML = "KP=" + val.toString().padStart(16, "0")
}
game.onScoreUpdate = printScore

function frame({ timestamp, elapsedTime}) {
  // Update and draw the screen
  screen.Update({ game, keys, mouse, elapsedTime, timestamp, screen })
  screen.Draw()
  if (keys.escape || game.state === Game.STATE_END) {
    const animTime = 1000
    setTimeout(() => {
      setTimeout(() => {
        scoreboard.classList.add("center")
      }, animTime * 0.85)
      requestAnimationFrame(screen.ClearAnimation(player.coord, "#07020b45", animTime))
    }, 100)

    setInterval(printScore, 100, game.score) // to prevent people from changing score manually
    return
  }

  // if debug data is required, calculate it and print it
  if (DEBUG) {
    timeAVG += elapsedTime.value
    timeAVG /= 2
    FPS = Math.round(1000 / timeAVG)
    info.Set("Mouse-X", mouse.coord.x)
    info.Set("Mouse-Y", mouse.coord.y)
    info.Set("FPS", FPS)
    info.Set("Elapsed", `${elapsedTime.value}ms`)
    putInfo(info.String("\n"))
  }
 
}

game.Run(frame)
