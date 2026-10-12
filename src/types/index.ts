export type Language = 'vi' | 'en' | 'ja' | 'ko' | 'zh' | 'fr' | 'es';

export type ThemeMode = 'dark' | 'light';

export type MainToolType = 'render' | 'floorplan' | 'renovation' | 'viewsync' | 'editor';

export type ExtendedToolType =
  | 'rerender'
  | 'watermark-cleanup'
  | 'text-to-image'
  | 'image-to-image'
  | 'upscale'
  | 'upscale-superres'
  | 'relighting'
  | 'inpaint'
  | 'sketch-to-render'
  | 'style-transfer'
  | 'material-change'
  | 'expand-outpaint'
  | 'remove-background'
  | 'panorama-360'
  | 'edit-by-note'
  | 'real-estate-poster'
  | 'drawing-generator'
  | 'image-analysis'
  | 'watermark-tool'
  | 'prompt-suggester'
  | 'material-swapper'
  | 'sketch-converter'
  | 'moodboard-generator'
  | 'staging';

export type RenderMode = 'architecture' | 'interior' | 'urban' | 'landscape';

export interface UserProfileData {
  id: string;
  name: string;
  email: string;
  credits: number;
  plan: 'Starter' | 'Pro' | 'Ultra' | 'Free';
  expiryDate: string;
  avatarUrl?: string;
  isLoggedIn: boolean;
}

export interface HistoryItem {
  id: string;
  tool: string;
  toolName?: string;
  prompt: string;
  resultImage: string;
  originalImage?: string;
  createdAt: string;
  isFavorite: boolean;
  aspectRatio: string;
  style?: string;
  cost: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  period: string;
  credits: string;
  isHot?: boolean;
  discountBadge?: string;
  features: string[];
  creditsNumber: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}
