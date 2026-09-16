const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
//base of game
canvas.width = 900;
canvas.height = 500;

//projectile of the player
class Projectile{
    constructor(position,size,color,velocity) {
        this.position = position;
        this.size = size;
        this.color = color;
        this.velocity = velocity; 
    }
    update(){
        this.draw();
        this.position.y += this.velocity;
    }
    collisions(){
        if(this.position.y <= 0) {
            return true;
        }
        return false;
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        ctx.closePath();
    }
}

//draw the player
class Player{
    constructor(position, size, color, velocity){
        this.position = position;
        this.size = size;
        this.color = color;
        this.velocity = velocity;
        this.keys = {
            left: false,
            right: false,
            shoot: true,
        }
        this.projectiles = [];

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
                if(evt.key=="ArrowUp" && this.keys.shoot){
                    let projectile = new Projectile(
                        {x:(this.position.x + this.size.width/2)-5, y:this.position.y},
                        {width:10, height:20},
                        this.color,
                        -8
                    );
                    this.projectiles.push(projectile);
                    this.keys.shoot = false;
                }
        });
        document.addEventListener("keyup", (evt)=> {
                if(evt.key=="a"||evt.key=="A"){
                    this.keys.left = false;
                }
                if(evt.key=="d"||evt.key=="D"){
                    this.keys.right = false;
                }
                if(evt.key=="ArrowUp"){
                    this.keys.shoot = true;
                }
        });
    }
}
const player = new Player({x:200, y:480}, {width:60, height:20}, "white", 7);

//method to update the projectiles of the player
function updateProjectiles(){
    for(let i = 0; i < player.projectiles.length; i++){
        player.projectiles[i].update();
        if(player.projectiles[i].collisions()){
            player.projectiles.splice(i,1);
        }
    }
}

//bucle about the player's movement
function update(){
    requestAnimationFrame(update);
    ctx.fillStyle = "#141414";
    ctx.fillRect(0,0, canvas.width, canvas.height);

    player.update();
    updateProjectiles();
}
update();