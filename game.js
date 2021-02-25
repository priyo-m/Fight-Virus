function load_images() {
	//player,virus,gem
    enemy_image = new Image;
    enemy_image.src = "Assets/v1.png";
    
    player_image = new Image;
    player_image.src = "Assets/superhero.png";
    
    gem_image = new Image;
    gem_image.src = "Assets/gemm.png";
}

function init() {

	//define the objects that we will have in the game
	canvas = document.getElementById("mycanvas");
    console.log(canvas);
    W = 700;
    H = 400;
    
    canvas.width = W;
    canvas.height = H;
    
    // create a context
    pen = canvas.getContext('2d');
    console.log(pen);
    game_over = false;
    
    enemy1 = {
        x : 150,
        y : 50,
        w : 60,
        h : 60,
        speed : 20,
    };
    enemy2 = {
        x : 300,
        y : 150,
        w : 60,
        h : 60,
        speed : 30,
    };
    enemy3 = {
        x : 450,
        y : 20,
        w : 60,
        h : 60,
        speed : 40,
    };
    enemy = [enemy1,enemy2,enemy3];
    
    player = {
        x : 20,
        y : H/2,
        w : 60,
        h : 60,
        speed : 20,
        moving : false,
        health : 100,
    };
    gem = {
        x : W-100,
        y : H/2,
        w : 60,
        h : 60,
    };
    //listen to events on the canvas
    canvas.addEventListener('mousedown',function() {
       console.log("Mouse pressed"); 
        player.moving = true;
    });
    
    canvas.addEventListener('mouseup',function() {
       console.log("Mouse released"); 
        player.moving = false;
    });
    
}

function isOverlap(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y) {
            // collision detected!
            return true
        }
    return false;
}

function draw() {
    //clear the canvas area for the old frame
    pen.clearRect(0,0,W,H);
    pen.fillStyle = "red";
    //pen.fillRect(box.x,box.y,box.w,box.h);
    //pen.drawImage(enemy_image,box.x,box.y,box.w,box.h);
    
    //draw the player
    pen.drawImage(player_image,player.x,player.y,player.w,player.h);
    
    //draw the gem
    pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);
    
    
    for(let i=0;i<enemy.length;i++) {
        pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
    }
    
    pen.fillStyle = "white";
    pen.fillText("Score "+player.health,10,10);
    
}

function update() {
    
    //if player is moving
    if(player.moving == true) {
        player.x += player.speed;
        player.health += 20
    }
    
    //overlap
    if(isOverlap(player,gem)) {
        console.log("You Won");
        alert ("You Won!");
        game_over = true;
        return;
    }
    for(let i=0;i<enemy.length;i++) {
        if(isOverlap(player,enemy[i])) {
            player.health -= 50;
            if(player.health < 0) {
                game_over = true;
                alert("Game Over" + player.health);
                return;
            }
        }
    }
    
    //move the box downwards
    /*box.y += box.speed;
    
    if(box.y>=(H-box.h) || box.y<0) {
        box.speed *= -1;
    }*/
    
    for(let i=0;i<enemy.length;i++) {
        enemy[i].y += enemy[i].speed;
        if(enemy[i].y > H-enemy[i].h || enemy[i].y < 0 )
            enemy[i].speed *= -1;
    }
}

function gameloop() {
    if(game_over == true) {
        clearInterval(f);
    }
	draw();
	update();
	console.log("In Gameloop");
}

load_images();
init();
var f = setInterval(gameloop,100);