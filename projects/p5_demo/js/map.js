/**
 * Map
 */

/**
 * A map api that holds a grid of 1 or 0. 1 represents a wall and 0 a hall.
 * 
 *  
 * @param {[type]} width  [description]
 * @param {[type]} height [description]
 */
var WorldMap = function(width, height, size, perimeterWall = false) {
    this.size = size;
    this.width = width;
    this.height = height;
    this.grid = new Array();
    this.perimeterWall = perimeterWall;

    var numCells = this.width * this.height;

    // console.log(numCells);
    // console.log(width)
    // console.log(height)

    for (let i = 0; i < numCells; i++) {
        var perimeterCheck = (i % this.width) == 0 ||
            (i >= 0 && i < this.width) ||
            (i >= (numCells - this.width)) ||
            (i % this.width) == this.width - 1;


        if (this.perimeterWall && perimeterCheck) {
            this.grid.push(perimeterCheck);
        } else
            this.grid.push(false);

    }

    // console.log(this.grid);
    // console.log(this.grid);
}

WorldMap.prototype.addWall = function(x, y) {
    x = Math.trunc(x / this.size);
    y = Math.trunc(y / this.size);

    // console.log(x + " " + y);
    this.grid[this.width * y + x] = true;
    // console.log(this.grid[this.width * y + x])
}

// TODO: fix overlap when adding on edges. 
WorldMap.prototype.removeWall = function(x, y) {
    x = Math.trunc(x / this.size);
    y = Math.trunc(y / this.size);

    // console.log(x + " " + y);
    this.grid[this.width * y + x] = false;
    // console.log(this.grid[this.width * y + x])
}

WorldMap.prototype.hasWall = function(x, y) {
    x = Math.trunc(x / this.size);
    y = Math.trunc(y / this.size);
    return this.grid[this.width * y + x];
}

WorldMap.prototype.draw = function() {
    var s = "";
    for (var y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
            if (this.grid[this.width * y + x]) {
                s += "1 ";
            } else {
                s += "0 ";
            }

            var color = this.grid[this.width * y + x] ? "#2F4F4F" : "black";
            stroke(color);
            fill(color);
            rect(
                MAP_SCALER * (x * this.size),
                MAP_SCALER * (y * this.size),
                MAP_SCALER * this.size,
                MAP_SCALER * this.size
            );
        }
        s += "\n";
    }

    // console.log(s);

}