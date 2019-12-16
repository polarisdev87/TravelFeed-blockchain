export const getBudgetScore = (budget_score, name) => {
  switch (budget_score) {
    case 5:
      return `By global standards, ${name ||
        'this'} is a very expensive destination`;
    case 4:
      return ` By global standards, ${name ||
        'this'} is an expensive destination`;
    case 3:
      return ` By global standards, travelling ${name ||
        'here'} requires an average budget`;
    case 2:
      return ` By global standards, ${name || 'this'} is a cheap destination`;

    case 1:
      return ` By global standards, ${name ||
        'this'} is a very cheap destination`;
    default:
      return '';
  }
};
