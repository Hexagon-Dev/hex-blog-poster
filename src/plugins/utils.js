const convertSqlToDate = (date) => {
  if (typeof date !== 'string') {
    return date ? 'Invalid date' : 'No date';
  }

  return new Date(Date.parse(date.replace(/-/g, '/')));
};

const convertDateToSql = (date) => {
  if (!(date instanceof Date)) {
    return date ? 'Invalid date' : 'No date';
  }

  const offset = (new Date().getTimezoneOffset() * 60000);

  return (new Date((new Date((new Date(new Date(date))).toISOString())).getTime() - offset))
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');
};

export { convertDateToSql, convertSqlToDate };
