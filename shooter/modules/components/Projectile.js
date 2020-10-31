import { Vector2 } from "../System.js"

class Projectile {
  constructor(coord, color, size, velocity) {
    this.coord = coord.Clone()
    this.color = color
    this.size = size
    this.velocity = velocity
  }

  Update({ screen }) {
    this.coord.x += this.velocity.x
    this.coord.y += this.velocity.y

    if (!screen.InBound(this.coord)) {
      screen.GetComponent("projectiles").Remove(this)
    }

    for (let enemy of screen.GetComponent("enemies").All()) {
      const max = (this.size + enemy.size)

      if (Vector2.Dist(enemy.coord, this.coord) <= max) {
        enemy.Hit()
        screen.GetComponent("projectiles").Remove(this)
      }
    }
  }

  Draw({ ctx }) {
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = ctx.shadowColor = this.color
    ctx.shadowBlur = this.size / 4
    ctx.arc(this.coord.x, this.coord.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
    ctx.restore()
  }
}

export { Projectile }