var Snake = (function(root) {

    const nodeSize = 10;
    const directions = {
        RIGHT: "right",
        LEFT: "left",
        DOWN: "down",
        UP: "up",
        STATIC: "not moving"
    }

    const section = {
        HEAD: 'head',
        BODY: 'body',
        TAIL: 'tail'
    }

    // start();
    var snakeSprite = {
        headUp: new Image(),
        headDown: new Image(),
        headLeft: new Image(),
        headRight: new Image(),
        body: new Image(),
        tailRight: new Image(),
        tailLeft: new Image(),
        tailUp: new Image(),
        tailDown: new Image()
    }

    // Get snake pointing in all four directions
    snakeSprite.body.src = "./img/sprites/Body.png";
    snakeSprite.headUp.src = "./img/sprites/up.png";
    snakeSprite.headDown.src = "./img/sprites/down.png";
    snakeSprite.headLeft.src = "./img/sprites/left.png";
    snakeSprite.headRight.src = "./img/sprites/right.png";

    var Node = function(x, y) {
        // Pointer.
        this.next;
        this.prev;

        // Data.
        this.x = x;
        this.y = y;

        // Movement indicator.
        this.direction = directions.RIGHT; // right, 
    }

    var Snake = function(x, y) {
        this.size = 1;
        this.timer = 0;

        // Initiate the head and tail.
        this.head = new Node(x, y);
        this.head.next = null;
        this.head.section = section.HEAD;

        this.tail = new Node(-12, -12);
        this.tail.v = null;
        this.tail.next = this.head;

        this.head.prev = this.tail;
    }

    /**
     * Add a node at the end of the snake.
     * @return {[type]} [description]
     */
    Snake.prototype.append = function() {

        var xOffset = this.getXoffset();
        var yOffset = this.getYoffset();

        if (!this.hasBody()) {
            let newNode = new Node(
                this.head.x + (nodeSize * xOffset), this.head.y + (nodeSize * yOffset), this.id++
            );
            newNode.section = section.TAIL;
            this.tail.next = newNode;
            newNode.next = this.head;
            newNode.prev = this.tail;
            this.tail.prev = null;
            this.head.prev = newNode;
        } else {
            let lastNode = this.tail.next;

            let newNode = new Node(
                lastNode.x + (nodeSize * xOffset), lastNode.y + (nodeSize * yOffset), this.id++
            );

            newNode.section = section.TAIL;
            lastNode.prev = newNode;
            newNode.next = lastNode;
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail.next.next.section = section.BODY;

        }

        this.size++;
    }

    Snake.prototype.hasBody = function() {
        return this.size > 1;
    }

    Snake.prototype.deleteLast = function() {

        if (this.size == 1)
            return;

        // Get the last node.
        var temp = this.tail.next;

        this.tail.next.next.section = section.TAIL;
        this.tail.next.next.prev = this.tail;
        this.tail.next = this.tail.next.next;
        return temp;
    }


    Snake.prototype.addToFront = function(node) {

        var xOffset;
        var yOffset;
        xOffset = this.getXoffset() * -1;
        yOffset = this.getYoffset() * -1;
        var newNode = new Node(this.head.x + (nodeSize * xOffset), this.head.y + (nodeSize * yOffset), 'head');

        // if the snake has no body.
        if (this.size == 1) {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            newNode.direction = this.head.direction;
            this.head = newNode;
            this.head.section = section.HEAD;
            return;
        }

        // Give the new node the 'head' property.
        newNode.section = section.HEAD;
        // Give the head the 'body' property.
        this.head.section = section.BODY;

        // Set the head to point to the new node.
        this.head.next = newNode;
        // And the new node to point back to the head.
        newNode.prev = this.head;
        // Update the direction.
        newNode.direction = this.head.direction;
        // Set the new node as the head.
        this.head = newNode;
    }

    Snake.prototype.move = function() {
        this.deleteLast();
        this.addToFront();
    }

    Snake.prototype.update = function(delta) {

        /// Check the edges. 
        Snake.traverseSnake(this.head, (node) => {
            if (node.x > canvas.width) {
                node.x = 0;
            }
            if (node.x < 0) {
                node.x = canvas.width;
            }
            if (node.y > canvas.height) {
                node.y = 0;
            }
            if (node.y < 0) {
                node.y = canvas.height;
            }
        });
    }

    /**
     * Draw each of the snake's cells. 
     * @param  {[type]} inter [description]
     * @return {[type]}       [description]
     */
    Snake.prototype.draw = function(inter) {
        ctx.strokeStyle = '#3f3d3d';
        Snake.traverseSnake(this.head, (node) => {
            var img;
            // Head
            if (node.section == section.HEAD) {
                switch (node.direction) {
                    case directions.RIGHT:
                        img = snakeSprite.headRight;
                        break;
                    case directions.LEFT:
                        img = snakeSprite.headLeft;
                        break;
                    case directions.UP:
                        img = snakeSprite.headUp;
                        break;
                    case directions.DOWN:
                        img = snakeSprite.headDown;
                        break;
                }
                // BODY
            } else
                img = snakeSprite.body;

            ctx.drawImage(img, node.x, node.y, nodeSize, nodeSize);
        });
    }

    /**
     * Traverses the snake. 
     * @param  {[type]} head   [description]
     * @param  {[type]} action [description]
     * @return {[type]}        [description]
     */
    Snake.traverseSnake = function(head, action) {
        var currentNode = head;
        while (currentNode != null) {
            action(currentNode);
            currentNode = currentNode.prev;
        }
    }


    Snake.prototype.moveDown = function() {
        if (this.head.x == this.tail.next.x && this.size > 1) {
            // console.log('snake ate it self')
            return -1;
        }
        if (this.head.direction != directions.UP)
            this.head.direction = directions.DOWN;

    }

    Snake.prototype.moveUp = function() {
        if (this.head.x == this.tail.next.x && this.size > 1) {
            // console.log('snake ate it self')
            return -1;
        }
        if (this.head.direction != directions.DOWN)
            this.head.direction = directions.UP;
    }

    Snake.prototype.moveRight = function() {
        if (this.head.y == this.tail.next.y && this.size > 1) {
            // console.log('snake ate it self')
            return -1;
        }
        if (this.head.direction != directions.LEFT)
            this.head.direction = directions.RIGHT;
    }

    Snake.prototype.moveLeft = function() {
        if (this.head.y == this.tail.next.y && this.size > 1) {
            // console.log('snake ate it self')
            return -1;
        }
        if (this.head.direction != directions.RIGHT)
            this.head.direction = directions.LEFT;
    }
    // Returns the offset needed to add a new node to the snake's body
    // e.i., if the snake is going left, you need to add one node width; 
    // if the snake is going right, you need to subtract one node width. 
    Snake.prototype.getXoffset = function() {
        if (this.head.direction == directions.RIGHT)
            return -1;
        if (this.head.direction == directions.LEFT)
            return 1;
        if (this.head.direction == directions.UP || this.head.direction == directions.DOWN)
            return 0;

    }

    Snake.prototype.getYoffset = function() {
        if (this.head.direction == directions.DOWN)
            return -1;
        if (this.head.direction == directions.UP)
            return 1;
        if (this.head.direction == directions.RIGHT || this.head.direction == directions.LEFT)
            return 0;
    }

    Snake.prototype.collision = function() {
        var currentNode = this.head.prev;
        while (currentNode != null) {

            if (this.head.x < currentNode.x + nodeSize &&
                this.head.x + nodeSize > currentNode.x &&
                this.head.y < currentNode.y + nodeSize &&
                this.head.y + nodeSize > currentNode.y) {

                return true;
            }
            currentNode = currentNode.prev;
        }

        return false;
    }

    Snake.prototype.ate = function(food) {
        // console.log(food.x + " " + food.y)
        if (this.head.x < food.x + nodeSize &&
            this.head.x + nodeSize > food.x &&
            this.head.y < food.y + nodeSize &&
            this.head.y + nodeSize > food.y) {

            return true;
        }
    }

    return Snake;
}(this));