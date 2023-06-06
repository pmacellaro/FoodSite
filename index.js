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
    createFood(foodObj)
}

//renders one menu food item, calls dragDrop -- P
function renderMenuItem(foodItem){
    //call dragDrop
    //call addNutrition
}

function createFood(foodArray) {
    foodArray.forEach((element) => {
    let foodDiv = document.getElementById('food-menu')
    let foodItem = document.createElement('img')
    foodItem.classList.add('foods')
    foodItem.src = element.image_url
    foodDiv.appendChild(foodItem)   
    });
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
    e.preventDefault()
    const newFood = {
        name: e.target.name.value,
        image_url: e.target["image-input"].value,
        nutrition:{
            calories: e.target.servings.value,
            sugar: e.target.calories.value,
            fat: e.target.fat.value,
            protein: e.target.protein.value,
            "serving-size": e.target.servings.value
        },
        nutrition_url: e.target["nutrition_url"].value
    }

    
    
})