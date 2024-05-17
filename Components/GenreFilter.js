// GenreFilter.js
import { genres } from './data.js';

export const GenreFilter = {
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
