import EndScene from './endScene.js';
import GameScene from './gameScene.js';

// Our game scene
var gameScene = new GameScene();
var endScene = new EndScene();

//* Game scene */
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
  },
};

const game = new Phaser.Game(config);

// load scenes
game.scene.add('endScene', endScene);
game.scene.add('gameScene', gameScene);

// start title
game.scene.start('gameScene');
