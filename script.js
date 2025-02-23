document.addEventListener("DOMContentLoaded", () => {
    loadRecipes();
});

function addRecipe() {
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;

    if (title && description) {
        let recipe = { title, description };
        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipes.push(recipe);
        localStorage.setItem("recipes", JSON.stringify(recipes));
        loadRecipes();
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
    }
}

function loadRecipes() {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    let recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = "";

    recipes.forEach((recipe, index) => {
        let recipeItem = document.createElement("div");
        recipeItem.classList.add("recipe");
        recipeItem.innerHTML = `
            <h3>${recipe.title}</h3>
            <p>${recipe.description}</p>
            <button onclick="deleteRecipe(${index})">Delete</button>
        `;
        recipeList.appendChild(recipeItem);
    });
}

function deleteRecipe(index) {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.splice(index, 1);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    loadRecipes();
}
