export type ActiveColors = any;

export interface Location {
  id: string;
  title: string;
  address: string;
  latitude: number;
  longitude: number;
  open_at: string;
  closing_at: string;
  rating: number;
  type: string;
}

export interface FriendCoordinate {
  id: number;
  friend_name?: string;
  phone_number?: string;
  device_id: string;
  created_at: string;
  geohash: string;
  user_id: number;
  latitude: number;
  longitude: number;
}
interface RecaptchaFriendBody {
  friend: Friend;
  token?: string;
}

interface AcceptFriendBody {
  id: number;
  body: { status: number };
}
export interface ListItemProps {
  id?: number;
  icon: string;
  title: string;
  message: string;
  date: string;
  status?: number;
  statusType: number;
  onPress?: () => void;
  onDelete?: () => void;
  images?: any[];
  listType: 0 | 1;
}
interface RecaptchaUserBody {
  id: number;
  user: any;
  token?: string;
}
interface UserVisibilityBody {
  id: number;
  body: { visibility: number };
}
export interface NotificationListItemProps {
  id: number;
  issuer: string;
  title: string;
  message: string;
  filters: any;
  read: number;
  created_at: string;
  isHomeNotification: boolean;
  onPress?: () => void;
  onDelete?: () => void;
  handleSeenNotification?: () => void;
}

export interface NotificationForBottomSheet {
  id: number;
  issuer: string;
  link: string;
  buttonText: string;
  image: string;
  title: string;
  message: string;
  body: string;
  filters: any;
  created_at: string;
  read: number;
  isHomeNotification: boolean;
}

export interface IncidentListItemProps {
  id?: number;
  title: string;
  name?: string;
  email?: string;
  phone_area_code?: string;
  phone_number?: string;
  message: string;
  created_at: string;
  updated_at: string;
  status?: number;
  onPress?: () => void;
  onDelete?: () => void;
  images?: {
    id: number;
    title: string;
    created_at: string;
    updated_at: string;
  }[];
  latitude?: number;
  longitude?: number;
  category_id?: number;
  share_location?: number;
  want_contact?: number;
}

export type AlertType = "success" | "error" | "warning" | "info";
