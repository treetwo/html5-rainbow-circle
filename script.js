$().ready(function(){
  
    // get the canvas element using the DOM
  canvas = document.getElementById('tutorial');

  $(document).mousemove(onMouseMove);
  
  // Make sure we don't execute when canvas isn't supported
  if (canvas.getContext){
    animation = setInterval(draw, 10);
  } else {
    alert('You need Safari or Firefox 1.5+ to see this demo.');
  }
  
});

function onMouseMove(evt) {
  canvasMinX = $(canvas).offset().left;
  canvasMinY = $(canvas).offset().top;
  canvasMaxX = canvasMinX + canvas.width;
  canvasMaxY = canvasMinY + canvas.width;

  if (
    evt.pageX > canvasMinX && evt.pageX < canvasMaxX
    &&
    evt.pageY > canvasMinY && evt.pageY < canvasMaxY
    ) {
    paddlex = evt.pageX - canvasMinX;
    paddley = evt.pageY - canvasMinY;
    //console.log([paddlex,paddley]);
  }
}

function draw() {
  

    //use getContext to use the canvas for drawing
    var ctx = canvas.getContext('2d');

    //facts
    var division = 30; //division of full
    var frame_divsion=Math.floor(frame/10); //this frame's division
    var maxDivision = 30;
    var width = canvas.width/2;
    var textSpace = width*0.7;
    var minArcHight = 10;
    
    //validate facts
    if (frame_divsion>maxDivision+1) {
      frame_divsion = maxDivision+1;
      //clearInterval(animation); //cannot clear as rollover is part of animation
    }
    if (minArcHight>width-textSpace) {
      minArcHight=0;
    }
    var stepAngle = (360/frame_divsion)/180*Math.PI;
    
    //mouse
    var mouseAngle
    var slope = (paddley-width)/(paddlex-width);
    if (paddlex-width>0) {
      mouseAngle = Math.atan(slope)+Math.PI*2;
    } else {
      mouseAngle = Math.atan(slope)+Math.PI*3;
    }
    
    //init
    ctx.clearRect(0,0,width*2,width*2);
    ctx.save();
    /*
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0,width*2);
    ctx.lineTo(width*2,width*2);
    ctx.lineTo(width*2,0);
    ctx.lineTo(0,0);
    ctx.stroke();
    */

    //draw
    ctx.translate(width, width);
    for (i=0;i<frame_divsion;i++) {
    
      var offset = stepAngle*i;
      var start = Math.PI/2*3;
      var level = frame_divsion-i;
      
      var lineWidth = (width-textSpace-minArcHight)/frame_divsion*level+minArcHight;
      var radius = lineWidth/2+textSpace;
      
      var color;
      color = get_color(offset);
      
      if (mouseAngle>start+offset && mouseAngle<start+stepAngle+offset) {
        //ctx.strokeStyle = "rgba(255,0,255,"+1/frame_divsion*(frame_divsion-i)+")";
        //ctx.strokeStyle = "rgba(255,0,255,1)";
        ctx.strokeStyle = "rgba("+color+",1)";
        lineWidth += 2;
      } else {
        ctx.strokeStyle = "rgba("+color+",0.5)";
      }
      
      ctx.lineWidth = lineWidth;
      
      ctx.beginPath();
      ctx.arc(0,0,radius,start,start+stepAngle,false);
      ctx.stroke();
      
      ctx.fillText(i, 0, -textSpace);
      
      ctx.rotate(stepAngle);
    }
    ctx.restore();
    //ctx.fillText(frame, 100, 100);
    frame++;

}

/*
  
  @param <float> angle 0-2*Math.PI
*/
function get_color(angle) {
  var color;
  var value;
  if (angle<Math.PI*2/5) { //0-72 R
    value = 255/(Math.PI*2/5)*angle;
    color = '255,'+Math.round(value)+',0'; //255,0,0 - 255,255,0
  } else if (angle<Math.PI*4/5) { //72-144 Y
    value = 255/(Math.PI*2/5)*(angle-Math.PI*2/5);
    color = (255-Math.round(value))+',255,0'; //255,255,0 - 0,255,0
  } else if (angle<Math.PI*6/5) { //144-216 G
    value = 255/(Math.PI*2/5)*(angle-Math.PI*4/5);
    color = '0,255,'+Math.round(value); //0,255,0 - 0,255,255
  } else if (angle<Math.PI*8/5) { //216-288
    value = 255/(Math.PI*2/5)*(angle-Math.PI*6/5);
    color = '0,'+(255-Math.round(value))+',255'; // 0,255,255 - 0,0,255
  } else { //288-360
    value = 255/(Math.PI*2/5)*(angle-Math.PI*8/5);
    color = Math.round(value)+',0,255'; //0,0,255 - 255,0,255
  }
  return color;
}

var canvasMinX;
var canvasMaxX;
var canvasMinY;
var canvasMaxY;
var paddlex;
var paddley;
var canvas;
var frame=0;
var animation;