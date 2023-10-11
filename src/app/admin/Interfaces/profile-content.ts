import { ProfileApi } from './profile-api';

export interface ProfileContent {
  content: ProfileApi[];
  number: number;
  numberOfElements: number;
  size: number;
  sort?: {
    empty: boolean;
  };
  totalElements: number;
  totalPages: number;
}
