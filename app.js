'use strict';

function genrateRandomIndex() {
    return Math.floor(Math.random() * Buss.allImages.length);


}
let arryImage = ["boots", "breakfast", "bubblegum", "chair", "cthulhu", "dog-duck", "dragon", "pen", "pet-sweep", "scissors", "shark", "sweep", "tauntaun", "unicorn", "usb", "water-can", "wine-glass"];

let leftImageElement = document.getElementById('left-image');
let midImageElement = document.getElementById('mid-image');
let rightImageElement = document.getElementById('right-image');



let counts = 0;
let maxAttempts = 25;
let leftIndex;
let midIndex;
let rightIndex;
let testArry = [];


function Buss(name, source) {
    this.name = name;
    this.source = source;
    this.show = 0;
    this.votes = 0;
    Buss.allImages.push(this);
}


Buss.allImages = [];
for (let i = 0; i < arryImage.length; i++) {
    if (arryImage[i] === "usb") {
        new Buss(arryImage[i], `../images/${arryImage[i]}.gif`);
    } else if (arryImage[i] === "sweep") {
        new Buss(arryImage[i], `../images/${arryImage[i]}.png`);
    } else
        new Buss(arryImage[i], `../images/${arryImage[i]}.jpg`);

}





function renderImages() {
    
    let oldIndexes = [leftIndex, rightIndex, midIndex];

    leftIndex = genrateRandomIndex();
    midIndex = genrateRandomIndex();
    rightIndex = genrateRandomIndex();

    while ((leftIndex === rightIndex || rightIndex === midIndex || leftIndex === midIndex)|| (oldIndexes.includes(leftIndex) || oldIndexes.includes(rightIndex) || oldIndexes.includes(midIndex))){
        leftIndex = genrateRandomIndex();
        midIndex = genrateRandomIndex();
        rightIndex = genrateRandomIndex();

    }

    leftImageElement.src = Buss.allImages[leftIndex].source;
    Buss.allImages[leftIndex].show++;
    // console.log(Buss.allImages[leftIndex].name);
    midImageElement.src = Buss.allImages[midIndex].source;
    Buss.allImages[midIndex].show++;
    rightImageElement.src = Buss.allImages[rightIndex].source;
    Buss.allImages[rightIndex].show++;

}


renderImages();
console.log(testArry);
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
        chart();
        leftImageElement.removeEventListener('click', handleClicking);
        midImageElement.removeEventListener('click', handleClicking);
        rightImageElement.removeEventListener('click', handleClicking);

    }
};

// let button=document.getElementById("btnn");
// button.addEventListener('click', shhowList);

// function shhowList(){
//     renderList();
//     button.removeEventListener('click',shhowList);
//  };

let arrOfVotes = [];
let arrOfShown = [];
function renderList() {
    // let ul = document.getElementById('unList');
    for (let i = 0; i < Buss.allImages.length; i++) {
        arrOfVotes.push(Buss.allImages[i].votes);
        arrOfShown.push(Buss.allImages[i].show);
        // let li = document.createElement('li');
        // ul.appendChild(li);
        // li.textContent = `${Buss.allImages[i].name} it has ${Buss.allImages[i].votes} Votes and it has shown ${Buss.allImages[i].show}`;
    }
}
function chart() {
    let ctx = document.getElementById('myChart');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: arryImage,
            datasets: [{
                label: 'Number Of votes',
                data: arrOfVotes,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderWidth: 1
            }, {
                label: 'Number of Shown',
                data: arrOfShown,
                backgroundColor: [
                    "rgb(51, 153, 255)"
                ],
                borderWidth: 1
            }]
        }
    })
}


