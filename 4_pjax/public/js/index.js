import { Home, Service, About, NotFound } from './components.js';

const $root = document.getElementById('root');
const $navigation = document.getElementById('navigation');

const routes = [
  { path: '/', component: Home },
  { path: '/service', component: Service },
  { path: '/about', component: About },
];

// TODO: path를 상태로 관리
const render = async path => {
  // $navigation의 a 요소를 클릭하면 path(a 요소의 href)가 전달된다.
  // 하지만 웹페이지가 처음 로딩되거나 앞으로/뒤로 가기 버튼을 클릭하면 path를 전달하지 않는다.
  // 이때 window.location.pathname를 키로 routes에서 컴포넌트를 결정해 뷰를 전환한다.
  const _path = path ?? window.location.pathname;

  try {
    const component = routes.find(route => route.path === _path)?.component || NotFound;
    $root.replaceChildren(await component());
  } catch (err) {
    console.error(err);
  }
};

$navigation.addEventListener('click', e => {
  if (!e.target.matches('#navigation > li > a')) return;

  /**
   * 네비게이션을 클릭하면 주소창의 url이 변경되므로 HTTP 요청이 서버로 전송된다.
   * preventDefault를 사용하여 이를 방지하고 history 관리를 위한 처리를 실행한다.
   */
  e.preventDefault();

  // 이동할 페이지의 path
  const path = e.target.getAttribute('href');

  // 현재 페이지와 이동할 페이지가 같으면 이동하지 않는다.
  if (window.location.pathname === path) return;

  // pushState는 주소창의 url을 변경하지만 HTTP 요청을 서버로 전송하지는 않는다.
  window.history.pushState(null, null, path);
  render(path);
});

/**
 * pjax 방식은 hash를 사용하지 않으므로 hashchange 이벤트를 사용할 수 없다.
 * popstate 이벤트는 pushState에 의해 발생하지 않고 앞으로/뒤로 가기 버튼을 클릭하거나
 * history.forward/back/go(n)에 의해 history entry가 변경되면 발생한다.
 * 앞으로/뒤로 가기 버튼을 클릭하면 window.location.pathname를 참조해 뷰를 전환한다.
 */
window.addEventListener('popstate', () => {
  console.log('[popstate]', window.location.pathname);
  render();
});

/**
 * 웹페이지가 처음 로딩되면 window.location.pathname를 확인해 페이지를 이동시킨다.
 * 새로고침을 클릭하면 현 페이지(예를 들어 localhost:5004/service)가 서버에 요청된다.
 * 이에 응답하는 처리는 서버에서 구현해야 한다.
 */
window.addEventListener('DOMContentLoaded', () => {
  render();
});
