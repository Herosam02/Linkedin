import { Post, User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    headline: 'Senior Software Engineer at Tech Corp',
    profileImage: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    location: 'San Francisco, CA',
    connections: 500,
    about: 'Passionate software engineer with 8+ years of experience in full-stack development.',
    experience: [
      {
        id: '1',
        title: 'Senior Software Engineer',
        company: 'Tech Corp',
        location: 'San Francisco, CA',
        startDate: '2020-01',
        current: true,
        description: 'Leading development of scalable web applications using React and Node.js.'
      }
    ],
    education: [
      {
        id: '1',
        school: 'Stanford University',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2012-09',
        endDate: '2016-05',
        current: false
      }
    ],
    skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS']
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    headline: 'Product Manager at Innovation Labs',
    profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    location: 'New York, NY',
    connections: 750,
    about: 'Strategic product manager focused on creating user-centric digital experiences.',
    experience: [],
    education: [],
    skills: ['Product Management', 'User Research', 'Analytics', 'Strategy']
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Johnson',
      headline: 'Senior Software Engineer at Tech Corp',
      profileImage: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    content: 'Just finished an amazing project using React and TypeScript! The combination of strong typing and component-based architecture really makes a difference in large-scale applications. What are your favorite tools for modern web development? #React #TypeScript #WebDev',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    timestamp: '2h',
    likes: 42,
    comments: 8,
    shares: 3,
    liked: false
  },
  {
    id: '2',
    author: {
      name: 'Michael Chen',
      headline: 'Product Manager at Innovation Labs',
      profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    content: 'Excited to share that our team just launched a new feature that improves user engagement by 35%! It\'s amazing what happens when you really listen to your users and iterate based on their feedback. Key learnings: 1) Data-driven decisions matter 2) User feedback is gold 3) Small changes can have big impacts What\'s been your biggest product win this year?',
    timestamp: '4h',
    likes: 89,
    comments: 15,
    shares: 7,
    liked: true
  },
  {
    id: '3',
    author: {
      name: 'Emma Rodriguez',
      headline: 'UX Designer at Creative Studio',
      profileImage: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    content: 'Design thinking workshop completed! ✨ Spent the day with an incredible team exploring user journeys and prototyping solutions. The energy in the room was absolutely contagious. Remember: great design isn\'t just about making things pretty - it\'s about solving real problems for real people.',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    timestamp: '6h',
    likes: 127,
    comments: 22,
    shares: 12,
    liked: false
  }
];