document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const searchBox = document.getElementById('searchBox');
    const recipeContainer = document.getElementById('recipeContainer');
    const addRecipeButton = document.getElementById('addRecipeButton');
    const addRecipeForm = document.getElementById('addRecipeForm');
    const recipeForm = document.getElementById('recipeForm');
    const cancelButton = document.getElementById('cancelButton');

    let userRecipes = JSON.parse(localStorage.getItem('userRecipes')) || [];

    //Array of hard coded recipes 
    const hardcodedRecipes = [
        { title: "Masala Chai", recipe: "A spiced tea made with milk, sugar, and black tea leaves." },
        { title: "Green Tea", recipe: "A healthy tea made with green tea leaves, best served without sugar." },
        { title: "Ginger Tea", recipe: "A refreshing tea made with ginger, lemon, and honey." },
        { title: "Black Tea", recipe: "A classic tea made with black tea leaves and served with or without milk." },
        { title: "Mint Tea", recipe: "A soothing tea made with fresh mint leaves, often served with sugar." },
        { title: "Earl Grey Tea", recipe: "A fragrant tea made with black tea leaves and bergamot orange." },
        { title: "Chamomile Tea", recipe: "A calming herbal tea made with chamomile flowers." },
        { title: "Hibiscus Tea", recipe: "A tart and refreshing tea made with dried hibiscus flowers." },
        { title: "Lemon Tea", recipe: "A zesty tea made with black tea and fresh lemon juice." },
        { title: "Oolong Tea", recipe: "A traditional Chinese tea that is partially fermented, offering a unique flavor." },
        { title: "Chai Latte", recipe: "A creamy tea made with spiced tea and steamed milk." },
        { title: "Peppermint Tea", recipe: "A cool and refreshing tea made with peppermint leaves." }
    ];

    //it will show recipe from 
    addRecipeButton.addEventListener('click', function() {
        addRecipeForm.classList.remove('hidden');
    });

    //it will hde the form 
    cancelButton.addEventListener('click', function() {
        addRecipeForm.classList.add('hidden');
    });

    //form submission 
    recipeForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const recipeTitle = document.getElementById('recipeTitle').value;
        const recipeDescription = document.getElementById('recipeDescription').value;

        const recipeObject = {
            title: recipeTitle,
            recipe: recipeDescription
        };

        userRecipes.push(recipeObject);
        localStorage.setItem('userRecipes', JSON.stringify(userRecipes));

        //it will clear the form fields
        recipeForm.reset();
        addRecipeForm.classList.add('hidden');

        //adding new recipes in recipe container
        updateRecipeContainer(userRecipes);
    });

    //function to display recipes
    function updateRecipeContainer(recipes) {
        recipeContainer.innerHTML = ''; //Clear previous recipes
        for (const recipe of recipes) {
            const div = document.createElement('div');
            div.classList.add('text-white', 'flex-col', 'bg-black', 'mt-4', 'rounded-md', 'p-2', 'items-center', 'justify-center', 'w-50', 'h-50', 'mr-2');

            const img = document.createElement('img');
            img.src = "https://images.pexels.com/photos/327136/pexels-photo-327136.jpeg?auto=compress&cs=tinysrgb&w=600"; // Example image
            img.alt = recipe.title;
            div.appendChild(img);

            const heading = document.createElement('h3');
            heading.innerText = `${recipe.title} recipe`;
            div.appendChild(heading);

            const recipeViewButton = document.createElement('button');
            recipeViewButton.innerText = 'View Recipe';
            recipeViewButton.classList.add('mt-2', 'bg-pink-700', 'text-white', 'p-2', 'rounded-lg');
            
            recipeViewButton.addEventListener('click', () => {
                const modal = document.createElement('div');
                modal.classList.add('fixed', 'inset-0', 'flex', 'items-center', 'justify-center', 'bg-black', 'bg-opacity-50');
                
                const modalContent = document.createElement('div');
                modalContent.classList.add('bg-white', 'p-6', 'rounded-lg', 'w-11/12', 'sm:w-96');
                
                const recipeText = document.createElement('p');
                recipeText.innerText = recipe.recipe;
                modalContent.appendChild(recipeText);
                
                const closeButton = document.createElement('button');
                closeButton.innerText = 'Close';
                closeButton.classList.add('mt-4', 'bg-pink-700', 'text-white', 'p-2', 'rounded-lg');
                closeButton.addEventListener('click', () => {
                    document.body.removeChild(modal);
                });
                
                modalContent.appendChild(closeButton);
                modal.appendChild(modalContent);
                document.body.appendChild(modal);
            });
            
            div.appendChild(recipeViewButton);
            recipeContainer.appendChild(div);
        }
    }

    //merging hardcoded recipes and user entered recipes
    function initRecipes() {
        const allRecipes = [...hardcodedRecipes, ...userRecipes];
        updateRecipeContainer(allRecipes);
    }

    //function to search recipes
    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        const searchValue = searchBox.value.trim().toLowerCase();

        if (!searchValue) return;

        const allRecipes = [...hardcodedRecipes, ...userRecipes];
        const foundRecipes = allRecipes.filter(recipe => recipe.title.toLowerCase().includes(searchValue));

        updateRecipeContainer(foundRecipes); //it will display only the found recipes
    });
    initRecipes();
});
