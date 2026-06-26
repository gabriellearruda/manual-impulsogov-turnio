const TOTAL = 6;
let current = 1;

function goTo(index) {
  document.getElementById('page-' + current).classList.remove('active');
  document.querySelectorAll('nav a')[current - 1].classList.remove('active');
  current = index;
  document.getElementById('page-' + current).classList.add('active');
  document.querySelectorAll('nav a')[current - 1].classList.add('active');
  window.scrollTo(0, 0);
  history.replaceState(null, '', '#page-' + current);
  if (window.innerWidth <= 768) {
    document.getElementById('sidebar').classList.remove('open');
  }
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

(function () {
  const match = window.location.hash.match(/^#page-(\d+)$/);
  if (match) {
    const page = parseInt(match[1], 10);
    if (page >= 1 && page <= TOTAL) goTo(page);
  }
})();

document.addEventListener('click', e => {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('menu-toggle');
  if (window.innerWidth <= 768 && !sidebar.contains(e.target) && !toggle.contains(e.target)) {
    sidebar.classList.remove('open');
  }
});
