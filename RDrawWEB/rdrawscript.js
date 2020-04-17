// // last known position
// var pos = { x: 0, y: 0 };

// var c = document.getElementById("myCanvas");
// console.log(c);
// var ctx = c.getContext("2d");
// // window.addEventListener('resize', resize);
// document.addEventListener('mousemove', draw);
// document.addEventListener('mousedown', setPosition);
// document.addEventListener('mouseenter', setPosition);


// function setPosition(e) {
//   pos.x = e.clientX;
//   pos.y = e.clientY;
//   console.log("set position")
// }


// function draw(e) {
//   // mouse left button must be pressed
//   console.log("drawing");
//   console.log(e.buttons);
//   if (e.buttons !== 1) return;

//   ctx.beginPath(); // begin

//   ctx.lineWidth = 5;
//   ctx.lineCap = 'round';
//   ctx.strokeStyle = '#c0392b';

//   ctx.moveTo(pos.x, pos.y); // from
//   setPosition(e);
//   ctx.lineTo(pos.x, pos.y); // to

//   ctx.stroke(); // draw it!
// }

    var canvas, ctx, flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false;
var x = "black",
        y = 2;

        var current_color ="black";


        canvas = document.getElementById('myCanvas');
        ctx = canvas.getContext("2d");
        w = canvas.width;
        h = canvas.height;

        canvas.addEventListener("mousemove", function (e) {
            findxy('move', e)
        }, false);
        canvas.addEventListener("mousedown", function (e) {
            findxy('down', e)
        }, false);
        canvas.addEventListener("mouseup", function (e) {
            findxy('up', e)
        }, false);
        canvas.addEventListener("mouseout", function (e) {
            findxy('out', e)
        }, false);


    function color_picker(){
        current_color = document.getElementById("pen_color").value;
        //console.log(current_color);
        x= current_color;
    }

    function draw_circle(){
      var canvas = document.getElementById("myCanvas");
      //console.log(canvas);
      if (canvas.getContext('2d')) {
          var ctx = canvas.getContext('2d');
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          //console.log(prevX);
          //console.log(prevY);
          var radius = 20; // Arc radius
          var startAngle = 0; // Starting point on circle
          var endAngle = Math.PI + (Math.PI * 2) / 2; // End point on circle
          var anticlockwise = 4 % 2 !== 0; // clockwise or anticlockwise
          ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
          ctx.stroke();
          ctx.closePath();
        }
    }
    function erase_canvas(){
      var canvas = document.getElementById("myCanvas");
      var contents = document.getElementById("myCanvas").getContext('2d');
      contents.clearRect(0,0,canvas.width,canvas.height);
    }

    function eraser_width(width){
      x="white";
      //console.log(x);
      switch(width){
     		case "option1":
     			y=1;
     			break;
     		case "option2":
     			y=4;
     			break;
     		case "option3":
     			y=8;
     			break;
     		default:
     			y=2;
     	}
      //console.log(y);
    }

    function fill_canvas(){
      var canvas = document.getElementById("myCanvas");
      var contents = document.getElementById("myCanvas").getContext('2d');
      contents.rect(0,0,1601.98,801.98);
      contents.fillStyle = current_color;
      contents.fill();
    }
    function cursor_type(type){
      console.log(type);

      if (type == 1) {
        document.getElementById("cursor_style").style.cursor = "cursor:url(img/brush.png),auto";
      }
      else if (type == 2) {
        document.getElementById("cursor_style").style.cursor = "cursor:url(img/eraser.png),auto";
        console.log("here");
      }
      var currrent_cursor = document.getElementById("cursor_style").style.cursor;
      console.log(currrent_cursor);

    }

    function draw() {
    	// console.log("draw")
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = x;
        //console.log(ctx.strokeStyle);
        ctx.lineWidth = y;
      //console.log(ctx.lineWidth);
        ctx.stroke();
        ctx.closePath();
    }

    // function erase() {
    //     var m = confirm("Want to clear");
    //     if (m) {
    //         ctx.clearRect(0, 0, w, h);
    //         document.getElementById("canvasimg").style.display = "none";
    //     }
    // }

    function save() {
        document.getElementById("myCanvas").style.border = "2px solid";
        var dataURL = canvas.toDataURL();
        document.getElementById("myCanvas").src = dataURL;
        document.getElementById("myCanvas").style.display = "inline";
    }

    function findxy(res, e) {
    	// console.log("finding");
        if (res == 'down') {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            //console.log(currY);

            flag = true;
            dot_flag = true;
            if (dot_flag) {
                ctx.beginPath();
                ctx.fillStyle = x;
                ctx.fillRect(currX, currY, 2, 2);
                ctx.closePath();
                dot_flag = false;
            }
        }
        if (res == 'up' || res == "out") {
            flag = false;
        }
        if (res == 'move') {
            if (flag) {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - canvas.offsetLeft;
                currY = e.clientY - canvas.offsetTop;
                draw();
            }
        }
    }

   function strokeWidth(val){
     x=current_color;
   	switch(val){
   		case "option1":
   			y=1;
   			break;
   		case "option2":
   			y=4;
   			break;
   		case "option3":
   			y=8;
   			break;
   		default:
   			y=2;

   	}
   }

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function sendForm(){
  var x = document.getElementById("myForm").action;
}
