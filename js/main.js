document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  var hamburger = document.querySelector('.nav__hamburger');
  var mobileMenu = document.querySelector('.nav__mobile');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded',
        mobileMenu.classList.contains('open'));
    });

    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Form validation
  var forms = document.querySelectorAll('.form[data-validate]');
  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      var isValid = true;
      var requiredFields = form.querySelectorAll('[required]');

      requiredFields.forEach(function(field) {
        var group = field.closest('.form__group');
        if (!field.value.trim()) {
          group.classList.add('error');
          isValid = false;
        } else {
          group.classList.remove('error');
        }

        if (field.type === 'email' && field.value.trim()) {
          var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value.trim())) {
            group.classList.add('error');
            isValid = false;
          }
        }
      });

      if (!isValid) {
        e.preventDefault();
      }
    });
  });

  // Clear error on input
  document.querySelectorAll('.form__input, .form__textarea').forEach(function(input) {
    input.addEventListener('input', function() {
      var group = this.closest('.form__group');
      if (group) group.classList.remove('error');
    });
  });

  // Set active nav link
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
