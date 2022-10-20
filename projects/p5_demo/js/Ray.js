var Ray = function(angle, startPos, map, tileSize, windowWidth, windowHeight) {
    this.wHeight = windowHeight;
    this.windowWidth = windowWidth;
    this.tileSize = tileSize;
    this.angle = angle;
    this.angle = this.angle % (2 * Math.PI);
    this.wallHit;
    this.wallHitDist;

    if (this.angle < 0)
        this.angle = (2 * Math.PI) + this.angle;

    this.startPos = startPos;
    this.map = map;

    this.direction = new Vector(
        Math.cos(this.angle),
        Math.sin(this.angle),
        0
    );

    this.wallHitX = 0;
    this.wallHitY = 0;
    this.distance = 0;
    // console.log(angle);

    // Check the direction of the ray.
    this.directionDown = this.angle > 0 && this.angle < Math.PI;
    this.directionRight = this.angle < (Math.PI * 0.5) || this.angle > (Math.PI * 1.5);
}

Ray.prototype.render = function() {
    var lineLength = 100;
    stroke("rgba(201, 201, 201, 0.3)");
    line(
        MAP_SCALER * this.startPos.x,
        MAP_SCALER * this.startPos.y,
        MAP_SCALER * this.wallHit.x,
        MAP_SCALER * this.wallHit.y
    );
}

Ray.prototype.update = function() {

}

Ray.prototype.cast = function() {
    var xIntercept, yIntercept;
    var intersection = new Vector(0, 0, 0);
    var xStexp, yStep;

    ////////////////////////////////
    /// HORIZONTAL INTERCECTIONS ///
    ////////////////////////////////
    // Find the x and y values of the closest grid intersection.
    intersection.y = Math.floor(this.startPos.y / this.tileSize) * this.tileSize;
    intersection.y += this.directionDown ? this.tileSize : 0;

    intersection.x = this.startPos.x +
        (intersection.y - this.startPos.y) /
        Math.tan(this.angle);

    // Get xStep and yStep
    yStep = this.tileSize;
    xStep = this.tileSize / Math.tan(this.angle);

    /// Horizontal intersections
    var dy = 0.01;
    var foundWallHor;
    yStep *= !this.directionDown ? -1 : 1;
    xStep *= (!this.directionRight && xStep > 0) ? -1 : 1;
    xStep *= (this.directionRight && xStep < 0) ? -1 : 1;

    var hIntercection = intersection.get();

    // Push the intersection into the grid cell.
    if (!this.directionDown)
        hIntercection.y -= dy;

    var horizontalWall = new Vector(0, 0);
    while (hIntercection.x > 0 && hIntercection.x <= this.windowWidth && hIntercection.y > 0 && hIntercection.y <= this.wHeight) {
        if (this.map.hasWall(hIntercection.x, hIntercection.y)) {
            foundWallHor = true;
            horizontalWall.set(hIntercection.x, hIntercection.y, 0);

            break;
        } else {
            hIntercection.x += xStep;
            hIntercection.y += yStep;
        }
    }



    ////////////////////////////////
    /// VERTICAL INTERCECTIONS   ///
    ////////////////////////////////

    // Find the x and y values of the closest grid intersection.
    intersection.x = Math.floor(this.startPos.x / this.tileSize) * this.tileSize;
    intersection.x += this.directionRight ? this.tileSize : 0;

    intersection.y = this.startPos.y +
        (intersection.x - this.startPos.x) *
        Math.tan(this.angle);

    // Get xStep and yStep
    xStep = this.tileSize;
    xStep *= !this.directionRight ? -1 : 1;

    /// Horizontal intersections
    var dx = 0.01;
    var foundWallVer;

    yStep = this.tileSize * Math.tan(this.angle);
    yStep *= (!this.directionDown && yStep > 0) ? -1 : 1;
    yStep *= (this.directionDown && yStep < 0) ? -1 : 1;

    // The vertical intersection.
    var vIntercection = intersection.get();

    // Push the intersection into the grid cell.
    if (!this.directionRight)
        vIntercection.x -= dx;

    var verticalWall = new Vector(0, 0);
    while (vIntercection.x > 0 && vIntercection.x <= this.windowWidth && vIntercection.y > 0 && vIntercection.y <= this.wHeight) {
        if (this.map.hasWall(vIntercection.x, vIntercection.y)) {
            foundWallVer = true;
            verticalWall.set(vIntercection.x + dx, vIntercection.y, 0);

            break;
        } else {
            vIntercection.x += xStep;
            vIntercection.y += yStep;
        }
    }

    if (verticalWall.mag() == 0)
        verticalWall.set(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);

    if (horizontalWall.mag() == 0)
        horizontalWall.set(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);

    this.wallHit = _minDistance(this.startPos, verticalWall, horizontalWall);
    this.wallHitDist = Vector.distance(this.wallHit, this.startPos);

}




function _minDistance(player, vertical, horzontal) {

    var verDist = player.dist(vertical);
    var horDist = player.dist(horzontal);
    return (verDist < horDist) ? vertical : horzontal;
}