//global variables
const dropPlate = document.getElementById('plate') //paul
const foodMenu = document.getElementById('food-menu') //shanley 
const nutritionBox = document.getElementById('nutrition-total') //frankie
const facts = document.getElementById('facts') 
const foodForm = document.getElementById('food-form') //shanley

//fetch and call initialize
fetch("http://localhost:3000/food")
    .then((r) => r.json())
    .then((foodObj) => {
        init(foodObj)
    })

//initialize
function init(foodObj){
}

//renders one menu food item, calls dragDrop -- P
function renderMenuItem(foodItem){
    //call dragDrop
    //call addNutrition
}

//drag and drop feature -- P
function dragDrop(foodItemElement){
}

//nutrition total -- F
function addNutrition(foodItem){
}

//facts -- F

//food form -- S
foodForm.addEventListener('submit', (e) =>{
})