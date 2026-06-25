const TOTAL = 8;
let current = 1;

function navIndex(pageIndex) {
  // pages 1-8 map to nav links 0-7
  return pageIndex - 1;
}

function goTo(index) {
  document.getElementById('page-' + current).classList.remove('active');
  document.querySelectorAll('nav a')[navIndex(current)].classList.remove('active');

  current = index;
  document.getElementById('page-' + current).classList.add('active');
  document.querySelectorAll('nav a')[navIndex(current)].classList.add('active');

  window.scrollTo(0, 0);

  if (window.innerWidth <= 768) {
    document.getElementById('sidebar').classList.remove('open');
  }
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// close sidebar when clicking outside on mobile
document.addEventListener('click', e => {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('menu-toggle');
  if (window.innerWidth <= 768 && !sidebar.contains(e.target) && !toggle.contains(e.target)) {
    sidebar.classList.remove('open');
  }
});
