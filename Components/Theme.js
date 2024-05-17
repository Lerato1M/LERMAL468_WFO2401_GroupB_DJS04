// Theme.js
export const Theme = {
    // Function to apply theme based on user selection
    applyTheme: function(theme) {
        // Update CSS variables based on theme
        if (theme === 'night') {
            document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
            document.documentElement.style.setProperty('--color-light', '10, 10, 20');
        } else {
            document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
            document.documentElement.style.setProperty('--color-light', '255, 255, 255');
        }
    }
};
