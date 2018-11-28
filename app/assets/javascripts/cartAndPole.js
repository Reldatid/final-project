const Cart = function(){
  this.xPos = width/2;
  this.width = width/5;
  this.height = 50;
  this.mass = 1;
  this.velocity = 0;
  this.acceleration = 0;
}

Cart.prototype.update = function(){
  this.move();
}

Cart.prototype.render = function(){
  let cornerX = this.xPos-(this.width/2);
  let cornerY = height - 10 - this.height;

  fill(255,0,0);
  rect(cornerX,cornerY, this.width, this.height);
}

Cart.prototype.accelerate = function( val ){
  this.acceleration = val; //this is also used for the pole.
  this.velocity += this.acceleration;
  pole.angularVelocity -= Math.cos(pole.rotation)*this.acceleration/pole.mass;
}

Cart.prototype.move = function( val ){

  // NO WRAPPING MOVEMENT //
  if (this.xPos > width && this.velocity > 0){
    pole.angularVelocity += Math.cos(pole.rotation)*this.velocity/pole.mass;
    this.velocity = 0;
  }else if (this.xPos < 0 && this.velocity < 0){
    pole.angularVelocity += Math.cos(pole.rotation)*this.velocity/pole.mass;
    this.velocity = 0;
  }
  this.xPos += this.velocity;

  // // WRAPPING MOVEMENT //
  // if (this.xPos > width){
  //   this.xPos -= width;
  //   pole.pinX -=window.innderWidth;
  // }
  // if (this.xPos < 0){
  //   this.xPos += width;
  //   pole.pinX += window.innderWidth;
  // }

}

const Pole = function() {
  this.pinX = cart.xPos;
  this.pinY = height - (cart.height+5);
  this.length = 200;
  this.width = 10;
  this.mass = 100;
  this.rotation = -0.1;
  this.angularVelocity = 0;
}

Pole.prototype.update = function() {
  this.angularVelocity += Math.sin(this.rotation)*gravity/this.mass;
  this.rotation += this.angularVelocity;
  this.pinX = cart.xPos;
  this.pinY = height - (cart.height+5);
}

Pole.prototype.render = function(){
  fill(0,255,0);
  translate(this.pinX, this.pinY)
  rotate(this.rotation);
  rect(-this.width/2, -this.length + 5, this.width, this.length);
}
