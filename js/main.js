class vector {
  constructor(nom,x,y,z) {
    this.nom=nom;
    this.x=x;
    this.y=y;
    this.z=z;

    x=x*30;
    y=y*-30;
    this.X=540+x;
    this.Y=300+y;
    this.angle = atan2(this.y,this.x);
  }

  show(){
    let s;
    if (this.nom=='r') {
      stroke('red');
      fill('red');
    }else{
      stroke(0);
      fill(0);
    }
    push();
    strokeWeight(2);
    line(540, 300, this.X, this.Y);
    //ellipse(this.c,this.c,5,5);
    translate(this.X,this.Y);
    textSize(16);
    text(this.nom+" ("+this.x+", "+this.y+")",10,30);
    rotate(-this.angle + HALF_PI);
    strokeWeight(1);
    triangle(-5, 20, 5, 20, 0, 0);
    pop();
  }
}

var resultado = false;
var r;
var vectores=[];
var IDS=[];

function addVector(){
    let nom = document.getElementById('nom').value;
    let x = parseInt(document.getElementById('x').value);
    let y = parseInt(document.getElementById('y').value);
    let z = parseInt(document.getElementById('z').value);
//si ya existe el nombre
    if (nom == '') {}else if (isNaN(x)) {} else if (isNaN(y)) {
    }else{
      if (isNaN(z)) {
        z = 0;
      }
      limpiarCampos();
      addToList(nom,x,y,z);
      var v=new vector(nom,x,y,z);

      vectores.push(v);
    }
}

function limpiarCampos() {
  document.getElementById('nom').value='';
  document.getElementById('x').value='';
  document.getElementById('y').value='';
  document.getElementById('z').value='';
}

function addToList(nom,x,y,z) {
  let ul = document.getElementById("vectores");
  let li = document.createElement("li");
  //li.appendChild();
  li.className += "collection-item dismissable";
  let div = document.createElement("div");
  let a = document.createElement("a");
  a.href="#!";
  a.className += "secondary-content";
  let i = document.createElement("i");
  i.className += "material-icons";
  //i.name = "enviar";
  i.id=nom;
  i.onclick=function(){ addToOperacion(this.id) };
  i.appendChild(document.createTextNode("navigate_next"));
  a.appendChild(i);
  if (z!='') {
    div.appendChild(document.createTextNode(nom+" = < "+x+","+y+","+z+" >"));
  }else {
    div.appendChild(document.createTextNode(nom+" = < "+x+","+y+" >"));
  }
  div.appendChild(a);
  //div.id = nom;
  li.appendChild(div)
  ul.appendChild(li);
}

function addToOperacion(id) {
    let chips = document.getElementById('chips');
    let div = document.createElement('div');
    let flag=false;
    if(('a' <= id && id <= 'z') || ('A' <= id && id <= 'Z')){
      flag=true;
    }
    if (!flag) {
      div.className = 'chip red';
    }else {
      div.className = 'chip teal lighten-4';
      IDS.push(id);
    }
    div.name = 'vector';
    div.appendChild(document.createTextNode(id));
    chips.appendChild(div);
 //drawVector(vectores[0].x,vectores[0].y);
}

function resolver() {
    let operacion=document.getElementsByClassName('chip');
    let a;
    let b;
    for (let i = 0; i < operacion.length; i++) {
      for (let k = 0; k < vectores.length; k++) {
        if (vectores[k].nom==operacion[i].innerHTML) {
          if (a!=null) {
            b=vectores[k];
          }else{
            a=vectores[k];
          }
        }
      }
    }
    switch (operacion[1].innerHTML) {
      case '+':
        suma(a,b);
        resultado=true;
        break;
      case '–':
        resta(a,b);
        resultado=true;
        break;
      case '•':
        prodP(a,b);
        break;
      case '✖':
        prodC(a,b);
        break;
      case '| |':
        norma(a);
        break;
      default:break;
    }
    if (resultado) {
      let element = document.getElementById("plano");
      element.classList.remove("disabled");
      element = document.getElementById("res");
      element.style.display='block';
    }
  //console.log(x+" "+y+" "+z);
}

function suma(a,b) {
  let x=a.x+b.x;
  let y=a.y+b.y;
  let z=a.z+b.z;

  r = new vector('r',x,y,z);
  let inn=document.getElementById('procedimiento');
  inn.innerHTML = a.nom+" + "+b.nom+"  =  < ("+a.x+" + "+b.x+"), ("+a.y+" + "+b.y+"), ("+a.z+" + "+b.z+") >   =   "+"< "+x+", "+y+", "+z+" >";
}

function resta(a,b) {
  let x=a.x-b.x;
  let y=a.y-b.y;
  let z=a.z-b.z;

  let inn=document.getElementById('procedimiento');
  inn.innerHTML = a.nom+" - "+b.nom+"  =  < ("+a.x+" - "+b.x+"), ("+a.y+" - "+b.y+"), ("+a.z+" - "+b.z+") >   =   "+"< "+x+", "+y+", "+z+" >";
}

function prodP(a,b) {
  let x=a.x*b.x;
  let y=a.y*b.y;
  let z=a.z*b.z;
  let p=x+y+z;

  let inn=document.getElementById('procedimiento');
  inn.innerHTML = a.nom+" - "+b.nom+"  =  [ ( ("+a.x+") ("+b.x+") ) + ( ("+a.y+") ("+b.y+") ) + ( ("+a.z+") ("+b.z+") ) ]   =   "+x+" + "+y+" + "+z+" = "+p;
}

function prodC(a,b) {
  let x=(a.y*b.z)-(b.y*a.z);
  let y=-((a.x*b.z)-(b.x*a.z));
  let z=(a.x*b.y)-(b.x*a.y);
  va=[a.x,a.y,a.z];
  vb=[b.x,b.y,b.z];
  let p=x+y+z;

  let inn=document.getElementById('procedimiento');
  //
  let tabla = document.getElementById('tabla');

  for (let i = 0; i < 2; i++) {
    let tr = document.createElement('tr');
    for (let k = 0; k < 3; k++) {
      let td = document.createElement('td');
      if (i==0) {
        td.innerHTML = va[k];
        tr.appendChild(td);
      }else{
        td.innerHTML = vb[k];
        tr.appendChild(td);
      }
    }
    tabla.appendChild(tr);
  }
  inn.innerHTML =
  "<br/><br/><br/>"+a.nom+" ✖ "+b.nom+"  =  < [ ("+(a.y*b.z)+") - ("+(b.y*a.z)+") ], - [ ("+(a.x*b.z)+") - ("+(b.x*a.z)+") ] , [ ("+(a.x*b.y)+") - ("+(b.x*a.y)+") ] >  =  "+"< "+x+", "+y+", "+z+" >";
}

function norma(a) {
  let x2=Math.pow(a.x,2);
  let y2=Math.pow(a.y,2);
  let z2=Math.pow(a.z,2);
  let s=x2+y2+z2;
  let res=Math.pow(s,0.5);
  let inn=document.getElementById('procedimiento');
  inn.innerHTML = "||"+a.nom+"|| = √ [("+a.x+")^2 + ("+a.y+")^2 + ("+a.z+")^2 ] = √ [("+x2+") + ("+y2+") + ("+z2+") ] = √ "+s+" = "+res;
}

function refresh() {
  let chips = document.getElementById('chips');
  let det = document.getElementById('tabla');
  document.getElementById('procedimiento').innerHTML = '';

  while (chips.hasChildNodes()) {
    chips.removeChild(chips.firstChild);
  }

  while (det.hasChildNodes()) {
    det.removeChild(det.firstChild);
  }
  resultado=false;
  let element = document.getElementById("plano");
  element.classList.add("disabled");
  let proced = document.getElementById('proced');
  let plano = document.getElementById('canvas');
  proced.style.display = 'block';
  plano.style.display = 'none';
  IDS = [];
  let res = document.getElementById("res");
  res.style.display='none';
}

function showPlane() {
  let proced = document.getElementById('proced');
  let plano = document.getElementById('canvas');
  if(proced.style.display == 'block'){
    proced.style.display = 'none';
    plano.style.display = 'block';
  }else{
    proced.style.display = 'block';
    plano.style.display = 'none';
  }
}

function addRes() {
  let element = document.getElementById("res");
  element.style.display='none';
  s = IDS[0]+"+"+IDS[1];
  addToList(s,r.x,r.y,r.z);
  vectores.push(new vector(s,r.x,r.y,r.z));
}
