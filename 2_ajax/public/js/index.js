import { Home, Service, About, NotFound } from './components.js';

const $root = document.getElementById('root');
const $navigation = document.getElementById('navigation');

const routes = [
  { path: '/', component: Home },
  { path: '/service', component: Service },
  { path: '/about', component: About },
];

const render = async path => {
  try {
    const component = routes.find(route => route.path === path)?.component || NotFound;
    $root.replaceChildren(await component());
  } catch (err) {
    console.error(err);
  }
};

// TODO: ajax 요청은 주소창의 url을 변경시키지 않으므로 history 관리가 되지 않는다.
$navigation.onclick = e => {
  if (!e.target.matches('#navigation > li > a')) return;
  e.preventDefault();
  const path = e.target.getAttribute('href');
  render(path);
};

// TODO: 주소창의 url이 변경되지 않기 때문에 새로고침 시 현재 렌더링된 페이지가 아닌 루트 페이지가 요청된다.
window.addEventListener('DOMContentLoaded', () => render('/'));
