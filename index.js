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
let achievementObj
let currentAchievementId = 0
let nextAchievement
let currentAchievement
let previousAchievement
const calGoal = document.getElementById('calories-until')
const achievementImage = document.getElementById('achievement-image')
const achievementDesc = document.getElementById('achievement-description')
//nutrition total
let nutritionTotal = {calories: 0, fat: 0, protein: 0, "serving-size": 0, sugar: 0}
let plateTotal = {}
let foodObj
//mouseover elements
let mouseoverdiv = document.getElementById('mouseoverInfo')
const mouseoverName = document.getElementById('mouseoverName')
const mouseoverCalories = document.getElementById('mouseoverCalories')
const mouseoverSugar = document.getElementById('mouseoverSugar')
const mouseoverFat = document.getElementById('mouseoverFat')
const mouseoverPro = document.getElementById('mouseoverPro')
const mouseoverServing = document.getElementById('mouseoverServing')
//rate button
const rateButton = document.getElementById('rate-my-meal')
//set mealCritic values at indices 0,2,4,6,8
const mealCritic = [
    `Keep eating!`,,
    `More french fries!`,,
    `Can we get a little more asparagus in here?`,,
    `Ice cream sounds amazing right now ;) https://www.verywellfit.com/chocolate-ice-cream-nutrition-facts-and-health-benefits-5206300`,,
    `Almost there!`,,
]
function rateMeal(randomNum){
    alert(mealCritic[randomNum])
}

function updateMealCritic(){
    mealCritic[1] = `Only ${plateTotal[6]} ${foodObj[6].name}'s?`
    mealCritic[3] = `You've eaten the same fat content as ${nutritionTotal.fat/96} sticks of butter!`
    mealCritic[5] = `You've eaten the same sugar content as ${nutritionTotal.sugar/15} oreos!`
    mealCritic[7] = `You've eaten the same protein content as ${nutritionTotal.protein/57788} cows!`
    mealCritic[9] = `You've eaten ${nutritionTotal["serving-size"]/1000000} metric tonnes of food!`
}

//fetch and call initialize
fetch("http://localhost:3000/achievements")
    .then((r) => r.json())
    .then((serverAchievementObj) => {
        achievementObj = serverAchievementObj
        fetch("http://localhost:3000/food")
            .then((r) => r.json())
            .then((serverFoodObj) => {
        init(serverFoodObj)
        foodObj = serverFoodObj
        })
    })


//initialize
function init(foodObj){
    foodObj.forEach(foodItem => {
        createFood(foodItem)
        plateTotal[`${foodItem.id}`] = 0
    })
    renderNutrition()
    getNextAchievement(currentAchievementId)
}

//fetch next achievement
function getNextAchievement(achievementId){
    //get current achievement
    if (achievementId === 0){
        currentAchievement = {'cal-req': 0}
        achievementImage.src = 'https://i.pinimg.com/564x/a0/41/cd/a041cd2d84513f925b1344978d737d8e.jpg'
        achievementDesc.textContent = 'Add Food to Begin!'
        nextAchievement = achievementObj[achievementId]
    }
    else if (achievementId === 1){
        previousAchievement = {'cal-req': 0}
        currentAchievement = achievementObj[achievementId-1]
        nextAchievement = achievementObj[achievementId]
    }
    else if (achievementId === 15){
        currentAchievement = achievementObj[achievementId-1]
        nextAchievement = {'cal-req': 999999999}
        previousAchievement = achievementObj[achievementId-2]
        finishGame()
    }
    else {
        currentAchievement = achievementObj[achievementId-1]
        nextAchievement = achievementObj[achievementId]
        previousAchievement = achievementObj[achievementId-2]
    }
    renderAchievement()
}

//renders one menu food item --P
function createFood(singleFood) {
    let foodDiv = document.getElementById('food-menu')
    let foodImage = document.createElement('img')
    foodImage.classList.add('foods')
    foodImage.id = singleFood.name
    foodImage.src = singleFood.image_url
    foodDiv.appendChild(foodImage)   
    addMouseover(foodImage, singleFood)
    addMouseout(foodImage)
    addClick(foodImage, singleFood)
}  

//render food images on menu
function createFoodImg(singleFood){
    let foodImage = document.createElement('img')
    foodImage.classList.add('foods')
    foodImage.id = singleFood.name
    foodImage.src = singleFood.image_url
    return foodImage
}

//click functionality for menu and plate
function addClick(foodImage, singleFood){
    foodImage.addEventListener('click', (e) => {
    let newImage = createFoodImg(singleFood)
    let foodDiv = document.getElementById('plate')
    newImage.id = foodImage.id + 1
        foodDiv.appendChild(newImage)
        addNutrition(singleFood)
        newImage.addEventListener('click', (e) => {
            if (currentAchievementId !== 15){
                foodDiv.removeChild(newImage)
                removeNutrition(singleFood)
            }
            else{
                alert("You've won the game! Please refresh your page to restart!")
            }
        })
    })
}

//finish game
function finishGame(){
    console.log('game finished!')
    calGoal.textContent = "You've finished all achievements!"
}

//mouseout for menu item
function addMouseout(foodImage,){
    foodImage.addEventListener('mouseout', (e) => mouseoverdiv.style.visibility = "hidden")
}

//mouseover for menu item
function addMouseover(foodImage, singleFood){
    foodImage.addEventListener('mouseover', (e) => {
        mouseoverdiv.style.visibility = "visible"
        mouseoverName.textContent = singleFood.name
        mouseoverCalories.textContent = `${singleFood.nutrition.calories} Cals`
        mouseoverSugar.textContent = `${singleFood.nutrition.sugar} g`
        mouseoverFat.textContent = `${singleFood.nutrition.fat} g`
        mouseoverPro.textContent = `${singleFood.nutrition.protein} g`
        mouseoverServing.textContent = `${singleFood.nutrition["serving-size"]} g`  
    })
}

//nutrition total -- F
function addNutrition(foodItem){
    Object.keys(foodItem.nutrition).forEach((key) => 
        nutritionTotal[key] += foodItem.nutrition[key])
    plateTotal[`${foodItem.id}`]++
    renderNutrition()
    renderAchievement()
    renderFact()
    updateMealCritic()
}

//decrement when food removed -- F
function removeNutrition(foodItem){
    Object.keys(foodItem.nutrition).forEach((key) => 
        nutritionTotal[key] -= foodItem.nutrition[key])
    renderNutrition()
    renderAchievement()
    renderFact()
    updateMealCritic()
}

//render nutrition total -- F
function renderNutrition(){
    totalCal.textContent = `Calories: ${Math.round(nutritionTotal.calories* 100)/100} cal`
    totalSug.textContent = `Sugar: ${Math.round(nutritionTotal.sugar * 100)/100} g`
    totalFat.textContent = `Fat: ${Math.round(nutritionTotal.fat * 100)/100} g`
    totalPro.textContent = `Protein: ${Math.round(nutritionTotal.protein * 100)/100} g`
    totalSS.textContent = `Serving Amount: ${Math.round(nutritionTotal["serving-size"] * 100)/100} g`
}

//render fact -- F
function renderFact(){
    f1.textContent = `melt ${(nutritionTotal.calories/80).toFixed(2)} grams of ice at 0C`
    f2.textContent = `heat ${(nutritionTotal.calories/100).toFixed(2)} grams of water from 0C to 100C`
    f3.textContent = `vaporize ${(nutritionTotal.calories/540).toFixed(2)} grams of water at 100C`
    f4.textContent = `raise a 5 lbs brick ${(nutritionTotal.calories/5322).toFixed(2)} meters off the ground`
    f5.textContent = `push a Honda Civic ${(nutritionTotal.calories/303).toFixed(2)} meters at constant acceleration (1 m/s^2) on a frictionless surface`
    f6.textContent = `equivalent calorie content of ${(nutritionTotal.calories/190).toFixed(2)} krispy kreme donuts`
    f7.textContent = `power New York City for ${(nutritionTotal.calories/3378656000000).toExponential(2)} seconds`
    f8.textContent = `cook ${(nutritionTotal.calories/43977).toFixed(2)} eggs`
    f9.textContent = `generate ${(nutritionTotal.calories/641186.49).toFixed(3)} horsepower (assuming all food consumed in 1 hour)`
    f10.textContent = `accelerate ${(nutritionTotal.calories/131453).toFixed(2)} duck(s) to a velocity of 1000 m/s`
    f11.textContent = `equivalent energy content of ${(nutritionTotal.calories/28746746).toExponential(2)} gallons of gasoline`
    f12.textContent = `cook ${(nutritionTotal.calories/110000).toFixed(2)} chickens`
    f13.textContent = `live for ${(nutritionTotal.calories/2400).toFixed(2)} days (assuming calorie intake of an 18-year-old)`
    f14.textContent = `rotate the Earth by ${(nutritionTotal.calories/1670000000000000000000000000000).toExponential(2)} degrees at its ordinary rotational velocity`
    f15.textContent = `graduate ${(nutritionTotal.calories/58320).toFixed(2)} students from Flatiron SE bootcamp`
}

//get next fact (reveals next fact)  -- F
function getNextFact(){
    if (currentAchievementId === 0){
        for (let i = 1; i <= 15; i++)
            document.getElementById(`fact-${i}`).style = 'display: none'
    }
    else {
        for (let i = 1; i <= currentAchievementId; i++)
            document.getElementById(`fact-${i}`).style = ''
    }
    if (currentAchievementId < 15){
        //console.log(`hiding fact ${currentAchievementId+1}`)
        document.getElementById(`fact-${currentAchievementId+1}`).style = 'display: none'
    }
}

//render achievement -- F
function renderAchievement(){
    if (nutritionTotal.calories >= nextAchievement['cal-req']){
        //update achievement information box with new achievement
        achievementImage.src = nextAchievement.image_url
        achievementDesc.textContent = `${nextAchievement.description}`
        currentAchievementId++
        getNextAchievement(currentAchievementId)
        getNextFact()
        //if user skipped achievements
        if(nutritionTotal.calories >= nextAchievement['cal-req'])
        renderAchievement()
    }
    //if user removed food 
    if (nutritionTotal.calories < currentAchievement['cal-req']){
        //update achievement information box with old achievement
        achievementImage.src = previousAchievement.image_url,
        achievementDesc.textContent = `${previousAchievement.description}`
        currentAchievementId--
        getNextAchievement(currentAchievementId)
        getNextFact()
    }
    //update goalpost
    if (currentAchievementId < 15)
        calGoal.textContent = `${nextAchievement['cal-req'] - nutritionTotal.calories} calories until next achievement!`
}

//rate-my-meal button
rateButton.addEventListener('click',(e) =>{
    //random number between 0-9 based on total calories
    let randomNum = (nutritionTotal.calories)%10
    //call rateMeal
    rateMeal(randomNum, nutritionTotal, plateTotal)
})

//food form -- S
foodForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const newFood = {
        name: e.target.name.value,
        image_url: e.target["image-input"].value,
        nutrition:{
            calories: Number(e.target.calories.value),
            sugar: Number(e.target.sugar.value),
            fat: Number(e.target.fat.value),
            protein: Number(e.target.protein.value),
            "serving-size": Number(e.target.servings.value)
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
    foodForm.reset()
})