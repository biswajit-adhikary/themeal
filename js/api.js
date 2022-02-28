document.getElementById('button-search').addEventListener('click', function () {
    toggleSpinner('block');
    const mealDiv = document.getElementById('all-meal');
    mealDiv.textContent = '';
    const searchInput = document.getElementById('form-search');
    const searchValue = searchInput.value;
    searchInput.value = '';
    const errorDiv = document.getElementById('error');
    if (searchValue == '') {
        errorDiv.innerHTML = `
            <p class="text-danger">Please write meaningful keyword!</p>
        `;
        toggleSpinner('none');
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
        toggleSpinner('none');
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
        });
        toggleSpinner('none');
    }
}

const mealDetails = mealID => {
    const detailsDiv = document.getElementById('modal-body');
    detailsDiv.textContent = '';
    toggleSpinnerTwo('block');
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
    fetch(URL)
        .then(res => res.json())
        .then(date => displayDetails(date.meals[0]));
}

const displayDetails = mealDetails => {
    toggleSpinnerTwo('none');
    const detailsDiv = document.getElementById('modal-body');
    detailsDiv.innerHTML = `
        <img src="${mealDetails.strMealThumb}" alt="" width="100%" height="auto">
        <p class="mt-3">${mealDetails.strInstructions}</p>
    `;
}

const toggleSpinner = style => {
    const spinDiv = document.getElementById('spinner');
    spinDiv.style.display = style;
}

const toggleSpinnerTwo = style => {
    const spinDiv = document.getElementById('spinner-two');
    spinDiv.style.display = style;
}