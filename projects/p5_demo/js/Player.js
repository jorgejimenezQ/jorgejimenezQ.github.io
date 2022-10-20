var Player = function(x, y, map) {
    this.position = new Vector(x, y);
    this.size = 9;
    this.turning = 0; // -1 walking back, 1 walking forward.
    this.walking = 0; // -1 walking back, 1 walking forward.
    this.rotationAngle = Math.PI / 2;
    this.moveSpeed = 10.0;
    this.rotationSpeed = 2 * (Math.PI / 180);
    this.direction = new Vector(Math.cos(this.rotationAngle), Math.sin(this.rotationAngle), 0);
    this.map = map;
}

Player.prototype.update = function() {
    _rotate(this);
    _walk(this);
}


Player.prototype.draw = function() {
    fill("red");
    circle(
        MAP_SCALER * this.position.x,
        MAP_SCALER * this.position.y,
        MAP_SCALER * this.size
    );

    //   var length = 100;
    // stroke("red");
    // line(this.position.x, this.position.y,
    //     this.position.x + this.direction.x * length,
    //     this.position.y + this.direction.y * length
    // );
}


// Private helpers
// 

/**
 * Updates the direction angle.
 * 
 * @private
 * @return {[type]} [description]
 */
function _rotate(player) {
    player.rotationAngle += player.turning * player.rotationSpeed;
    player.direction.set(Math.cos(player.rotationAngle), Math.sin(player.rotationAngle), 0);
}

/**
 *  Updates the player position.
 * 
 * @private 
 * @return {[type]} [description]
 */
function _walk(player) {

    var displacement = player.direction.get();
    displacement.normalize();
    displacement.mult(player.moveSpeed);
    displacement.mult(player.walking);


    // Collision detection using the map object passed in the constructor.
    var temp = player.position.get();
    temp.add(displacement);

    var x = Math.trunc(temp.x / player.map.size);
    var y = Math.trunc(temp.y / player.map.size);

    // console.log(x + " " + y);
    var hasWall = player.map.grid[player.map.width * y + x];

    if (!hasWall)
        player.position = temp;

}