require(['game','board','microevent'], function(game, board, microevent){
  console.log('Game loaded');
  var GameCanvas = function(canvas, game) {
    var self = this,
      ctx = canvas.getContext('2d'),
      cellWidth = canvas.width / game.width,
      cellHeight = canvas.height / game.height;
      
    
    this.draw = function() {
      var i,j;    
      
      ctx.fillStyle = '#000'; // Sets the fill color
      ctx.shadowOffsetX = 2; // Sets the shadow offset x, positive number is right
      ctx.shadowOffsetY = 2; // Sets the shadow offset y, positive number is down
      ctx.shadowBlur = 4; // Sets the shadow blur size
      ctx.shadowColor = 'rgba(1, 1, 1, 0.6)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (i = 0; i < game.width; i++) {
        for (j = 0; j < game.height; j++) {
          if (game.get(i,j)) {
        
            ctx.strokeStyle = '#ED146F'; 
            ctx.lineWidth = 2;
            ctx.strokeRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
            ctx.fillStyle = '#61D2D6';
            ctx.fillRect(i * cellWidth + 1, j * cellHeight + 1, cellWidth - 2, cellHeight - 2);

          }
        }
      }
    }
    
    canvas.addEventListener("click", function(e) {
      var x, y;
      if (e.pageX || e.pageY) { 
        x = e.pageX;
        y = e.pageY;
      }
      else { 
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
      } 
      x -= canvas.offsetLeft;
      y -= canvas.offsetTop;    
      
      // MicroEvent magic
      self.trigger('click', { x: Math.floor(x/cellWidth), y: Math.floor(y/cellHeight) });
    });
  }
  
  MicroEvent.mixin(GameCanvas);


  function spanCells(e) {
    var x, y;
    if (e.pageX || e.pageY) { 
      x = e.pageX;
      y = e.pageY;
    }
    else { 
      x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
      y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
    } 
    x -= gCanvasElement.offsetLeft;
    y -= gCanvasElement.offsetTop;
  }

  var board = new Board(15,12),
      game = new Game(board),
      canvas = document.getElementById('world'),
      gameCanvas = new GameCanvas(canvas, game),
      start = document.getElementById('startBtn'),
      simulationStart = document.getElementById('automatic'),
      simulationStop = document.getElementById('automatic-stop'),
      generation = document.getElementById('instances'),
      timer = null;
  
  gameCanvas.bind('click', function(e) {
    var i, j, radius = Math.round((board.width + board.height) / 2 * 0.05);
    game.set(e.x, e.y, 1);
    gameCanvas.draw();
  });

  start.addEventListener('click',function(){
      game.step();
      gameCanvas.draw();
      generation.innerHTML = board.increment();
  });

  simulationStart.addEventListener('click',function(){
    timer = setInterval(function() {
      game.step();
      gameCanvas.draw();
      generation.innerHTML = board.increment();
    }, 200);
  });

  simulationStop.addEventListener('click',function(){
    if (timer){
      console.log('adf');
      clearInterval(timer);
      timer = null;
    }
  });
});