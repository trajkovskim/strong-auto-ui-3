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
