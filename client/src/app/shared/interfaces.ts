export interface User {
  email: string;
  password: string;
}

export interface Category {
  name: string;
  imegeSrc?: string;
  user?: string;
  _id?: string;
}
