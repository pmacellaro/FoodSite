# Calorosity
A tool for learning about nutritional information about various food items as related to assorted science facts and fun achievements. The dieting website nobody asked for!

## User Experience:
Select food items from a pre-built menu with mouse-over displaying nutritional information of single food items. Add and remove food items to a plate to see total nutritional information. Submit custom food items to create new food items on the menu. Receive ratings of their plate by clicking a rate-my-meal button. Unlock new achievements and facts about the total nutritional information as total calories increases.

## Features:
- Listeners:
    - **Click** food items from menu to add to plate
    - **Click** food items from plate to remove from plate
    - **Submit** food form to add food item to menu (POST working)
    - **Mouseover** food items to view nutritional information
        -  **Mouseout** hides nutritional information
    - **Click** rate-my-meal button for rating alerts about the plate
- Auto-updating Lists:
    - _Science Facts_ unlocked based on total nutritional values of plate
    - _Achievements_ based on total calories of plate 
- API made-from-scratch with resources:
    - Food items
    - Achievements

## Challenges:
- Git-Hub coordination
- Creative work 
- Achievement and Facts progression 
    - backwards progression as user removes food
    - skipping progression if user skips achievements (solved with **recursion**!)
- CSS and aesthetic features
    - Rendering food on plate

## Would-like:
- Drag and drop - `js`
- Mouseover information box styled as nutritional box - `css`
- Tidy plate rendering - `css`
- Mouseover listener to pause game finish animation - `js`
- Plate total section (currently only accessible to rate-meal button) - `js`

## Next-steps:
- Add accessibility attributes to HTML
- Game-design Improvements
    - Food item tiered unlocking
    - Food form remodeled as food selector from db.json library
    - Branching achievements and other easter eggs
- Restructuring db.json for...
    - **Persisting**: plate, facts, achievements
    - Facts not hard-coded into index.js
    - Meal-rater not hard-coded into index.js
    
### Thank you for viewing our project. 

--Shanley Caswell</br>
--Paul Macellaro</br>
--Francesco Wai
