//var x=displayWidth,y=displayHeight;
var zoom = 1.00;

var x = 1080//document.getElementById('canvas').offsetWidth-60;
var y = 600//document.getElementById('canvas').offsetHeight;

var w=540;
var h=300;

//console.log(x);
//console.log(y);
function setup() {
  // put setup code here
  var c=createCanvas(x, y);
  c.parent('canvas');
}

function draw() {
  // put drawing code here

  translate(w,h);
  scale(zoom);

  drawGrid();

  if (resultado) {
    drawVector();
  }

  //var n=new vector('n',8,8,0);
  //n.show();
}

function drawVector() {
  for (let i = 0; i < IDS.length; i++) {
    for (let k = 0; k < vectores.length; k++) {
      if (vectores[k].nom==IDS[i]) {
        vectores[k].show();
      }
    }
  }
    
  r.show();

  push();
  translate(540,300);
  noFill();
  strokeWeight(2);
  arc(0, 0, 60, 60, -r.angle, 0);
  let a;
  if (r.x>0 && r.y<0) {
    a="α = "+(360+((r.angle*180)/PI))+"°";
  } else if(r.x<=0 && r.y<0) {
    a="α = "+(360+((r.angle*180)/PI))+"°";
  } else if(r.x<0 && r.y>0) {
      a="α = "+((r.angle*180)/PI)+"°";
  } else {
      a="α = "+((r.angle*180)/PI)+"°";
  }
  textSize(20);
  text(a,55,-30);
  pop();
}

function drawGrid(){
  translate(-540,-300);
  background(255);
  strokeWeight(1);
  for (let i = -540; i < x+540; i+=(30)) {
    stroke(200);
    line((x)-i, -300, (x)-i, y+300);

  }
  for (let i = -300; i < y+300; i+=(30)) {
    stroke(200);
    line(-540, (y)-i, x+540, (y)-i);
  }
  stroke(0);
  line(x/2, -300, x/2, y+300);
  stroke(0);
  line(-540, y/2, x+540, y/2);
}

function zoomIN() {
  if (zoom<1.4) {
    zoom += 0.1;
  }
}

function zoomOUT() {
  if (zoom>0.6) {
    zoom -= 0.1;
  }else{
    w=540;
    h=300;
  }
}
//centrar canvas
function center() {
  w=540;
  h=300;
}

function mouseDragged() {
  if (zoom>0.6) {
    w=mouseX;
    h=mouseY;
  }
  if (mouseX>0 && mouseX<1000) {
    cursor(CROSS);
  }
}