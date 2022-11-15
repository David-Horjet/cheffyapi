const header = document.querySelector('.header');

window.addEventListener('scroll', function () {
  var top = window.scrollY;
  if (top >= 200) {
    header.classList.add('scrolled')
  } else {
    header.classList.remove('scrolled')
  }
});

function open() {
  var nav = document.getElementById("navbar");
  if (nav.style.display === "block") {
    nav.style.display = "none";
  } else {
    nav.style.display = "block";
  }
}




