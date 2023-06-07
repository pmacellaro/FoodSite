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
//fact elements
const f1 = document.getElementById('fact-1')
const f2 = document.getElementById('fact-2')
const f3 = document.getElementById('fact-3')
const f4 = document.getElementById('fact-4')
const f5 = document.getElementById('fact-5')
const f6 = document.getElementById('fact-6')
const f7 = document.getElementById('fact-7')
const f8 = document.getElementById('fact-8')
const f9 = document.getElementById('fact-9')
const f10 = document.getElementById('fact-10')
const f11 = document.getElementById('fact-11')
const f12 = document.getElementById('fact-12')
const f13 = document.getElementById('fact-13')
const f14 = document.getElementById('fact-14')
const f15 = document.getElementById('fact-15')
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
    foodImage.id = singleFood.name
    foodImage.src = singleFood.image_url
    foodDiv.appendChild(foodImage)   
    addMouseover(foodImage, singleFood)
    addClick(foodImage, singleFood)
}  
function createFoodImg(singleFood){
    let foodImage = document.createElement('img')
    foodImage.classList.add('foods')
    foodImage.id = singleFood.name
    foodImage.src = singleFood.image_url
    return foodImage
}
function addClick(foodImage, singleFood){
    foodImage.addEventListener('click', (e) => {
    let newImage = createFoodImg(singleFood)
    let foodDiv = document.getElementById('plate')
    newImage.id = foodImage.id + 1
        foodDiv.appendChild(newImage)
        addNutrition(singleFood)
        newImage.addEventListener('click', (e) => {
        foodDiv.removeChild(newImage)
        })
    })
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
    renderFact()
}

//render nutrition total -- F
function renderNutrition(){
    totalCal.textContent = `Calories: ${nutritionTotal.calories} cal`
    totalSug.textContent = `Sugar: ${nutritionTotal.sugar} g`
    totalFat.textContent = `Fat: ${nutritionTotal.fat} g`
    totalPro.textContent = `Protein: ${nutritionTotal.protein} g`
    totalSS.textContent = `Serving Amount: ${nutritionTotal["serving-size"]} g`
}

//render fact -- F
function renderFact(){
    f1.textContent = `melt ${nutritionTotal.calories/80} grams of ice at 0C`
    f2.textContent = `heat ${nutritionTotal.calories/100} grams of water from 0C to 100C`
    f3.textContent = `vaporize ${nutritionTotal.calories/540} grams of water at 100C`
    f4.textContent = `raise a 5 lbs brick ${nutritionTotal.calories/5322} meters off the ground`
    f5.textContent = `push a Honda Civic ${nutritionTotal.calories/303} meters at constant acceleration (1 m/s^2) on a frictionless surface`
    f6.textContent = `pending ${nutritionTotal.calories/5.322}`
    f7.textContent = `pending ${nutritionTotal.calories/5.322}`
    f8.textContent = `cook ${nutritionTotal.calories/43977} eggs`
    f9.textContent = `generate ${nutritionTotal.calories/641186.49} horsepower (assuming all food consumed in 1 hour)`
    f10.textContent = `accelerate ${nutritionTotal.calories/131453} ducks to a velocity of 1000 m/s`
    f11.textContent = `equivalent energy content of ${nutritionTotal.calories/28746746} gallons of gasoline`
    f12.textContent = `cook ${nutritionTotal.calories/110000} chickens`
    f13.textContent = `pending ${nutritionTotal.calories/5.322}`
    f14.textContent = `rotate the Earth by ${nutritionTotal.calories/1670000000000000000000000000000} degrees at its ordinary rotational velocity`
    f15.textContent = `pending ${nutritionTotal.calories/5.322}`
}

//get next fact (reveals next fact)  -- F
function getNextFact(){
    document.getElementById(`fact-${nextAchievementId-1}`).style = ''
}

//render achievement -- F
function renderAchievement(){
    //if goalpost is met
    if (nutritionTotal.calories >= nextAchievement['cal-req']){
        //update achievement information box with new achievement
        achievementImage.src = nextAchievement.image_url
        achievementDesc.textContent = `Enough energy to ${nextAchievement.description}`
        //get next fact and achievement
        getNextFact()
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