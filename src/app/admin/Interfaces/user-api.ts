export interface UserApi {
  userId?: number;
  email: string;
  name: string;
  profileId: number;
  status?: boolean;
}

export interface ProductsApi {
      productId?: number,
      code: string,
      name: string,
      sendDates: string,
      codeBar: string,
      description: string,
      company: string,
      avaibality: string,
      status: boolean,
}
