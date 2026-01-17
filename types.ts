export interface Episode {
  id: string;
  title: string;
  summary: string;
  duration: string;
  category: CategoryType;
  coverImage: string;
  publishDate: string;
  audioUrl?: string; // In a real app, this would be the MP3 link
  showNotes: string;
  keyTakeaways: string[];
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: CategoryType;
  readTime: string;
  imageUrl: string;
  content: string;
}

export type CategoryType = 
  | 'Pregnancy' 
  | 'Newborn' 
  | 'Sleep' 
  | 'Feeding' 
  | 'Postpartum' 
  | 'Mindset';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}
