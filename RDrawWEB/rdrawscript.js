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
        console.log("here");
        var current_color = document.getElementById("pen_color").value;
        console.log(current_color);
        x= current_color;
    }

    function draw() {
    	// console.log("draw")
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = x;
        console.log(ctx.strokeStyle);
        ctx.lineWidth = y;
        console.log(ctx.lineWidth);
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
            console.log(currY);

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
   	switch(val){
   		case "option1":
   			y=1;
   			break;
   		case "option2":
   			y=2;
   			break;
   		case "option3":
   			y=5;
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
