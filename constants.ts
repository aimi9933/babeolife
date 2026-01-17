import { Episode, Article, Testimonial } from './types';

export const CATEGORIES = [
  { id: 'Pregnancy', label: 'Pregnancy & Birth', color: 'bg-rose-100 text-rose-800' },
  { id: 'Newborn', label: 'Newborn Care', color: 'bg-amber-100 text-amber-800' },
  { id: 'Sleep', label: 'Sleep & Routines', color: 'bg-indigo-100 text-indigo-800' },
  { id: 'Feeding', label: 'Feeding & Nutrition', color: 'bg-emerald-100 text-emerald-800' },
  { id: 'Postpartum', label: 'Postpartum Recovery', color: 'bg-purple-100 text-purple-800' },
  { id: 'Mindset', label: 'Parenting Mindset', color: 'bg-sky-100 text-sky-800' },
];

export const EPISODES: Episode[] = [
  {
    id: 'ep-101',
    title: 'The Fourth Trimester Explained',
    summary: 'Why the first 3 months after birth are crucial for bonding and development, and how to survive the blur.',
    duration: '42 min',
    category: 'Newborn',
    coverImage: 'https://picsum.photos/400/400?random=1',
    publishDate: 'Oct 12, 2023',
    showNotes: 'In this episode, we dive deep into the concept of the Fourth Trimester. Dr. Sarah Bennett joins us to explain the physiological changes happening to both mom and baby.',
    keyTakeaways: ['Skin-to-skin contact is vital.', 'Sleep patterns are erratic by design.', 'Healing takes longer than 6 weeks.']
  },
  {
    id: 'ep-102',
    title: 'Gentle Sleep Training: Fact vs. Fiction',
    summary: 'Navigating the controversial world of infant sleep with a focus on attachment and responsiveness.',
    duration: '35 min',
    category: 'Sleep',
    coverImage: 'https://picsum.photos/400/400?random=2',
    publishDate: 'Oct 19, 2023',
    showNotes: 'Sleep deprivation is real, but so is your baby\'s need for comfort. We explore evidence-based strategies that don\'t involve "crying it out".',
    keyTakeaways: ['Wake windows are key.', 'Bedtime routines start early.', 'Responsiveness builds security.']
  },
  {
    id: 'ep-103',
    title: 'Nourishing Your Body Postpartum',
    summary: 'Practical nutrition tips for recovery and energy when you have zero time to cook.',
    duration: '28 min',
    category: 'Postpartum',
    coverImage: 'https://picsum.photos/400/400?random=3',
    publishDate: 'Oct 26, 2023',
    showNotes: 'Nutritionist Emily Chen shares her favorite one-handed snacks and warming meals that support hormonal balance.',
    keyTakeaways: ['Hydration impacts milk supply.', 'Focus on iron-rich foods.', 'Ask for help with meal prep.']
  },
  {
    id: 'ep-104',
    title: 'Preparing for Birth without Fear',
    summary: 'Mindfulness techniques to approach labor with confidence and calm.',
    duration: '50 min',
    category: 'Pregnancy',
    coverImage: 'https://picsum.photos/400/400?random=4',
    publishDate: 'Nov 02, 2023',
    showNotes: 'We speak with a doula about the power of breathwork and visualization during labor.',
    keyTakeaways: ['Fear increases pain perception.', 'Create a birth preference list, not a plan.', 'Your partner\'s role is crucial.']
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: '5 Signs Your Baby is Ready for Solids',
    excerpt: 'Looking for the right time to start purees or baby-led weaning? Here is the checklist.',
    category: 'Feeding',
    readTime: '4 min read',
    imageUrl: 'https://picsum.photos/600/400?random=10',
    content: 'Full article content would go here...'
  },
  {
    id: 'art-2',
    title: 'Creating a Montessori Nursery on a Budget',
    excerpt: 'How to design a space that fosters independence without spending a fortune.',
    category: 'Mindset',
    readTime: '6 min read',
    imageUrl: 'https://picsum.photos/600/400?random=11',
    content: 'Full article content would go here...'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 't1', name: 'Sarah J.', role: 'New Mom (3mo)', quote: 'BabeoLife has been my anchor during 3am feeds. So calming.' },
  { id: 't2', name: 'Mark P.', role: 'Expecting Dad', quote: 'Finally, parenting advice that doesn’t feel judgmental or scary.' },
  { id: 't3', name: 'Dr. Emily R.', role: 'Pediatrician', quote: 'I recommend this podcast to all my patients for grounded advice.' },
];
