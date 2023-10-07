import { UserApi } from './user-api';

export interface ContentApi {
  content: UserApi[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable?: {
    offset: number;
  };
  size: number;
  sort?: {
    empty: boolean;
  };
  totalElements: number;
  totalPages: number;
}
