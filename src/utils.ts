import { css } from 'styled-components';
import theme, { Breakpoints, LARGEST_BREAKPOINT } from 'theme';

export const goto = (url: string, blank = false) => {
  window.location.replace(url);
};

export const call = (tel: string) => {
  window.open(`tel:${tel}`);
};

export const mailTo = (emailTo: string) => {
  window.open(`mailto:${emailTo}`, '_self');
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

export const getElementWidth = (el: Element, boxSizing: React.CSSProperties['boxSizing'] = 'border-box') => {
  let list: string[] = [];

  if (boxSizing === 'border-box') {
    list = ['margin-left', 'margin-right', 'width'];
  } else if (boxSizing === 'content-box') {
    list = ['margin-left', 'margin-right', 'padding-left', 'padding-right', 'border-right', 'border-left', 'width'];
  }

  const style = window.getComputedStyle(el);
  return list.map((k) => parseInt(style.getPropertyValue(k), 10)).reduce((prev, cur) => prev + cur);
};

export const createMedia = (breakpoint: Breakpoints, csss?: ReturnType<typeof css>) => {
  const minWidth = `(min-width: ${theme.breakpoints.minWidth[breakpoint]})`;
  const maxWidth =
    breakpoint !== LARGEST_BREAKPOINT ? `and (max-width: ${theme.breakpoints.maxWidth[breakpoint]})` : '';

  return css`
    @media ${minWidth}${maxWidth} {
      ${csss};
    }
  `;
};

export const getCssProperty = (el: HTMLElement | null, property: string) => {
  if (!el) {
    return '0px';
  }

  return window.getComputedStyle(el, null).getPropertyValue(property);
};
