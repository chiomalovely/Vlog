import { create } from 'zustand';

export interface Video {
  id: string;
  title: string;
  username: string;
  views: number;
  likes: number;
  comments: number;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  description?: string;
  hashtags?: string[];
  createdAt: Date;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

interface VideoState {
  videos: Video[];
  currentVideo: Video | null;
  isLoading: boolean;
  addVideo: (video: Omit<Video, 'id' | 'createdAt'>) => void;
  likeVideo: (videoId: string) => void;
  bookmarkVideo: (videoId: string) => void;
  setCurrentVideo: (video: Video | null) => void;
  loadVideos: () => Promise<void>;
}

// Mock video data
const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Amazing Travel Adventure in Bali - You Won\'t Believe What Happened!',
    username: 'traveljunkie',
    views: 125000,
    likes: 8500,
    comments: 342,
    thumbnail: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: '3:45',
    description: 'Join me on this incredible journey through Bali!',
    hashtags: ['#travel', '#bali', '#adventure'],
    createdAt: new Date('2024-01-15'),
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '2',
    title: 'Cooking the Perfect Pasta - Chef\'s Secret Recipe',
    username: 'kitchenmaster',
    views: 89000,
    likes: 6200,
    comments: 189,
    thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: '2:18',
    description: 'Learn the secret to perfect pasta every time!',
    hashtags: ['#cooking', '#pasta', '#recipe'],
    createdAt: new Date('2024-01-14'),
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '3',
    title: 'Mind-Blowing Magic Tricks That Will Amaze You',
    username: 'magicwizard',
    views: 234000,
    likes: 15600,
    comments: 891,
    thumbnail: 'https://images.pexels.com/photos/6941/music-bokeh-lights-party.jpg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '4:02',
    description: 'Prepare to be amazed by these incredible magic tricks!',
    hashtags: ['#magic', '#tricks', '#amazing'],
    createdAt: new Date('2024-01-13'),
    isLiked: false,
    isBookmarked: false,
  },
];

export const useVideoStore = create<VideoState>((set, get) => ({
  videos: [],
  currentVideo: null,
  isLoading: false,

  addVideo: (videoData) => {
    const newVideo: Video = {
      ...videoData,
      id: Date.now().toString(),
      createdAt: new Date(),
      isLiked: false,
      isBookmarked: false,
    };
    
    set((state) => ({
      videos: [newVideo, ...state.videos]
    }));
  },

  likeVideo: (videoId) => {
    set((state) => ({
      videos: state.videos.map(video =>
        video.id === videoId
          ? {
              ...video,
              isLiked: !video.isLiked,
              likes: video.isLiked ? video.likes - 1 : video.likes + 1
            }
          : video
      )
    }));
  },

  bookmarkVideo: (videoId) => {
    set((state) => ({
      videos: state.videos.map(video =>
        video.id === videoId
          ? { ...video, isBookmarked: !video.isBookmarked }
          : video
      )
    }));
  },

  setCurrentVideo: (video) => {
    set({ currentVideo: video });
  },

  loadVideos: async () => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ videos: mockVideos, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },
}));