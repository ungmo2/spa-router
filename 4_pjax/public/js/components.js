const createElement = string => {
  const $temp = document.createElement('template');
  $temp.innerHTML = string;
  return $temp.content;
};

const fetchData = async url => {
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const Home = async () => {
  const { title, content } = await fetchData('/data/home.json');
  return createElement(`<h1>${title}</h1><p>${content}</p>`);
};

export const Service = async () => {
  const { title, content } = await fetchData('/data/service.json');
  return createElement(`<h1>${title}</h1><p>${content}</p>`);
};

export const About = async () => {
  const { title, content } = await fetchData('/data/about.json');
  return createElement(`<h1>${title}</h1><p>${content}</p>`);
};

export const NotFound = () => createElement('<h1>404 NotFound</p>');
