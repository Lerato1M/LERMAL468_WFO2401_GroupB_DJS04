// Importing components from separate files

// Importing Book component
import { Book } from './Book.js';

// Importing Theme component
import { Theme } from './Theme.js';

// Importing GenreFilter component
import { GenreFilter } from './GenreFilter.js';

// Import data as well as the constants
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';


// Function to render books on the page
function renderBooks(booksToRender) {
    const fragment = document.createDocumentFragment();

    // Loop through books and render previews
    for (const book of booksToRender.slice(0, BOOKS_PER_PAGE)) {
        const element = Book.renderPreview(book);
        fragment.appendChild(element);
    }

    // Append rendered previews to the DOM
    document.querySelector('[data-list-items]').appendChild(fragment);
}

// Function to sort books by publication year
function sortByPublicationYear(books) {
    return books.slice().sort((a, b) => {
        return new Date(a.published).getFullYear() - new Date(b.published).getFullYear();
    });
}

// Initialize page variables
let page = 1;
let matches = sortByPublicationYear(books);

// Render initial set of books on page load
const starting = document.createDocumentFragment();
for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
    const element = Book.renderPreview({ author, id, image, title });
    starting.appendChild(element);
}
document.querySelector('[data-list-items]').appendChild(starting);

// Render genre filter options
const genreHtml = FilterGenre.renderOptions();
document.querySelector('[data-search-genres]').appendChild(genreHtml);

// Render author filter options
const authorsHtml = Author.renderOptions();
document.querySelector('[data-search-authors]').appendChild(authorsHtml);

// Apply theme based on user preference or system preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelector('[data-settings-theme]').value = 'night';
    applyTheme('night');
} else {
    document.querySelector('[data-settings-theme]').value = 'day';
    applyTheme('day');
}

// Update "Show more" button text and state
document.querySelector('[data-list-button]').innerText = `Show more (${books.length - BOOKS_PER_PAGE})`;
document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0;
document.querySelector('[data-list-button]').innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`;

// Event listeners for search and settings interactions
document.querySelector('[data-search-cancel]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = false;
});
document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = false;
});
document.querySelector('[data-header-search]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = true;
    document.querySelector('[data-search-title]').focus();
});
document.querySelector('[data-header-settings]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = true;
});
document.querySelector('[data-list-close]').addEventListener('click', () => {
    document.querySelector('[data-list-active]').open = false;
});

// Event listener for theme change
document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);
    applyTheme(theme);
    document.querySelector('[data-settings-overlay]').open = false;
});

// Event listener for search form submission
document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = [];

    // Apply filters to match books
    for (const book of books) {
        let genreMatch = filters.genre === 'any';

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true; }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book);
        }
    }

    // Update matches and render filtered books
    page = 1;
    matches = result;
    if (result.length < 1) {
        document.querySelector('[data-list-message]').classList.add('list__message_show');
    } else {
        document.querySelector('[data-list-message]').classList.remove('list__message_show');
    }
    document.querySelector('[data-list-items]').innerHTML = '';
    renderBooks(result);
    document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1;
    document.querySelector('[data-list-button]').innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelector('[data-search-overlay]').open = false;
});

// Event listener for "Show more" button click
document.querySelector('[data-list-button]').addEventListener('click', () => {
    const fragment = document.createDocumentFragment();

    // Render next set of books
    for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
        const element = Book.renderPreview({ author, id, image, title });
        fragment.appendChild(element);
    }

    // Append rendered previews to the DOM
    document.querySelector('[data-list-items]').appendChild(fragment);
    page += 1;
});

// Event listener for clicking on book previews
document.querySelector('[data-list-items]').addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    // Find the clicked book and display details
    for (const node of pathArray) {
        if (active) break;

        if (node?.dataset?.preview) {
            let result = null;

            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook;
            } 
        
            active = result;
        }
    }
    
    if (active) {
        document.querySelector('[data-list-active]').open = true;
        document.querySelector('[data-list-blur]').src = active.image;
        document.querySelector('[data-list-image]').src = active.image;
        document.querySelector('[data-list-title]').innerText = active.title;
        document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
        document.querySelector('[data-list-description]').innerText = active.description;
    }
});
