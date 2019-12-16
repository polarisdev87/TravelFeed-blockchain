import extractKeywords from 'keyword-extractor';

const categories = [
  { category: 'cyclefeed', keywords: ['cycling', 'cycle', 'bicyle', 'biking'] },
  {
    category: 'backpacking',
    keywords: ['backpacker', 'backpack'],
  },
  { category: 'hitchhiking', keywords: ['hitch', 'hitchhike'] },
  {
    category: 'traveladvice',
    keywords: [
      'packing',
      'recommendation',
      'guide',
      'insurance',
      'credit',
      'review',
    ],
  },
  {
    category: 'foodoftheworld',
    keywords: ['food', 'restaurant', 'eat', 'streetfood'],
  },
  { category: 'budgettravel', keywords: ['budget', 'money', 'spending'] },
  {
    category: 'digitalnomads',
    keywords: ['nomad', 'work', 'income', 'freelancer'],
  },
  {
    category: 'photography',
    keywords: ['photography', 'camera', 'photographer'],
  },
  { category: 'family', keywords: ['kids', 'children'] },
  {
    category: 'urbex',
    keywords: ['abandoned', 'urban exploring', 'urban exploration'],
  },
  {
    category: 'outdoor',
    keywords: [
      'mountains',
      'hike',
      'boots',
      'hiking',
      'camping',
      'tent',
      'survival',
    ],
  },
  { category: 'wildlife', keywords: ['animal', 'bear', 'birds', 'safari'] },
  {
    category: 'sports',
    keywords: [
      'diving',
      'surfing',
      'kayaking',
      'snorkeling',
      'paragliding',
      'racing',
      'basejumping',
      'windsurfing',
    ],
  },
  {
    category: 'transportation',
    keywords: [
      'train',
      'eurorail',
      'railway',
      'bus',
      'flight',
      'plane',
      'rental',
      'rideshare',
      'tours',
    ],
  },
];

const categoryFinder = text => {
  const keywords = extractKeywords.extract(text, {
    language: 'english',
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true,
  });

  const matches = [];

  keywords.forEach(k => {
    categories.forEach(c => {
      if (
        (c.keywords.indexOf(k) !== -1 || c.category.indexOf(k) !== -1) &&
        matches.indexOf(c.category) === -1
      )
        matches.push(c.category);
    });
  });

  return matches;
};

export default categoryFinder;
