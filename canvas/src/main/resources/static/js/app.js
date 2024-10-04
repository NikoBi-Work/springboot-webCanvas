window.onload = function() {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    let painting = false;
    let currentColor = document.getElementById('colorPicker').value;
    let lineWidth = document.getElementById('lineWidth').value;

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function endPosition() {
        painting = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!painting) return;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.strokeStyle = currentColor;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);

    document.getElementById('colorPicker').addEventListener('input', function(e) {
        currentColor = e.target.value;
    });

    document.getElementById('lineWidth').addEventListener('input', function(e) {
        lineWidth = e.target.value;
    });

    // Save drawing as an image
    document.getElementById('saveBtn').addEventListener('click', function() {
        const dataURL = canvas.toDataURL('image/png');
        fetch('/save-drawing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: dataURL })
        }).then(response => {
            if (response.ok) {
                alert('Drawing saved successfully!');
            }
        });
    });

    // Load last saved drawing
    document.getElementById('loadBtn').addEventListener('click', function() {
        fetch('/load-drawing')
            .then(response => response.json())
            .then(data => {
                const img = new Image();
                img.onload = function() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
                    ctx.drawImage(img, 0, 0); // Draw the image on canvas
                };
                img.src = data.image;
            });
    });
};
