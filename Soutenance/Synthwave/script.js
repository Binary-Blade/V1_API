let navbarToggler = document.querySelector('.navbar-toggler');
let navbarNav = document.querySelector('#navbarNav');

navbarToggler.addEventListener('click', () => {
  let expanded = navbarNav.classList.contains('show');

  if (expanded) {
    navbarToggler.setAttribute('aria-expanded', false);
    navbarNav.classList.remove('show');
  } else {
    navbarToggler.setAttribute('aria-expanded', true);
    navbarNav.classList.add('show');
  }
});
