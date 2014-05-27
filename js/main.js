var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

/// Data
var caseHeight = 50;
var caseWidth = 50;
var caseNumberH = 14;
var caseNumberW = 24;
var level = [
    "#                      #",
    "#                      #",
    "#              ---     #",
    "#         --           #",
    "#     --               #",
    "#                      #",
    "#  --                  #",
    "#     --               #",
    "#          ---         #",
    "#                      #",
    "#               ---    #",
    "#                      #",
    "#||||||||||||||||||||||#",
    "########################"
];

var player;
var platforms;
var keyboard;
var lastDirection = 5; // 4 for left // 5 for right


function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/ground.png');
    game.load.image('green', 'assets/green.png');
    game.load.image('block', 'assets/block.png');
    game.load.spritesheet('alex', 'assets/alex.png', 34, 49);

}

function create() {

    game.world.setBounds(0, 0, 1200, 700);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'sky');

    platforms = game.add.group();
    platforms.enableBody = true;

    for(var i = 0; i < caseNumberW; ++i) {
        for(var j = 0; j < caseNumberH; ++j) {
            var tempCase = level[j][i];
            switch(tempCase){
                case '#':
                    var ground = platforms.create(i*caseWidth, j*caseHeight, 'ground');
                    ground.body.immovable = true;
                    break;
                case '|':
                    var green = platforms.create(i*caseWidth, j*caseHeight, 'green');
                    green.body.immovable = true;
                    break;
                case '-':
                    var block = platforms.create(i*caseWidth, j*caseHeight, 'block');
                    block.body.immovable = true;
                    break;
                default:
                    break;
            }
        }
    }

    player = game.add.sprite(150, 400, 'alex');

    game.physics.arcade.enable(player);

    player.body.bounce.y = 0;
    player.body.gravity.y = 600;
    player.body.collideWorldBounds = true;

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [6, 7, 8, 9], 10, false);

    keyboard = game.input.keyboard.createCursorKeys();
    
    game.camera.follow(player);
}

function update() {

    game.physics.arcade.collide(player, platforms);

    player.body.velocity.x = 0;

    if (keyboard.left.isDown)
    {
        player.body.velocity.x = -150;

        player.animations.play('left');
        lastDirection = 4;
    }
    else if (keyboard.right.isDown)
    {
        player.body.velocity.x = 150;

        player.animations.play('right');
        lastDirection = 5;
    }
    else
    {
        player.animations.stop();

        player.frame = lastDirection;
    }

    if (keyboard.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }

}
