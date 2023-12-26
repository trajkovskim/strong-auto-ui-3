export const goto = (url: string) => {
  window.location.replace(url);
};

export const call = (tel: string) => {
  window.open(`tel:${tel}`);
};
