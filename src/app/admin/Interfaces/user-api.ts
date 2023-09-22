export interface UserApi {
  id: number;
  email: string;
  name: string;
  status: boolean;
  profile: {
    id: number;
    name: string;
    description: string;
    providerProfile: boolean;
    status: boolean;
  };
}
