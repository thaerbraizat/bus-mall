'use strict';

function genrateRandomIndex() {
    return Math.floor(Math.random() * Buss.allImages.length);


}
let arryImage = ["boots", "breakfast", "bubblegum", "chair", "cthulhu", "dog-duck", "dragon", "pen", "pet-sweep", "scissors", "shark","sweep", "tauntaun", "unicorn","usb", "water-can", "wine-glass"];

let leftImageElement = document.getElementById('left-image');
let midImageElement = document.getElementById('mid-image');
let rightImageElement = document.getElementById('right-image');



let counts = 0;
let maxAttempts = 25;
let leftIndex;
let midIndex;
let rightIndex;

function Buss(name, source) {
    this.name = name;
    this.source = source;
    this.show = 0;
    this.votes = 0;
    Buss.allImages.push(this);
}


Buss.allImages = [];
for (let i = 0; i < arryImage.length; i++) {
    if(arryImage[i]=== "usb"){
        new Buss(arryImage[i], `../images/${arryImage[i]}.gif`);
    }else if(arryImage[i]=== "sweep"){
        new Buss(arryImage[i], `../images/${arryImage[i]}.png`);
    }else
    new Buss(arryImage[i], `../images/${arryImage[i]}.jpg`);

}



console.log(Buss.allImages);

function renderImages() {
    leftIndex = genrateRandomIndex();
    midIndex = genrateRandomIndex();
    // console.log(Buss.allImages[midIndex]);
    rightIndex = genrateRandomIndex();

    while (leftIndex===rightIndex || rightIndex===midIndex||leftIndex===midIndex) {
        leftIndex = genrateRandomIndex();
        midIndex = genrateRandomIndex();
        rightIndex = genrateRandomIndex();

    }

    leftImageElement.src = Buss.allImages[leftIndex].source;
    Buss.allImages[leftIndex].show++;
    midImageElement.src = Buss.allImages[midIndex].source;
    Buss.allImages[midIndex].show++;
    rightImageElement.src = Buss.allImages[rightIndex].source;
    Buss.allImages[rightIndex].show++;

}


renderImages();
// function track(){
//     for (let i = 0; i < this.allImages.length; i++) {


//     }




leftImageElement.addEventListener('click', handleClicking);
midImageElement.addEventListener('click', handleClicking);
rightImageElement.addEventListener('click', handleClicking);


function handleClicking(event) {

    counts++;
    if (maxAttempts >= counts) {
        console.log(event.target);
        if (event.target.id === 'left-image') {
            Buss.allImages[leftIndex].votes++;
        } else if (event.target.id === 'mid-image') {
            Buss.allImages[midIndex].votes++;
        } else if (event.target.id === 'right-image') {
            Buss.allImages[rightIndex].votes++;
        }
        renderImages();

    } else {
        renderList()
        leftImageElement.removeEventListener('click', handleClicking);
        midImageElement.removeEventListener('click', handleClicking);
        rightImageElement.removeEventListener('click', handleClicking);

    }
}



function renderList() {
    let ul = document.getElementById('unList');
    for (let i = 0; i < Buss.allImages.length; i++) {
        let li = document.createElement('li');
        ul.appendChild(li);
        li.textContent = `${Buss.allImages[i].name} it has ${Buss.allImages[i].votes} Votes and it has shown ${Buss.allImages[i].show}`;
    }
}
