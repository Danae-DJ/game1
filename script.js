const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
//base of game
canvas.width = 900;
canvas.height = 500;

//draw the player
class Player{
    constructor(position, size, color, velocity){
        this.position = position;
        this.size = size;
        this.color = color;
        this.velocity = velocity;
        this.keys = {
            left: false,
            right: false
        }

        this.keyboard();
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        ctx.closePath();
    }
    //method to update the position of the player
    update(){
        this.draw();
        if(this.keys.right){
            this.position.x += this.velocity;
            if(this.position.x + this.size.width > canvas.width){
                this.position.x = canvas.width - this.size.width;
            }
        }
        if(this.keys.left){
            this.position.x -= this.velocity;
            if(this.position.x < 0){
                this.position.x = 0;
            }
        }
    }
    //method to listen the keyboard events
    keyboard(){
        document.addEventListener("keydown", (evt)=> {
            console.log("key pressed: "+ evt.key);
                if(evt.key=="a"||evt.key=="A"){
                    this.keys.left = true;
                }
                if(evt.key=="d"||evt.key=="D"){
                    this.keys.right = true;
                }
        });
        document.addEventListener("keyup", (evt)=> {
                if(evt.key=="a"||evt.key=="A"){
                    this.keys.left = false;
                }
                if(evt.key=="d"||evt.key=="D"){
                    this.keys.right = false;
                }
        })
    }
}
const player = new Player({x:200, y:480}, {width:60, height:20}, "white", 7);


//bucle about the player's movement
function update(){
    requestAnimationFrame(update);
    ctx.fillStyle = "#141414";
    ctx.fillRect(0,0, canvas.width, canvas.height);

    player.update();
}
update();