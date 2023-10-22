export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const format = { year: 'numeric', month: 'short', day: 'numeric' };

  return date.toLocaleDateString(undefined, format);
}
