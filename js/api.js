document.getElementById('button-search').addEventListener('click', function () {
    const searchInput = document.getElementById('form-search');
    const searchValue = searchInput.value;
    searchInput.value = '';
    const errorDiv = document.getElementById('error');
    if (searchValue == '') {
        errorDiv.innerHTML = `
            <p class="text-danger">Please write meaningful keyword!</p>
        `;
    }
    else {
        errorDiv.innerHTML = '';
        const dataURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
        fetch(dataURL)
            .then(res => res.json())
            .then(data => displayMeals(data.meals));
    }
});

const displayMeals = meals => {
    const mealDiv = document.getElementById('all-meal');
    // mealDiv.innerHTML = '';
    mealDiv.textContent = '';
    const errorDiv = document.getElementById('error');
    if (meals == null) {
        errorDiv.innerHTML = `
            <p class="text-danger">No result found! Please write meaningful keyword.</p>
        `;
    }
    else {
        meals.forEach(meal => {
            errorDiv.innerHTML = '';
            const col = document.createElement('div');
            col.classList.add('col-md-4');
            col.innerHTML = `
                <div onclick="mealDetails(${meal.idMeal})" class="single-meal card" style="width: 100%; margin-bottom: 30px" data-bs-toggle="modal" data-bs-target="#mealDetails">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal.slice(0, 20)}...</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 120)}</p>
                    </div>
                </div>
            `;
            mealDiv.appendChild(col);
        })
    }
}

const mealDetails = mealID => {
    console.log(mealID);
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
    fetch(URL)
        .then(res => res.json())
        .then(date => displayDetails(date.meals[0]));
}

const displayDetails = mealDetails => {
    console.log(mealDetails);
    const detailsDiv = document.getElementById('modal-body');
    detailsDiv.innerHTML = `
        <img src="${mealDetails.strMealThumb}" alt="" width="100%" height="auto">
        <p class="mt-3">${mealDetails.strInstructions}</p>
    `;
}