const createElement = domString => {
  const $temp = document.createElement('template');
  $temp.innerHTML = domString;
  return $temp.content;
};

const fetchData = async url => {
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const Home = async () => {
  const { title, content } = await fetchData('/api/home');
  return createElement(`<h1>${title}</h1><p>${content}</p>`);
};

export const Service = async () => {
  const { title, content } = await fetchData('/api/service');
  return createElement(`<h1>${title}</h1><p>${content}</p>`);
};

export const About = async () => {
  const { title, content } = await fetchData('/api/about');
  return createElement(`<h1>${title}</h1><p>${content}</p>`);
};

export const NotFound = () => createElement('<h1>404 NotFound</p>');
