export const goto = (url: string) => {
  window.location.replace(url);
};

export const call = (tel: string) => {
  window.open(`tel:${tel}`);
};

export const formatNumber = (num: string | number, separator = ',') => {
  if (num == undefined || num == null) {
    return num;
  }

  const numAsString = typeof num === 'number' ? num.toString() : num;

  if (numAsString.length <= 3) {
    return numAsString;
  }

  let start = 0;
  let result = '';

  if (numAsString.length % 3) {
    start = numAsString.length % 3;
    result = numAsString.substring(0, start) + separator;
  }

  for (let i = start; i < numAsString.length; i += 3) {
    console.log(result);
    result += numAsString.substring(i, i + 3) + separator;
  }

  return result.substring(0, result.length - 1);
};

export const getElementHeight = (el: HTMLElement) => {
  const list = [
    'margin-top',
    'margin-bottom',
    'border-top',
    'border-bottom',
    'padding-top',
    'padding-bottom',
    'height',
  ];

  const style = window.getComputedStyle(el);
  return list.map((k) => parseInt(style.getPropertyValue(k), 10)).reduce((prev, cur) => prev + cur);
};

export const getElementWidth = (el: HTMLElement) => {
  const list = ['margin-left', 'margin-right', 'border-left', 'border-right', 'padding-left', 'padding-right', 'width'];

  const style = window.getComputedStyle(el);
  return list.map((k) => parseInt(style.getPropertyValue(k), 10)).reduce((prev, cur) => prev + cur);
};
