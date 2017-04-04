class Node {
    constructor(x, y, row, col) {
        this.circle = new createjs.Shape();
        this.circle.graphics.beginFill("#3f74cc").drawCircle(x, y, 20);
        this.circle.x = x;
        this.circle.y = y;
        this.row = row;
        this.col = col;
        this.circle.addEventListener("mouseover", this.bfs.bind(this));
        this.circle.addEventListener("click", this.bfs.bind(this));
        STAGE.addChild(this.circle); 
        STAGE.update();           
    }

    bfs(event) {
        GQUEUE = [];
        var circle = event.target;
        var visited = zeros([WORLD.length,WORLD[0].length]);
        var queue = [];
        var self = WORLD[this.row][this.col];
        queue.push(self)
        while(queue.length > 0) {
            var current = queue.shift();
            GQUEUE.push(current);
            visited[current.row][current.col] = true;

            //TODO Refactor This
            if(checkBounds(current.row-1,current.col-1) && !visited[current.row-1][current.col-1]) {
                visited[current.row-1][current.col-1] = true;
                queue.push(WORLD[current.row-1][current.col-1]);
            }
            if(checkBounds(current.row+1,current.col+1) && !visited[current.row+1][current.col+1]) {
                visited[current.row+1][current.col+1] = true;
                queue.push(WORLD[current.row+1][current.col+1]);
            }
            if(checkBounds(current.row,current.col-1) && !visited[current.row][current.col-1]) {
                visited[current.row][current.col-1] = true;
                queue.push(WORLD[current.row][current.col-1]);
            }
            if(checkBounds(current.row-1,current.col) && !visited[current.row-1][current.col]) {
                visited[current.row-1][current.col] = true;
                queue.push(WORLD[current.row-1][current.col]);
            }
            if(checkBounds(current.row+1,current.col) && !visited[current.row+1][current.col]) {
                visited[current.row+1][current.col] = true;
                queue.push(WORLD[current.row+1][current.col]);
            }
            if(checkBounds(current.row,current.col+1) && !visited[current.row][current.col+1]) {
                visited[current.row][current.col+1] = true;
                queue.push(WORLD[current.row][current.col+1]);
            }
            if(checkBounds(current.row+1,current.col-1) && !visited[current.row+1][current.col-1]) {
                visited[current.row+1][current.col-1] = true;
                queue.push(WORLD[current.row+1][current.col-1]);
            }
            if(checkBounds(current.row-1,current.col+1) && !visited[current.row-1][current.col+1]) {
                visited[current.row-1][current.col+1] = true;
                queue.push(WORLD[current.row-1][current.col+1]);
            }
        }
    }

    changeSelf() {
        var circle = this.circle;
        circle.graphics.beginFill(getRandomPastel()).drawCircle(circle.x, circle.y, 20);
        STAGE.update();
    }
}

function getRandomInt(int) {
    return Math.floor(Math.random() * int);
}

function getRandomColor() {
    var color = "rgba("+getRandomInt(255)+","+getRandomInt(255)+","+getRandomInt(255)+",0.7)";
    return color;
}

function getRandomPastel() {
    // http://www.color-hex.com/color-palette/35674
    var colors = ["	#a5d8d7","#82b8d2","#6686c9","#655ccc","#6238b6"]
    return colors[getRandomInt(colors.length)];
}

//Globals baby
STAGE = undefined;
WORLD = [];
GQUEUE = [];

function update() {
    if(GQUEUE.length > 0) {
        var current = GQUEUE.shift();
        current.changeSelf();
    }
}

function checkBounds(a,b) {
    if(a < 0 || b < 0 || a >= WORLD.length || b >= WORLD[0].length) {
        return false;
    }
    return true;
}

function zeros(dimensions) {
    /* Written by http://stackoverflow.com/a/3689926 John Kugelman 
    (http://stackoverflow.com/users/68587/john-kugelman) (CC-BY-SA 3.0)*/
    var array = [];
    for (var i = 0; i < dimensions[0]; ++i) {
        array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
    }
    return array;
}

function init() {
    setup()
    setInterval(update,1000/30);    
}

function setup() {
    WORLD = [];
    GQUEUE = [];
    window.addEventListener('resize', setup);
    document.getElementById("down-arrow").addEventListener('click', setup);

    // var dpi= window.devicePixelRatio;
    var dpi = 2;
    var width = window.innerWidth;
    var height = 500;

    var canvas=document.querySelector('#header-canvas');    
    canvas.setAttribute("width",width*dpi);
    canvas.setAttribute("height",height*dpi);
    STAGE = new createjs.Stage(canvas);
    STAGE.enableMouseOver(60);
    
    // var shape_rect = new createjs.Shape();
    // shape_rect.graphics.beginFill("#5495ff").drawRect(0, 0, width*dpi, height*dpi); //Draw initial rectangle
    // STAGE.addChild(shape_rect);    

    var spacebetween = 50;
    var startx = (width % 50 + 50 ) / 2;
    var row = 0;
    var col = 0;
    for(var x = startx; x < width; x += spacebetween) {
        WORLD.push([]);
        for(var y = spacebetween; y < height; y += spacebetween) {
            var circle = new Node(x,y,row,col);
            WORLD[row].push(circle);
            col++;        
        }
        col = 0;
        row++;
    }
}

