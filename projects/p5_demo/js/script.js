/**
 * @description Skeleton for the p5.js api.
 * @author Jorge Jimenez
 */

const tileSize = 32
const numOfRows = 20
const numOfCols = 25
const WIDTH = tileSize * numOfCols
const HEIGHT = tileSize * numOfRows
const FOVAngle = 60 * (Math.PI / 180)
const wallWidth = 1
const numOfRays = WIDTH / wallWidth
const MAP_SCALER = 0.2

var grid = new WorldMap(numOfCols, numOfRows, tileSize, true)
grid.addWall(400, 500)
grid.addWall(420, 500)
grid.addWall(430, 500)
grid.addWall(440, 500)
grid.addWall(450, 500)
grid.addWall(400, 510)
grid.addWall(400, 520)
grid.addWall(400, 540)
grid.addWall(400, 580)
var player = new Player(WIDTH / 2, HEIGHT / 2, grid)
var rays = []

function setup() {
  createCanvas(WIDTH, HEIGHT)
  background('#212121')
}

function update() {
  player.update()
  castRays()

  // Add remove walls.
  if (keyIsDown(CONTROL)) {
    grid.addWall(mouseX, mouseY)
    console.log(mouseX + ' ' + mouseY)
  }

  if (keyIsDown(SHIFT)) {
    grid.removeWall(mouseX, mouseY)
  }
}

function draw() {
  clear('gray')
  background('gray')

  update()

  render3d()

  grid.draw()

  for (ray of rays) {
    ray.render()
  }
  player.draw()
}

function mouseClicked() {
  grid.addWall(mouseX, mouseY)
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    player.walking = 1
  } else if (keyCode == DOWN_ARROW) {
    player.walking = -1
  } else if (keyCode == LEFT_ARROW) {
    player.turning = -1
  } else if (keyCode == RIGHT_ARROW) {
    player.turning = 1
  }
}

function keyReleased() {
  if (keyCode == UP_ARROW) {
    player.walking = 0
  } else if (keyCode == DOWN_ARROW) {
    player.walking = 0
  } else if (keyCode == LEFT_ARROW) {
    player.turning = 0
  } else if (keyCode == RIGHT_ARROW) {
    player.turning = 0
  }
}

function castRays() {
  var angle = player.rotationAngle - FOVAngle / 2
  var angleIncrement = FOVAngle / numOfRays

  rays = []

  for (let i = 0; i < numOfRays; i++) {
    // for (let i = 0; i < 1; i++) {
    var ray = new Ray(angle, player.position, grid, tileSize, WIDTH, HEIGHT)
    ray.cast()

    rays.push(ray)
    angle += angleIncrement
  }
}

function render3d() {
  for (var i = 0; i < numOfRays; i++) {
    var ray = rays[i]
    var rayDist = ray.wallHitDist
    // console.log(player.rotationAngle)
    rayDist *= Math.cos(ray.angle - player.rotationAngle)

    var distProjPlane = WIDTH / 2 / Math.tan(FOVAngle / 2)
    var wallHeight = (tileSize / rayDist) * distProjPlane

    var alpha = 70 / rayDist
    fill('rgba(255, 255, 255, ' + alpha + ')')
    noStroke()
    rect(i * wallWidth, HEIGHT / 2 - wallHeight / 2, wallWidth, wallHeight)
  }
}
