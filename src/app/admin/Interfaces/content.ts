import { UserApi } from './user-api';

export interface ContentApi {
  content: UserApi[];
  number: number;
  numberOfElements: number;
  size: number;
  sort?: {
    empty: boolean;
  };
  totalElements: number;
  totalPages: number;
}
