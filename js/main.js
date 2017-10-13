class vector {
  constructor(nom,x,y,z) {
    this.nom=nom;
    this.x=x;
    this.y=y;
    this.z=z;
  }
}

//for (let x=0; x<=300; x=x+20){
//  ctx.moveTo(x,0);
//  ctx.lineTo(x,300);
//}
//for (let y=0; y<=300; y=y+20){
//  ctx.moveTo(0,y);
//  ctx.lineTo(300,y);
//}
//ctx.strokeStyle = "#cccccc";
//ctx.stroke();

function drawVector(x,y) {
//  var can = document.getElementById("micanvas");
//  var c = can.getContext("2d");
//  c.moveTo(0,300);
//  c.lineTo((x*20),(300-(y*20)));
//  c.strokeStyle = "#000000";
//  c.stroke();
}

var vectores=[];

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
      console.log(vectores);
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
      break;
    case '–':
      resta(a,b);
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

  //console.log(x+" "+y+" "+z);
}

function suma(a,b) {
  let x=a.x+b.x;
  let y=a.y+b.y;
  let z=a.z+b.z;

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
}
