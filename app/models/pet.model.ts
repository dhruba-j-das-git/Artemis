export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: 'male' | 'female';
  imageUrl: string;
  owner: {
    name: string;
    contact: string;
  };
  location: {
    city: string;
    country: string;
  };
}