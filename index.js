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
let nextAchievementId = 1
let nextAchievement
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
        testFoodObj = foodObj
    })

//initialize
function init(foodObj){
    foodObj.forEach(foodItem => createFood(foodItem))
    console.log('hello')
    renderNutrition()
    getNextAchievement()
    console.log(nextAchievement)
}

//fetch next achievement
function getNextAchievement(){
    fetch(`http://localhost:3000/achievements/${nextAchievementId}`)
        .then((r) => r.json())
        .then((achievementObj) => {
            nextAchievement = achievementObj
            renderAchievement()
        })
    nextAchievementId++
}

//renders one menu food item, calls dragDrop and addMouseover -- P
function createFood(singleFood) {
    let foodDiv = document.getElementById('food-menu')
    let foodImage = document.createElement('img')
    foodImage.classList.add('foods')
    foodImage.src = singleFood.image_url
    foodDiv.appendChild(foodImage)   
    addMouseover(foodImage, singleFood)
}  

//mouseover for menu item
function addMouseover(foodImage, singleFood){
    foodImage.addEventListener('mouseover', (e) => {
        const mouseoverName = document.getElementById('mouseoverName')
        const mouseoverCalories = document.getElementById('mouseoverCalories')
        const mouseoverSugar = document.getElementById('mouseoverSugar')
        const mouseoverFat = document.getElementById('mouseoverFat')
        const mouseoverPro = document.getElementById('mouseoverPro')
        const mouseoverServing = document.getElementById('mouseoverServing')

        mouseoverName.textContent = singleFood.name
        mouseoverCalories.textContent = `${singleFood.nutrition.calories} Cals`
        mouseoverSugar.textContent = `${singleFood.nutrition.sugar} g`
        mouseoverFat.textContent = `${singleFood.nutrition.fat} g`
        mouseoverPro.textContent = `${singleFood.nutrition.protein} g`
        mouseoverServing.textContent = `${singleFood.nutrition["serving-size"]} g`
        
    })
}

//drag and drop feature -- P
function dragDrop(foodItemElement){
    let foodItem = document.createElement('img')
    foodItem.id = singleFood.name
    foodItem.draggable=true
    foodItem.classList.add('foods')
    foodItem.src = singleFood.image_url
    foodDiv.appendChild(foodItem)   
}   

//nutrition total -- F
function addNutrition(foodItem){
    Object.keys(foodItem.nutrition).forEach((key) => 
        nutritionTotal[key] += foodItem.nutrition[key])
    renderNutrition()
    renderAchievement()
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
    //if goalpost is met
    if (nutritionTotal.calories >= nextAchievement['cal-req']){
        //update achievement information box with new achievement
        achievementImage.src = nextAchievement.image_url
        achievementDesc.textContent = nextAchievement.description
        //get next achievement
        getNextAchievement()
    }
    //update goalpost
    calGoal.textContent = `${nextAchievement['cal-req'] - nutritionTotal.calories} calories until next achievement!`
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