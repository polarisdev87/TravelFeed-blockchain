const calculateQualityScore = (total_featured, total_posts) => {
  const score = total_featured / total_posts;
  if (score > 0.95) return 'A++';
  if (score > 0.87) return 'A+';
  if (score > 0.79) return 'A';
  if (score > 0.71) return 'A-';
  if (score > 0.63) return 'B+';
  if (score > 0.55) return 'B';
  if (score > 0.47) return 'B-';
  if (score > 0.39) return 'C+';
  if (score > 0.31) return 'C';
  if (score > 0.22) return 'C-';
  if (score > 0.15) return 'D+';
  if (score > 0.1) return 'D';
  return 'n/a';
};

export default calculateQualityScore;
