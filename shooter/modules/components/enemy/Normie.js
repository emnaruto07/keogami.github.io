import { Enemy } from "./Enemy.js"

class Normie extends Enemy {
  constructor(coord, compSet) {
    super(coord, "brown", 35, 5, 5, 20, 10, compSet)
  }
}

export { Normie }