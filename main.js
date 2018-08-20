var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

c.width = document.body.clientWidth;
c.height = window.innerHeight;

//Drawing functions
function drawBackground() {
    var grd = ctx.createRadialGradient(c.width / 2, c.height / 2, c.width / 5, c.width / 2, c.height / 2, c.width / 1.1);
    grd.addColorStop(0, "#001433");
    grd.addColorStop(1, "#425979");

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, c.width, c.height);
}

function drawStars() {
    var j, star;
    for (j = 0; j < numStars; j++) {
        star = stars[j];
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2, false);
        ctx.fillStyle = "white";
        ctx.fill();
    }
}

function drawsSun(x, y, index) {
    var sun = {
        outRadius: c.height / 9,
        innerRadius: c.height / (12 + index),
        outColor: "#fdd835",
        innerColor: "#ffeb3b",
    }

    ctx.beginPath();
    ctx.arc(x, y, sun.outRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = sun.outColor;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, sun.innerRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = sun.innerColor;
    ctx.fill();
}

function drawsEarth(x, y) {
    var earth = {
        outRadius: c.height / 15,
        Color: "#81D4FA",
    }

    ctx.beginPath();
    ctx.arc(x, y, earth.outRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = earth.Color;
    ctx.fill();
}

function drawsMoon(x, y) {
    var moon = {
        outRadius: c.height / 35,
        innerRadius: c.height / 45,
        outColor: "#E0E0E0",
        innerColor: "#EEEEEE",
    }

    ctx.beginPath();
    ctx.arc(x, y, moon.outRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = moon.outColor;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, moon.innerRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = moon.innerColor;
    ctx.fill();
}

//Determines position of a body orbiting another
function orbitalPosition(orbitalX, orbitalY, radius, degrees) {
    var rad = degrees * Math.PI / 180;

    var position = {
        y: Math.sin(rad) * radius + orbitalY,
        x: Math.cos(rad) * radius + orbitalX
    }
    return position;
}

//Constants
const sun = {
    x: c.width / 2,
    y: c.height / 2
}
const earthSunRadius = c.height / 2.7;
const moonEarthRadius = c.height / 8.5;

//Animation functions
//Animates sun
function sunFrame() {
    drawsSun(sun.x, sun.y, sunIndex);
    if (sunDirection === true) {
        sunIndex += 0.1;
        if (sunIndex > 2) {
            sunIndex = 2;
            sunDirection = false;
        }
    } else {
        sunIndex -= 0.1;
        if (sunIndex < 0) {
            sunIndex = 0;
            sunDirection = true;
        }
    }
}

//Animates earth and moon
setInterval(frame, 10);
var earthAngle = 0;
var moonAngle = 0;
var sunIndex = 0;
var sunDirection = true

var stars = [];
var numStars = 130;

for (var i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        r: Math.random() * 1.5 + 0.5,
    })
}

function frame() {
    ctx.clearRect(0, 0, c.width, c.height);

    drawBackground();
    drawStars();

    sunFrame();

    var earth = orbitalPosition(sun.x, sun.y, earthSunRadius, earthAngle);
    drawsEarth(earth.x, earth.y);

    earthAngle += 0.084;
    if (earthAngle > 359) earthAngle = 0;

    var moon = orbitalPosition(earth.x, earth.y, moonEarthRadius, moonAngle);
    drawsMoon(moon.x, moon.y);

    moonAngle++;
    if (moonAngle > 359) moonAngle = 0;
}