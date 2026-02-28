
import React from 'react';
import { PetListing, Sitter } from './types';

export interface ProSitter extends Sitter {
  responseTime: string;
  totalBookings: number;
  experienceYears: number;
  isOnline: boolean;
}

export const MOCK_LISTINGS: PetListing[] = [
  {
    id: '1',
    petName: 'Bella',
    ownerName: 'Sophie L.',
    rating: 5.0,
    serviceType: 'BOARDING',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&h=600&auto=format&fit=crop',
    responsesCount: 5,
    startDate: 'From Jan 15 to Jan 20 2026',
    location: 'Paris 11e',
    ownerAvatars: ['https://i.pravatar.cc/150?u=1', 'https://i.pravatar.cc/150?u=2']
  },
  {
    id: '2',
    petName: 'Max',
    ownerName: 'Marc A.',
    rating: 5.0,
    serviceType: 'house sitting',
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=600&h=600&auto=format&fit=crop',
    responsesCount: 3,
    startDate: 'From Feb 10 to Feb 15 2026',
    location: 'Boulogne-Billancourt',
    ownerAvatars: ['https://i.pravatar.cc/150?u=3', 'https://i.pravatar.cc/150?u=4']
  },
  {
    id: '3',
    petName: 'Luna',
    ownerName: 'Emma R.',
    rating: 5.0,
    serviceType: 'drop in visits',
    image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=600&h=600&auto=format&fit=crop',
    responsesCount: 8,
    startDate: 'From Mar 05 to Mar 12 2026',
    location: 'Paris 16e',
    ownerAvatars: ['https://i.pravatar.cc/150?u=5', 'https://i.pravatar.cc/150?u=6']
  },
  {
    id: '4',
    petName: 'Charlie',
    ownerName: 'Thomas D.',
    rating: 5.0,
    serviceType: 'BOARDING',
    image: 'https://images.unsplash.com/photo-1511044568932-338cba0ad803?q=80&w=600&h=600&auto=format&fit=crop',
    responsesCount: 2,
    startDate: 'From Jan 22 to Jan 28 2026',
    location: 'Neuilly-sur-Seine',
    ownerAvatars: ['https://i.pravatar.cc/150?u=7', 'https://i.pravatar.cc/150?u=8']
  },
  {
    id: '5',
    petName: 'Oscar',
    ownerName: 'Julie B.',
    rating: 4.9,
    serviceType: 'drop in visits',
    image: 'https://images.unsplash.com/photo-1533733358354-22119bb4a50d?q=80&w=600&h=600&auto=format&fit=crop',
    responsesCount: 6,
    startDate: 'From Jan 12 to Jan 15 2026',
    location: 'Le Marais, 4e',
    ownerAvatars: ['https://i.pravatar.cc/150?u=9', 'https://i.pravatar.cc/150?u=10']
  },
  {
    id: '6',
    petName: 'Simba',
    ownerName: 'Antoine K.',
    rating: 5.0,
    serviceType: 'BOARDING',
    image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?q=80&w=600&h=600&auto=format&fit=crop',
    responsesCount: 4,
    startDate: 'From Feb 18 to Feb 25 2026',
    location: 'Paris 5e',
    ownerAvatars: ['https://i.pravatar.cc/150?u=11', 'https://i.pravatar.cc/150?u=12']
  },
  {
    id: '7',
    petName: 'Nala',
    ownerName: 'Chloe M.',
    rating: 4.8,
    serviceType: 'house sitting',
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=600&h=600&auto=format&fit=crop',
    responsesCount: 7,
    startDate: 'From Mar 10 to Mar 20 2026',
    location: 'Vincennes',
    ownerAvatars: ['https://i.pravatar.cc/150?u=13', 'https://i.pravatar.cc/150?u=14']
  },
  {
    id: '8',
    petName: 'Mimi',
    ownerName: 'Lucas F.',
    rating: 5.0,
    serviceType: 'BOARDING',
    image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=600&h=600&auto=format&fit=crop',
    responsesCount: 2,
    startDate: 'From Apr 01 to Apr 05 2026',
    location: 'Paris 17e',
    ownerAvatars: ['https://i.pravatar.cc/150?u=15', 'https://i.pravatar.cc/150?u=16']
  },
  {
    id: '9',
    petName: 'Gribouille',
    ownerName: 'Elena P.',
    rating: 4.9,
    serviceType: 'drop in visits',
    image: 'https://images.unsplash.com/photo-1472491235688-bdc81a63246e?q=80&w=600&h=600&auto=format&fit=crop',
    responsesCount: 9,
    startDate: 'From Jan 30 to Feb 04 2026',
    location: 'Montmartre, 18e',
    ownerAvatars: ['https://i.pravatar.cc/150?u=17', 'https://i.pravatar.cc/150?u=18']
  },
  {
    id: '10',
    petName: 'Cachou',
    ownerName: 'Damien V.',
    rating: 5.0,
    serviceType: 'BOARDING',
    image: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=600&h=600&auto=format&fit=crop',
    responsesCount: 1,
    startDate: 'From Feb 12 to Feb 14 2026',
    location: 'Saint-Mandé',
    ownerAvatars: ['https://i.pravatar.cc/150?u=19', 'https://i.pravatar.cc/150?u=20']
  }
];

export const MOCK_SITTERS: ProSitter[] = [
  {
    id: 's1',
    name: 'Camille R.',
    location: 'Paris 5e',
    rating: 4.9,
    services: ['BOARDING', 'drop in visits'],
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=500&auto=format&fit=crop',
    review: { text: "Camille was incredible. She sent me daily videos.", author: "Marie T." },
    tags: ['Expert with seniors', 'Quiet home'],
    isVerified: true,
    priceFrom: 13,
    responseTime: '5 min',
    totalBookings: 142,
    experienceYears: 4,
    isOnline: true
  },
  {
    id: 's2',
    name: 'Julien V.',
    location: 'Le Marais, 4e',
    rating: 5.0,
    services: ['house sitting'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=500&auto=format&fit=crop',
    review: { text: "Very professional. Julien stayed at my place and everything was perfect.", author: "Luc A." },
    tags: ['WFH', 'Cat owner'],
    isVerified: true,
    priceFrom: 15,
    responseTime: '15 min',
    totalBookings: 89,
    experienceYears: 3,
    isOnline: true
  },
  {
    id: 's3',
    name: 'Elodie B.',
    location: 'Vincennes',
    rating: 4.8,
    services: ['drop in visits'],
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=500&auto=format&fit=crop',
    review: { text: "Elodie is a real cat whisperer.", author: "Sarah L." },
    tags: ['Garden access', 'Vet student'],
    isVerified: true,
    priceFrom: 13,
    responseTime: '1h',
    totalBookings: 210,
    experienceYears: 6,
    isOnline: false
  },
  {
    id: 's4',
    name: 'Nicolas M.',
    location: 'Boulogne',
    rating: 5.0,
    services: ['BOARDING'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=500&auto=format&fit=crop',
    review: { text: "Outstanding care for my kitten. Very trustworthy.", author: "Paul H." },
    tags: ['No other pets', 'Safe balcony'],
    isVerified: true,
    priceFrom: 18,
    responseTime: '2 min',
    totalBookings: 56,
    experienceYears: 2,
    isOnline: true
  },
  {
    id: 's5',
    name: 'Sophie T.',
    location: 'Paris 15e',
    rating: 4.9,
    services: ['drop in visits'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=500&auto=format&fit=crop',
    review: { text: "Sophie is wonderful. She really takes time to play.", author: "Claire G." },
    tags: ['Certified behaviorist'],
    isVerified: true,
    priceFrom: 14,
    responseTime: '10 min',
    totalBookings: 175,
    experienceYears: 5,
    isOnline: true
  },
  {
    id: 's6',
    name: 'Marc L.',
    location: 'Paris 11e',
    rating: 5.0,
    services: ['BOARDING'],
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&h=500&auto=format&fit=crop',
    review: { text: "Marc is the best host in the 11th.", author: "Pierre D." },
    tags: ['Cat owner', 'Large flat'],
    isVerified: true,
    priceFrom: 16,
    responseTime: '30 min',
    totalBookings: 124,
    experienceYears: 4,
    isOnline: true
  },
  {
    id: 's7',
    name: 'Emma H.',
    location: 'Paris 18e',
    rating: 4.9,
    services: ['drop in visits'],
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&h=500&auto=format&fit=crop',
    review: { text: "Emma was very attentive to routine.", author: "Julie F." },
    tags: ['Senior expert'],
    isVerified: true,
    priceFrom: 12,
    responseTime: '5 min',
    totalBookings: 67,
    experienceYears: 3,
    isOnline: false
  },
  {
    id: 's8',
    name: 'Leo P.',
    location: 'Bastille',
    rating: 5.0,
    services: ['BOARDING'],
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=500&auto=format&fit=crop',
    review: { text: "My cat didn't want to leave Leo's place!", author: "Hugo S." },
    tags: ['Vet assistant'],
    isVerified: true,
    priceFrom: 19,
    responseTime: '12 min',
    totalBookings: 156,
    experienceYears: 5,
    isOnline: true
  }
];

export const PinIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

export const StarIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-[#C25E72]">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

export const ShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#C25E72" className="text-white">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);
