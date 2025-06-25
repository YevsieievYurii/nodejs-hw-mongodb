const parseNumber = (value, defaultValue) => {
  const number = parseInt(value);
  return Number.isNaN(number) ? defaultValue : number;
};

export const parsePaginationParams = (query) => {
  const page = parseNumber(query.page, 1);
  const perPage = parseNumber(query.perPage, 10);
  return { page, perPage };
};
