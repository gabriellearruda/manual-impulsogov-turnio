const TOTAL = 6;
let current = 1;
const cache = {};

async function loadPage(index) {
  if (cache[index]) return cache[index];
  const res = await fetch('page-' + index + '.html');
  cache[index] = await res.text();
  return cache[index];
}

async function goTo(index) {
  const navLinks = document.querySelectorAll('nav a');
  navLinks[current - 1].classList.remove('active');
  current = index;
  document.getElementById('main').innerHTML = await loadPage(index);
  navLinks[current - 1].classList.add('active');
  window.scrollTo(0, 0);
  history.replaceState(null, '', '#page-' + current);
  if (window.innerWidth <= 768) {
    document.getElementById('sidebar').classList.remove('open');
  }
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

(async function () {
  const match = window.location.hash.match(/^#page-(\d+)$/);
  const startPage = match ? parseInt(match[1], 10) : 1;
  const target = (startPage >= 1 && startPage <= TOTAL) ? startPage : 1;
  current = target;
  document.querySelectorAll('nav a')[target - 1].classList.add('active');
  document.getElementById('main').innerHTML = await loadPage(target);
})();

document.addEventListener('click', e => {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('menu-toggle');
  if (window.innerWidth <= 768 && !sidebar.contains(e.target) && !toggle.contains(e.target)) {
    sidebar.classList.remove('open');
  }
});
