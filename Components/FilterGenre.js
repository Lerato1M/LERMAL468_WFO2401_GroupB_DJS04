// Object to handle rendering Genre filter options
const Genre = {
    // Function to render Genre filter options
    renderOptions: function() {
        const genreHtml = document.createDocumentFragment();
        const firstGenreElement = document.createElement('option');
        firstGenreElement.value = 'any';
        firstGenreElement.innerText = 'All Genres';
        genreHtml.appendChild(firstGenreElement);

        // Loop through genres and create option elements
        for (const [id, name] of Object.entries(genres)) {
            const element = document.createElement('option');
            element.value = id;
            element.innerText = name;
            genreHtml.appendChild(element);
        }

        return genreHtml;
    }
};

// Object to handle rendering author filter options
const Author = {
    // Function to render author filter options
    renderOptions: function() {
        const authorsHtml = document.createDocumentFragment();
        const firstAuthorElement = document.createElement('option');
        firstAuthorElement.value = 'any';
        firstAuthorElement.innerText = 'All Authors';
        authorsHtml.appendChild(firstAuthorElement);

        // Loop through authors and create option elements
        for (const [id, name] of Object.entries(authors)) {
            const element = document.createElement('option');
            element.value = id;
            element.innerText = name;
            authorsHtml.appendChild(element);
        }

        return authorsHtml;
    }
};

// Export the Genre and Author objects together
export { Genre, Author };
