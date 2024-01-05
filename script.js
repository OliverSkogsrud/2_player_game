let canvas  = document.getElementById('canvas');
let cx = canvas.getContext('2d');
let lastTime = performance.now(60);

let player1_x = 100
let player1_y = 100

let player2_x = 600
let player2_y = 100

let player2_x_direction = 0
let player2_y_direction = 0

let player1_x_direction = 0
let player1_y_direction = 0

let player2_score = 0
let player1_score = 0

let playing = false

let coins = []


let played = false



function clear() {
    cx.clearRect(0, 0, canvas.width, canvas.height)
}

function draw() {
//player 1
    cx.fillStyle = "blue";
    cx.fillRect(player1_x, player1_y, 50, 50);

//player 2
    cx.fillStyle = "red";
    cx.fillRect(player2_x, player2_y, 50, 50);

//coins
    for(let coin of coins) {
        cx.fillStyle = "yellow";
        cx.fillRect(coin.x, coin.y, 30, 30)
    }

//player 2 score
    cx.font = "30px monospace";
    cx.fillStyle = "black"
    cx.fillText(("Score: " + player2_score), 600, 75)

//player 1 score
    cx.font = "30px monospace";
    cx.fillStyle = "black"
    cx.fillText("Score: " + player1_score, 50, 75)

//press E to start the game
    if (playing == false) {
        if (played == false) {
        cx.font = "30px sans-serif";
        cx.fillStyle = "steelblue";
        cx.fillText("press E to start the game", 250, 200)
        }
        
    }
    
}

function restart() {
    player1_x = 100
    player1_y = 100
    
    player2_x = 600
    player2_y = 100

    coins = []

    playing = false
    played = true
}

window.requestAnimationFrame(gameLoop);
function gameLoop(time) {
    let delta = time - lastTime;
    lastTime = time;
    player2_x += player2_x_direction
    player2_y += player2_y_direction
    player1_y += player1_y_direction
    player1_x += player1_x_direction
    clear()
    draw();
    for(let coin of coins) {
        if(isColliding({x: player1_x, y: player1_y}, coin)) {
            // Player 1 has collected a coin, remove it from the array
            const index = coins.indexOf(coin);
            if (index > -1) {
                coins.splice(index, 1);
                player1_score++
            } 
        }
    }
    for(let coin of coins) {
        if(isColliding({x: player1_x, y: player1_y}, coin)) {
            // Player 1 has collected a coin, remove it from the array
            const index = coins.indexOf(coin);
            if (index > -1) {
                coins.splice(index, 1);
            }
            
            // Increase player 1's score
            player1_score++;
        }
  
        if(isColliding({x: player2_x, y: player2_y}, coin)) {
            // Player 2 has collected a coin, remove it from the array
            const index = coins.indexOf(coin);
            if (index > -1) {
                coins.splice(index, 1);
                player2_score++
            }
        }
    }   


    setTimeout(function() {
        if (playing == true) {
            if (player1_score > player2_score) {
                alert("Player 1 won with the score: " + player1_score + " refresh the page to start again")
            }
            else if (player1_score == player2_score) {
                alert("Tie both players had the same score refresh the page to play again")
            }
            else if (player1_score < player2_score) {
                alert("Player 2 won withe score: " + player2_score + " refresh the page to play again")
            }
            player1_score = 0
            player2_score = 0
            restart()
            }
    }, 15000)
   
       
   
    
    window.requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", function(event) {
if (playing == true) {
//player 1 input
    if (event.keyCode === 65) {
        player1_x_direction = -7
    }
    if (event.keyCode === 68) {
        player1_x_direction = 7
    }
    if (event.keyCode === 87) {
        player1_y_direction = -7
    }
    if (event.keyCode === 83) {
        player1_y_direction = 7
    }
//Player 2 input
    if (event.keyCode === 40) {
        player2_y_direction = 7
    }
    if (event.keyCode === 37) {
        player2_x_direction = -7
    }
    if (event.keyCode === 39) {
        player2_x_direction = 7
    }
    if (event.keyCode === 38) {
        player2_y_direction = -7
    }
}
    

}) 

//player2 direction
document.addEventListener("keyup", function(event) {
    if (event.keyCode === 37 || event.keyCode === 39) {
        player2_x_direction = 0
    }
    if (event.keyCode === 40 || event.keyCode === 38) {
        player2_y_direction = 0
    }
    if (event.keyCode === 83 || event.keyCode === 87) {
        player1_y_direction = 0
    }
    if (event.keyCode === 65 || event.keyCode === 68) {
        player1_x_direction = 0
    }
    if (event.keyCode === 69) {
        playing = true
    }

})

window.setInterval(function() {
    if (playing === true) {
        coins.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        })
    }
}, 1000) 

function isColliding(player, coin) {
    return player.x < coin.x + 30 &&
           player.x + 50 > coin.x &&
           player.y < coin.y + 30 &&
           player.y + 50 > coin.y;
}

