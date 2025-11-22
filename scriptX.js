var toggleNav = (element) => { // the arrow opertor is so slick
    element.classList.toggle('active');
}

const radarConfig = {
    radarCharElementItem: [
        { name: 'C', value: 67 },
        { name: 'C++', value: 86 },
        { name: 'University', value: 72 },
        { name: 'Academics', value: 45 },
        { name: 'Theoreticals', value: 92 }
    ],
    colors: {
        line: '#c4ff00',
        fill: 'rgba(196, 255, 0, 0.15)',
        grid: '#2a2a2a',
        axis: '#2a2a2a',
        text: '#c4ff00',
        labelText: '#f9f9f9ff'
    }
};

var drawRadarChart = () => {
    const canvas = document.getElementById('radarChart');
    if (!canvas || canvas === null) { return; }
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 35; // increased margin for labels
    const levels = 5;
    const radarCharElementItem = radarConfig.radarCharElementItem;
    const numPoints = radarCharElementItem.length;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // pentagon
    ctx.strokeStyle = radarConfig.colors.grid;
    ctx.lineWidth = 0.85; // pentagonal lines
    for (let inx = 1; inx <= levels; inx += 1) {
        ctx.beginPath();
        const levelRadius = (radius / levels) * inx;
        for (let p = 0; p <= numPoints; p += 1) {
            const angle = (Math.PI * 2 / numPoints) * p - Math.PI / 2;
            const x = centerX + levelRadius * Math.cos(angle);
            const y = centerY + levelRadius * Math.sin(angle);
            (p === 0) ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        } ctx.stroke();
    }
    
    // multiple axis
    ctx.strokeStyle = radarConfig.colors.axis;
    ctx.lineWidth = 1 // axis lines
    for (let inx = 0; inx < numPoints; inx += 1) {
        const angle = (Math.PI * 2 / numPoints) * inx - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    
    // draw data pentagon
    ctx.beginPath();
    ctx.strokeStyle = radarConfig.colors.line;
    ctx.fillStyle = radarConfig.colors.fill;
    ctx.lineWidth = 0.85; // showcase line 
    
    for (let inx = 0; inx <= numPoints; inx += 1) {
        const angle = (Math.PI * 2 / numPoints) * inx - (Math.PI / 2);
        const value = (radarCharElementItem[inx % numPoints].value / 100);
        const x = centerX + radius * value * Math.cos(angle);
        const y = centerY + radius * value * Math.sin(angle);
        (inx === 0) ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    
    ctx.fill();
    ctx.stroke();
    
    // draw points
    ctx.fillStyle = radarConfig.colors.line;
    for (let inx = 0; inx < numPoints; inx += 1) {
        const angle = (Math.PI * 2 / numPoints) * inx - (Math.PI / 2);
        const value = radarCharElementItem[inx].value / 100;
        const x = centerX + (radius * value * Math.cos(angle));
        const y = centerY + (radius * value * Math.sin(angle));
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // labels at axis endpoints
    ctx.fillStyle = radarConfig.colors.labelText;
    ctx.font = '9px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    for (let inx = 0; inx < numPoints; inx += 1) {
        const angle = (Math.PI * 2 / numPoints) * inx - Math.PI / 2;
        const labelRadius = radius + 20; // offset from pentagon
        const x = centerX + labelRadius * Math.cos(angle);
        const y = centerY + labelRadius * Math.sin(angle);
        
        const label = radarCharElementItem[inx].name;
        
        // text alignment sucks
        if (Math.abs(angle) < 0.1) {
            // top 
            ctx.textBaseline = 'bottom';
        } else if (Math.abs(angle - Math.PI) < 0.1 || Math.abs(angle + Math.PI) < 0.1) {
            // Bottom
            ctx.textBaseline = 'top';
        } else {
            ctx.textBaseline = 'middle';
        }
        
        if (angle > -Math.PI/2 && angle < Math.PI/2) { // Right side
            ctx.textAlign = 'left';
        } else { // Left side
            ctx.textAlign = 'right';
        } 
        
        ctx.fillText(label, x, y);
    }
}

window.addEventListener('DOMContentLoaded', function() {
    drawRadarChart();
    
    // updates/refs the chart everytime the subnav dropdown is opened
    const skillMatrixNav = document.querySelector('.nav-item:nth-child(5)');
    if (skillMatrixNav) {
        skillMatrixNav.addEventListener('click', function() {
            setTimeout(drawRadarChart, 300);
        });
    }
    
    updateClock();
    setInterval(updateClock, 1000);
});

let updateClock = (/* N/A */) => {
    const now = new Date();
    const time = now.toTimeString().split(' ')[0];
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        clockElement.textContent = time;
    }
}

// nav interface toggle
function toggleNav(element) {
    element.classList.toggle('active');
}
