export const normalizeUrl = (url: string) => {
  const cleanUrl = url.replace(/ /g, '-').toLowerCase();
  return cleanUrl;
};
