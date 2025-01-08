const searchContainer= document.getElementById("search-bar")
const submitButton= document.getElementById("btn-search")
const resultHeading= document.getElementById("meal-result-heading")
const mealsElement= document.getElementById("meals")
const singleMealsElement= document.getElementById("single-meals")

console.log(searchContainer.value);


const findMeals = (event) =>
{
    
    // console.log("click or submit");
    const searchItem= searchContainer.value
    // console.log(searchItem)

    if(searchItem.trim())
    {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`)
        .then(res=>res.json())
        .then(data=>
        {
            console.log(data);
            resultHeading.innerHTML=`
                <h3>Search result for ${searchItem}</h3>
            `
            if(data.meals === null)
            {
                resultHeading.innerHTML=`Sorry, \"${searchItem}\" is not in our menu.`
            }
            else
            {
               
                mealsElement.innerHTML=data.meals.map((meal) =>
                
                    `
                    <div class= "meal" itemID= "${meal.idMeal}">
                    <img src="${meal.strMealThumb}" >
                    
                    <div class="meal-info" data-mealId="${meal.idMeal}">
                        <h3>${meal.strMeal }</h3>
                    </div>

                    </div>`
                ).join("")
                

            }
        }
        )
        searchContainer.value=""
        
    }
    else alert("Please input")
}

const ingredient =(meal)=>
{
    const ingredientItem= []
    for(let i=1; i<=20; i++)
    {
       
        if(meal[`strIngredient${i}`])
        {
            ingredientItem.push(`${meal[`strIngredient${i}`]}`)

        }
        else break;
    }
    // console.log(ingredientItem);
    // const test= ingredientItem.map(item =>
    // {
    //     console.log(item);
    // }
    // )
    singleMealsElement.innerHTML=
    `
        <div class="single-meal">
        <img src="${meal.strMealThumb}" class="img-ingred">
            <h1 class="meal-title">${meal.strMeal}</h1>
            <hr>
        <div class="meal-ingredient-title">
        <h3>Ingredients:</h3>
        
            <ul>
                ${ingredientItem.map((item) => `<li>${item}</li>`).join("")}
               
                
            </ul>
        </div>
        
        </div>

    `

}

const foodDetails = (itemID) =>
{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemID}`)
    .then(res=>res.json())
    .then(data => 
    {
        const meal= data.meals[0]
        console.log(meal);
        ingredient(meal)
    }
    )
    
}


submitButton.addEventListener("click", findMeals)
mealsElement.addEventListener("click", (e)=>
{
    const mealInfo=e.composedPath().find((single)=>
    {
        console.log(single.classList)
        
        if(single.classList) 
        {
            return single.classList.contains("meal");
        }
        else
        {
            return console.log("Nothing");
        }
        
        

        
       
    })
    if(mealInfo)
        {
            const mealId= mealInfo.getAttribute("itemID");
            // console.log(mealId);
            foodDetails(mealId)
        }
        
    
})


