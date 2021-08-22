

const paintCanvas = document.querySelector( '.js-paint' );
const context = paintCanvas.getContext( '2d' );
context.lineCap = 'round';

const colorPicker = document.querySelector( '.js-color-picker');

colorPicker.addEventListener( 'change', event => {
    context.strokeStyle = event.target.value; 
} );

const lineWidthRange = document.querySelector( '.js-line-range' );
const lineWidthLabel = document.querySelector( '.js-range-value' );

lineWidthRange.addEventListener( 'input', event => {
    const width = event.target.value;
    lineWidthLabel.innerHTML = width;
    context.lineWidth = width;
} );

let x = 0, y = 0;
let isMouseDown = false;

const stopDrawing = () => { isMouseDown = false; }

const startDrawing = event => {
    isMouseDown = true;   
   [x, y] = [event.offsetX, event.offsetY];  
}
const drawLine = event => {
    if ( isMouseDown ) {
        const newX = event.offsetX;
        const newY = event.offsetY;
        context.beginPath();
        context.moveTo( x, y );
        context.lineTo( newX, newY );
        context.stroke();
        
        x = newX;
        y = newY;
    }
}



const clearDrawing = event => {
    const displayconv = paintCanvas.getContext( 'displayarea' );
    context.clearRect(0, 0, paintCanvas.width, paintCanvas.height);
    displayconv.clearRect(0, 0, paintCanvas.width, paintCanvas.height);
}


const submitDrawing1 = event => {
    var c = document.getElementById('drawingarea');
    // var ctx = c.getContext('2d');
    var dataURL = c.toDataURL();
    $.ajax({
        type: "POST",
        url: "/sketch",
        data:{
          imageBase64: dataURL
        }
      }).done(function(data) {
        // console.log(data);
        var d = document.getElementById('displayarea');
        var ctx = d.getContext('2d');
        d.style.display=true;
        // ctx.drawImage("data:image/png;base64, "+data,0,0);
        alert(data['a']);
        var img = new Image;
        img.onload = function(){
            ctx.drawImage(img,0,0);
        }
        img.src=data['b'];

      });
}

const alert_for_class = event => {
    alert('We recognize from following 10 classes : dog, car, camera, basketball, banana, apple, ant, alarm clock, airplane, the eiffel tower');

};


paintCanvas.addEventListener( 'mousedown', startDrawing );
paintCanvas.addEventListener( 'mousemove', drawLine );
paintCanvas.addEventListener( 'mouseup', stopDrawing );
paintCanvas.addEventListener( 'mouseout', stopDrawing );