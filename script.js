const textarea = document.getElementById('myTextarea');
const button = document.querySelector('.btn')
const bgText = document.querySelector('.bg-text');
// const circle = document.querySelector('.clipPath-circle')
let newColor;
button.addEventListener('click', (e) => {
    e.preventDefault();
    newColor = document.querySelector('.newColor-input').value;
    textarea.style.background = newColor;
    // circle.style.background = newColor;
    // circle.classList.add('active');
    // bgText.innerText = newColor
})


function saveToLocalStorage() {
    localStorage.setItem("savedText", textarea.value);
}

if (localStorage.getItem("savedText")) {
    textarea.value = localStorage.getItem("savedText");

}

textarea.addEventListener("input", saveToLocalStorage);

let progress = document.getElementById('progress')
let song = document.getElementById('song')
let ctrlIcon = document.getElementById('ctrlIcon')
song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;

}
function playPause() {
    if (ctrlIcon.classList.contains("fa-pause")) {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play")
    } else {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play")
    }
}

if (song.play()) {
    setInterval(() => {
        progress.value = song.currentTime;
    }, 500)
}

progress.onchange = function () {
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play")
}


// ----------toggle-------------------------

// let SliderBtn = document.getElementById('sliderBtn');
// let textArea = document.getElementById('myTextarea');
// let textContianer = document.getElementByClassName('textContainer')
// SliderBtn.addEventListener('change', (e) => {
//     if (SliderBtn.checked) {
//         console.log("checked")
//         textContianer[0].classList.add('hidden')
//         textArea.classList.add('hidden')


//         //    textArea.style.display = "none"

//     } else {

//     }
// });

let SliderBtn = document.getElementById('sliderBtn');
let textArea = document.getElementById('myTextarea');
let textContainer = document.getElementsByClassName('textContainer'); // Corrected method name
let canVas = document.getElementById('canvas');
let navBar = document.getElementsByClassName('nav')
let inputGroup = document.getElementsByClassName('input-group')
SliderBtn.addEventListener('change', (e) => {
    if (SliderBtn.checked) {
        console.log("checked");
        canVas.classList.remove('hidden');
        navBar[0].classList.remove('hidden')
        inputGroup[0].classList.add('hidden')
        if (textContainer.length > 0) {
            
            textContainer[0].classList.add('hidden');
        }
        if (textArea) {
            textArea.classList.add('hidden');
        }
    } else {
        console.log("unchecked");
        canVas.classList.add('hidden')
        navBar[0].classList.add('hidden')
        inputGroup[0].classList.remove('hidden')
        if (textContainer.length > 0) {
            textContainer[0].classList.remove('hidden');
        }
        if (textArea) {
            textArea.classList.remove('hidden');
        }
    }
});


// ----------------------for canvas----------------------------------
const canvas = document.getElementById("canvas")
const body = document.querySelector('body');
canvas.height = window.innerHeight
canvas.width = window.innerWidth
var theColor = '';
var lineW = 5;
let prevX = null
let prevY = null
let draw = false

// body.style.backgroundColor = "#FFFFFF";
var theInput = document.getElementById("favcolor");

theInput.addEventListener("input", function () {
    theColor = theInput.value;
    canvas.style.backgroundColor = theColor;
}, false);

const ctx = canvas.getContext("2d")
ctx.lineWidth = lineW;

document.getElementById("ageInputId").oninput = function () {
    draw = null
    lineW = document.getElementById("ageInputId").value;
    document.getElementById("ageOutputId").innerHTML = lineW;
    ctx.lineWidth = lineW;
};

let clrs = document.querySelectorAll(".clr")
clrs = Array.from(clrs)
clrs.forEach(clr => {
    clr.addEventListener("click", () => {
        ctx.strokeStyle = clr.dataset.clr
    })
})

let clearBtn = document.querySelector(".clear")
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

let saveBtn = document.querySelector(".save")
saveBtn.addEventListener("click", () => {
    let data = canvas.toDataURL("imag/png")
    let a = document.createElement("a")
    a.href = data
    a.download = "sketch.png"
    a.click()
})

window.addEventListener("mousedown", (e) => draw = true)
window.addEventListener("mouseup", (e) => draw = false)

window.addEventListener("mousemove", (e) => {
    if (prevX == null || prevY == null || !draw) {
        prevX = e.clientX
        prevY = e.clientY
        return
    }

    let currentX = e.clientX
    let currentY = e.clientY

    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currentX, currentY)
    ctx.stroke()

    prevX = currentX
    prevY = currentY
})
