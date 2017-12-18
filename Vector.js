class Vector{
	constructor(x,y){
		this.c=300;
		this.X=x;
		this.Y=y;
		x=x*30;
		y=y*-30;

		this.x=this.c+x;
		this.y=this.c+y;
	}

	show(){
		stroke(0);
		strokeWeight(2);
		line(this.c, this.c, this.x, this.y);
		//ellipse(this.c,this.c,5,5);
		var angle=atan2(this.Y,this.X);
		push();
		translate(this.x,this.y);
		rotate(-angle+HALF_PI);
		strokeWeight(1);
		fill(0);
		triangle(-5, 20, 5, 20, 0, 0);
		pop();
	}
}