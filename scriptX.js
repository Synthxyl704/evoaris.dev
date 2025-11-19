let  updateClock = (/* nothing */) => {
    const now = new Date();
    const time = now.toTimeString().split(' ')[0];
    document.getElementById('clock').textContent = time;
}

setInterval(updateClock, 1000); // every second
updateClock();

// nav interface toggle
function toggleNav(element) {
    element.classList.toggle('active');
}
