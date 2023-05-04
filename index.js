import { DateTime } from './modules/luxon.js';
import Router from './modules/router.js';

const routerLinks = document.querySelectorAll('[data-to]');
const todayContainer = document.getElementById('today');

todayContainer.textContent = DateTime.now().toFormat('DDD, tt');

const router = new Router('list');

routerLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    router.navigate(link.dataset.to);
  });
});