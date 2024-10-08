window.onload = function () {
    var canvas = document.getElementById("paint");
    var ctx = canvas.getContext("2d");

    var img = document.getElementById("scream");
    ctx.drawImage(img, 10, 10);
};

(function () {
    var canvas = document.querySelector('#paint');
    var ctx = canvas.getContext('2d');

    var sketch = document.querySelector('#sketch');
    var sketch_style = getComputedStyle(sketch);
    canvas.width = 700;
    canvas.height = parseInt(sketch_style.getPropertyValue('height'));

    var mouse = { x: 0, y: 0 };
    var last_mouse = { x: 0, y: 0 };

    /* Mouse Capturing Work */
    canvas.addEventListener('mousemove', function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        var t = document.getElementById('x');
        t.innerHTML = mouse.x;
        var tt = document.getElementById('y');
        mouse.y = e.pageY - this.offsetTop;
        tt.innerHTML = mouse.y;
    }, false);


    /* Drawing on Paint App */
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'blue';

    canvas.addEventListener('click', function (e) {
        canvas.addEventListener('click', drawX, false);
    }, false);

    canvas.addEventListener('mouseup', function () {
        canvas.removeEventListener('mousemove', drawX, false);
    }, false);

    var onPaint = function () {
        ctx.beginPath();
        ctx.moveTo(last_mouse.x, last_mouse.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.closePath();
        ctx.stroke();
    };
    var onStar = function (cx, cy) {
        var cx = mouse.x;
        var cy = mouse.y;
        var spikes = 5;
        var outerRadius = 10;
        var innerRadius = 5;
        var rot = Math.PI / 2 * 3;
        var x = cx;
        var y = cy;
        var step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius)
        for (i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y)
            rot += step

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y)
            rot += step
        }
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'red';
        ctx.stroke();
        ctx.fillStyle = 'skyblue';
        ctx.fill();
    }
    var drawX = function () {
        var x = mouse.x;
        var y = mouse.y;
        ctx.beginPath();

        ctx.moveTo(x - 6, y - 6);
        ctx.lineTo(x + 6, y + 6);

        ctx.moveTo(x + 6, y - 6);
        ctx.lineTo(x - 6, y + 6);
        ctx.strokeStyle = 'red';
        ctx.stroke();
    }

    var text = function () {
        var c = document.getElementById("paint");
        var ctx = c.getContext("2d");
        var textneedtobeputted = document.getElementById("textig").value;
        // ctx.font = "20px Georgia";
        ctx.fillText(textneedtobeputted, mouse.x, mouse.y);

        ctx.font = "30px Verdana";
        // Create gradient
        var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        // Fill with gradient
        ctx.fillStyle = gradient;
        //ctx.fillText("Big smile!", 10, 90);
    }


}());


function download() {
    var canvas = document.getElementById("paint");
    var img = canvas.toDataURL("image/png");
    var link = document.createElement('a');
    link.href = img;
    link.download = 'canvas.png';
    link.click();
}

function remove() {
    var c = document.getElementById("paint");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "red";
    // ctx.fillRect(0, 0, 300, 150);
    ctx.clearRect(194, 50, 10, 5);
}