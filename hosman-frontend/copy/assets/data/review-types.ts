// src/data/reviewTypes.ts
export interface Review {
  id: number;
  name: string;
  avatar: string;
  spend: number;
  reviewCount: number;
  rating: number;
  date: string;
  reviewText: string;
  replies: string[];
}

export const reviewsData = [
  {
    id: 'prod001',
    reviews: [
      {
        id: 1,
        name: 'Relix Rahman',
        avatar: 'https://via.placeholder.com/40',
        spend: 200,
        reviewCount: 14,
        rating: 4,
        date: '2022-10-24',
        reviewText: 'The leather jacket is very comfortable and offers great value for the price.',
        replies: [],
      },
      {
        id: 2,
        name: 'Sophia T.',
        avatar: 'https://via.placeholder.com/40',
        spend: 150,
        reviewCount: 10,
        rating: 5,
        date: '2022-11-10',
        reviewText: 'Love the quality and fit of the jacket. Highly recommend it!',
        replies: [],
      },
      {
        id: 3,
        name: 'Mike Johnson',
        avatar: 'https://via.placeholder.com/40',
        spend: 180,
        reviewCount: 12,
        rating: 3,
        date: '2023-01-15',
        reviewText: 'Good jacket, but it could be a bit more stylish. Overall decent.',
        replies: [],
      },
    ],
  },
  {
    id: 'prod002',
    reviews: [
      {
        id: 4,
        name: 'Jaison Samuel',
        avatar: 'https://via.placeholder.com/40',
        spend: 200,
        reviewCount: 14,
        rating: 4,
        date: '2022-10-24',
        reviewText: 'The jeans are very comfortable and offer great value for the price.',
        replies: [],
      },
      {
        id: 5,
        name: 'Emily Green',
        avatar: 'https://via.placeholder.com/40',
        spend: 160,
        reviewCount: 8,
        rating: 5,
        date: '2022-11-05',
        reviewText: 'These jeans fit perfectly and are really stylish!',
        replies: [],
      },
      {
        id: 6,
        name: 'Chris Miller',
        avatar: 'https://via.placeholder.com/40',
        spend: 190,
        reviewCount: 9,
        rating: 3,
        date: '2022-12-10',
        reviewText: 'The jeans are okay, but the material is thinner than expected.',
        replies: [],
      },
      {
        id: 7,
        name: 'Alex Jordan',
        avatar: 'https://via.placeholder.com/40',
        spend: 220,
        reviewCount: 16,
        rating: 4,
        date: '2023-02-01',
        reviewText: 'Comfortable fit and good quality, but could be a bit more durable.',
        replies: [],
      },
    ],
  },
];
