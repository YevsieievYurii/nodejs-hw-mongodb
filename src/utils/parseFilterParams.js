export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const filter = {};

  if (typeof type === 'string') {
    filter.contactType = type;
  }

  if (isFavourite === 'true') {
    filter.isFavourite = true;
  } else if (isFavourite === 'false') {
    filter.isFavourite = false;
  }

  return filter;
};
