var mainState = {
  preload: function(){
    game.load.image('road', 'road_b.png');
    game.load.image('jelly', 'jelly_b.png');
    game.load.image('traktor', 'traktor_b.png');
  },
  create: function(){
    // Starting physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // Creating background
    this.roadline = game.add.tileSprite(0, 0, game.width, game.cache.getImage('road').height, 'road');
    // Scaling traktor
    this.traktor = game.add.sprite(10, 0, 'traktor');
    this.traktor.scale.setTo(0.5, 0.5);
    game.physics.arcade.enable(this.traktor);
    this.enem = game.add.group();
    this.timer = game.time.events.loop(game.rnd.integerInRange(996, 1945)*2.5*this.lvl, this.addJelly, this);
    // Scaling game width and height
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // SPACEBAR control accelerating
    this.leftArrow = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.maxSpeed = 16;
    this.speed = 0;
    this.score = 0;
    this.enemCount = 0;
    this.lvl = 1;
    this.enem.bringToTop
  },
  update: function(){
    this.roadline.tilePosition.x -= (this.speed);
    this.accelerate();
    game.physics.arcade.collide(this.traktor, this.enem, this.levelUp, null, this)
  },
  accelerate: function(){
    if(this.leftArrow.isDown) {
      if(this.speed < this.maxSpeed) {
        this.speed = this.speed + 0.1;
      } else {
        this.speed = this.maxSpeed;
      }
    } else {
      if(this.speed > 0) {
        this.speed = this.speed - 1;
      } else {
        this.speed = 0;
      }
    }
  },
  levelUp: function(traktor, jelly){
    console.log("jest hit");
    jelly.kill();
    this.score = this.score + 1;
    if(this.score = this.maxSpeed){
      this.maxSpeed = this.maxSpeed * 2;
      this.score = 0;
      this.lvl = this.lvl + 1;
    }
    console.log(this.score);
  },
  addJelly: function(){
      var jelly = game.add.sprite(game.width, 10, 'jelly');
      console.log('jelly created');
      this.enem.add(jelly);
      game.physics.arcade.enable(jelly);
      jelly.body.velocity.x = -this.speed * game.rnd.integerInRange(3, 17);
      jelly.checkWorldBounds = true;
      jelly.outOfBoundsKill = true;
      this.enemCount = this.enemCount + 1;
  }
}

var game = new Phaser.Game(700, 70, Phaser.AUTO, '');
game.state.add('main', mainState);
game.state.start('main');
