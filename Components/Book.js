// Book.js
export const Book = {
    // Function to render a Book Preview
    renderPreview: function(book) {
        const element = document.createElement('button');
        element.classList = 'preview';
        element.setAttribute('data-preview', book.id);

        // Construct HTML for Book Preview
        element.innerHTML = `
            <img
                class="preview__image"
                src="${book.image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${book.title}</h3>
                <div class="preview__author">${authors[book.author]}</div>
            </div>
        `;

        return element;
    }
};
