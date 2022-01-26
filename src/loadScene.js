// class LoadingScene extends Phaser.Scene {

//   constructor() {
// 		super({key : 'loadingScene'});

//     this.cursors;
// 	}

//   update() {
//     if (this.cursors.left.isDown)
//     {
//       this.player.setVelocityX(-160);

//       this.player.anims.play('left', true);
//     }
//     else if (this.cursors.right.isDown)
//     {
      
//       this.player.setVelocityX(160);

//       this.player.anims.play('right', true);
//     }
//     else
//     {
//       this.player.setVelocityX(0);

//       this.player.anims.play('turn');
//     }

//     if (this.cursors.up.isDown && this.player.body.touching.down)
//     {
//       this.player.setVelocityY(-330);
//     }
//   }

//   endScene () {

//   };

//   create() {
//         //  Input Events
//         this.cursors = this.input.keyboard.createCursorKeys();

//     var text = this.add.text(100,100, 'START!',  { fontSize: '22px', fill: '#fff' });
//     text.setInteractive({ useHandCursor: true });
//     text.on('pointerdown', () => this.clickButton());
//   };

//   clickButton() {
//    this.scene.start('gameScene');
//   }
// }

// export default LoadingScene;