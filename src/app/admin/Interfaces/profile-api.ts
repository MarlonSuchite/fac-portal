export interface ProfileApi {
  profileId: string | null;
  code: string;
  description: string;
  resources: string[];
  status: number;
}
