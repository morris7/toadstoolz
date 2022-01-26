
class GameScene extends Phaser.Scene {
  constructor() {

		super({key : 'gameScene'});

    this.player = null;
    this.coins = null;
    this.bombs = null;
    this.platforms = null;
    // this.cursors = null;
    this.score = 0;
    this.scoreText = null;
    this.creatorText = null;
    this.music = null;
    this.goodHit = null;
    this.loseSound = null;

	}

  preload() {
    this.load.image('background', 'assets/mainBackground.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('coin', 'assets/coin.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 60, frameHeight: 86 });



    //  Firefox doesn't support mp3 files, so use ogg
    this.load.audio('bgMusic', ['assets/bgMusic.mp3'] );
    this.load.audio('goodHit', ['assets/coin.mp3'] );
    this.load.audio('loseSound', ['assets/playerDeath.mp3'] );

}

create() {
    //  A simple background for our game
    
    this.add.image(400, 300, 'background');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.physics.add.staticGroup();

    // Play music
    this.music = this.sound.add('bgMusic');
    this.music.loop = true;
    this.music.play({volume: 0.5});

    this.goodHit = this.sound.add('goodHit');
    this.loseSound = this.sound.add('loseSound', { volume: 8 });



    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    //  Now let's create some ledges
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    // The this.player and i = null;
    this.player = this.physics.add.sprite(100, 450, 'dude');

    //  Player physics properties. Give the little guy a slight bounce.
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    //  Some coins to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    this.coins = this.physics.add.group({
        key: 'coin',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    this.coins.children.iterate(function (child) {

        //  Give each coin a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    this.bombs = this.physics.add.group();

    //  The score
    this.creatorText = this.add.text(10, 10, 'created by momomorris', { fontSize: '12px', fill: '#fff' });
    this.scoreText = this.add.text(10, 25, 'SCORE: 0 ETH', { fontSize: '18px', fill: '#fff' });

    //  Collide the player and the coins with the platforms
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.coins, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);

    //  Checks to see if the player overlaps with any of the coins, if he does call the collectcoin function
    this.physics.add.overlap(this.player, this.coins, this.collectcoin, null, this);

    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);


}

  update() {

      if (this.cursors.left.isDown)
      {
        this.player.setVelocityX(-160);

        this.player.anims.play('left', true);
      }
      else if (this.cursors.right.isDown)
      {
        
        this.player.setVelocityX(160);

        this.player.anims.play('right', true);
      }
      else
      {
        this.player.setVelocityX(0);

        this.player.anims.play('turn');
      }

      if (this.cursors.up.isDown && this.player.body.touching.down)
      {
        this.player.setVelocityY(-330);
      }
    
  }

  end() {}

hitBomb() {

  this.music.pause();
  this.loseSound.play({volume: 2});
  this.physics.pause();

  this.player.setTint(0xfff);
  
  this.player.anims.play('turn');

  this.cameras.main.fadeOut(1000, 0, 0, 0);

  setTimeout(() => {
    this.scene.start('endScene', {scoreText: this.score})
  }, 1000);

}

  collectcoin(player, coin){
    // this.hitBomb();
    coin.disableBody(true, true);
    this.goodHit.play({ volume: 0.2 });

    //  Add and update the score
    this.score += 0.1;
    this.scoreText.setText('SCORE: ' + Math.round(this.score * 10) / 10 + 'ETH');

    if (this.coins.countActive(true) === 0)
    {
      //  A new batch of coins to collect
      this.coins.children.iterate(function (child) {
          child.enableBody(true, child.x, 0, true, true);
      });

      var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      var bomb = this.bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
    }
  }
}

export default GameScene;
