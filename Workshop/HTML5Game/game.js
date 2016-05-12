var app = {};

function startApp() {
  app.canvas = document.getElementById('canvas');
  app.context = canvas.getContext('2d');

  app.context.fillStyle = "#000020";
  app.context.fillRect(0, 0, canvas.width, canvas.height);

  app.shipImage = new Image();
  app.shipImage.src = "images/ship.png";

  app.rockImage = new Image();
  app.rockImage.src = "images/rock.png";

  app.explosionImage = new Image();
  app.explosionImage.src = "images/explosion.png";

  app.difficulty = .1;

  app.state = "play";
  app.rocks = [];

  spawnHero();
  spawnRocks();

  app.canvas.addEventListener('mousemove', myMouseMove, false);

  app.lastTime = window.performance.now();
  window.requestAnimationFrame(frameUpdate);
  }

function frameUpdate(timestamp) {
  window.requestAnimationFrame(frameUpdate);
  var dt = (timestamp - app.lastTime)/1000;
  app.lastTime = timestamp;

  if (app.state === 'play') {
    app.difficulty += dt;
    app.score = Math.floor(app.difficulty * 10);
  }

  for (var i = 0; i < app.rocks.length; i++){
    var rock = app.rocks[i];
    rock.move(dt);
    rock.rotate(dt);

    if (rock.atBottom(canvas.height)){
      app.rocks.splice(i, 1);
      spawnRock();
    }
     rock.checkHitHero(app.hero);
  }
  drawScene();
}

function drawScene() {
  var context = app.context;
  context.fillStyle = "#000020";
  context.fillRect(0, 0, canvas.width, canvas.height);

  app.hero.drawMe(context);
  for (var i = 0; i < app.rocks.length; i++) {
    var object = app.rocks[i];
    object.drawMe(context);
  }
  context.restore();
  drawScore(context);
}

function drawScore(context) {
  if (app.state === 'play'){
    context.font = "italic 30px Calibri";
    context.textAlign = "center";
    context.fillStyle = "#FFFF00";
    context.fillText("Score " + app.score, canvas.width/2, 40);
  }
  else {
    context.font = "italic 130px Calibri";
    context.textAlign = "center";
    context.fillStyle = "#FFFF00";
    context.fillText("Final Score " + app.score, canvas.width/2, canvas.height/2);
  }
}

function drawObject(context, object) {
  context.save();
  context.translate(object.position.x, object.position.y);
  context.rotate(object.angle);
  context.drawImage(object.image, -object.size/2, -object.size/2, object.size, object.size);
  context.restore();
}

function spawnHero() {
  app.hero = {
    position : {x:400, y:400},
    size : 60,
    image : app.shipImage,
    drawMe : function(context) {
      if (this.state === "exploded") {
        this.image = app.explosionImage;
      }
      drawObject(context, this);
    }
  };
}

function spawnRock() {
  var rock = {
    position : {
      x:Math.random() * app.canvas.width,
      y:Math.random() * -app.canvas.height},
    size: 120,
    speed : 150 + 25 * app.difficulty,
    angle : Math.random() * Math.PI,
    roll : Math.random() * 2 * Math.PI - Math.PI,
    image: app.rockImage,
    move : function(dt) {
      this.position.y += this.speed * dt;
    },
    rotate : function(dt) {
      this.angle += this.roll * dt;
    },
    atBottom : function(bottom) {
      return this.position.y - this.size > bottom;
    },
    drawMe : function(context) {
      drawObject(context, this);
    },
    checkHitHero : function(hero) {
      var distance = getDistance(hero, this);
      if (distance < 50) {
        hero.state = 'exploded';
        app.state = 'done';
      }
    }
  };
    app.rocks.push(rock);
}

function spawnRocks() {
  for (var i = 0; i < 10; i ++) {
    spawnRock();
  }
}

function myMouseMove(event) {
  if (app.hero.state != "exploded"){
    app.hero.position.x = event.pageX;
    app.hero.position.y = event.pageY;
  }
}

function getDistance(object1, object2) {
  var dx = object1.position.x - object2.position.x;
  var dy = object1.position.y - object2.position.y;
  return Math.sqrt(dx*dx + dy*dy);
}
