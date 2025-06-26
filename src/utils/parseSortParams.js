const ALLOWED_SORT_FIELDS = ['name', '_id'];

export const parseSortParams = (query) => {
  const { sortBy = 'name', sortOrder = 'asc' } = query;

  const field = ALLOWED_SORT_FIELDS.includes(sortBy) ? sortBy : 'name';
  const order = sortOrder === 'desc' ? 'desc' : 'asc';

  return {
    sortBy: field,
    sortOrder: order,
  };
};
