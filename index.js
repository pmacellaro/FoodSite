//global variables
const dropPlate = document.getElementById('plate') //paul
const foodMenu = document.getElementById('food-menu') //shanley 
const nutritionBox = document.getElementById('nutrition-total') //frankie
const facts = document.getElementById('facts') 
const foodForm = document.getElementById('food-form') //shanley
//nutrition total list elements
const totalCal = document.getElementById('calories-total')
const totalSug = document.getElementById('sugar-total')
const totalFat = document.getElementById('fat-total')
const totalPro = document.getElementById('protein-total')
const totalSS = document.getElementById('serving-size-total')
//achievement elements
const calGoal = document.getElementById('calories-until')
const achievementImage = document.getElementById('achievement-image')
const achievementDesc = document.getElementById('achievement-description')
//nutrition total
let nutritionTotal = {calories: 0, fat: 0, protein: 0, "serving-size": 0, sugar: 0}
let testFoodObj

//fetch and call initialize
fetch("http://localhost:3000/food")
    .then((r) => r.json())
    .then((foodObj) => {
        init(foodObj)
    })

//initialize
function init(foodObj){
    foodObj.forEach(foodItem => createFood(foodItem))
    renderNutrition()
}

//renders one menu food item, calls dragDrop -- P
function renderMenuItem(foodItem){
    //call dragDrop
    //call addNutrition
}

function createFood(singleFood) {
    let foodDiv = document.getElementById('food-menu')
    let foodItem = document.createElement('img')
    foodItem.classList.add('foods')
    foodItem.src = singleFood.image_url
    foodDiv.appendChild(foodItem)   
}   
//drag and drop feature -- P
function dragDrop(foodItemElement){
}

//nutrition total -- F
function addNutrition(foodItem){
    Object.keys(foodItem.nutrition).forEach((key) => 
        nutritionTotal[key] += foodItem.nutrition[key])
    renderNutrition()
}

//render nutrition total -- F
function renderNutrition(){
    totalCal.textContent = `Calories: ${nutritionTotal.calories} cal`
    totalSug.textContent = `Sugar: ${nutritionTotal.sugar} g`
    totalFat.textContent = `Fat: ${nutritionTotal.fat} g`
    totalPro.textContent = `Protein: ${nutritionTotal.protein} g`
    totalSS.textContent = `Serving Amount: ${nutritionTotal["serving-size"]} g`
}

//render achievement -- F
function renderAchievement(){
    
}

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
    const postNewFood = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(newFood)
    }
    fetch("http://localhost:3000/food", postNewFood)
    .then(r => r.json())
    .then( newFood => createFood(newFood))

    
    
})