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
//nutrition total
let nutritionTotal = {calories: 0, fat: 0, protein: 0, "serving-size": 0, sugar: 0}
let testFoodObj

//fetch and call initialize
fetch("http://localhost:3000/food")
    .then((r) => r.json())
    .then((foodObj) => {
        //init(foodObj)
        testFoodObj = foodObj
        //console.log(foodObj[0].nutrition)
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
    Object.keys(foodItem.nutrition).forEach((key) => 
        nutritionTotal[key] += foodItem.nutrition[key])
    renderNutrition(foodItem)
}

//render nutrition total -- F
function renderNutrition(foodItem){
    totalCal.textContent = `Calories: ${nutritionTotal.calories} cal`
    totalSug.textContent = `Sugar: ${nutritionTotal.sugar} g`
    totalFat.textContent = `Fat: ${nutritionTotal.fat} g`
    totalPro.textContent = `Protein: ${nutritionTotal.protein} g`
    totalSS.textContent = `Serving Amount: ${nutritionTotal["serving-size"]} g`
}

//facts -- F

//food form -- S
foodForm.addEventListener('submit', (e) =>{
})