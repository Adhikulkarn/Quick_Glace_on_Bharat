document.addEventListener('DOMContentLoaded', () => {
    const navToggleBtn = document.querySelector('.nav-toggle-btn');
    const navList = document.querySelector('.nav-list');

    navToggleBtn.addEventListener('click', () => {
        navList.classList.toggle('nav-list-active');
    });
});