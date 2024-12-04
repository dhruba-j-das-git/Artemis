import { Observable } from '@nativescript/core';
import { Pet } from '../models/pet.model';

export class PetMatchingService extends Observable {
  private pets: Pet[] = [
    {
      id: '1',
      name: 'Max',
      breed: 'Golden Retriever',
      age: 3,
      gender: 'male',
      imageUrl: 'https://example.com/max.jpg',
      owner: {
        name: 'John Doe',
        contact: 'john@email.com'
      },
      location: {
        city: 'New York',
        country: 'USA'
      }
    }
  ];

  getPotentialMatches(breed: string, gender: 'male' | 'female'): Pet[] {
    return this.pets.filter(pet => 
      pet.breed === breed && 
      pet.gender !== gender
    );
  }

  addPet(pet: Pet): void {
    this.pets.push(pet);
  }
}