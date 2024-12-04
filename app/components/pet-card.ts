import { EventData, Observable } from '@nativescript/core';
import { Pet } from '../models/pet.model';

export class PetCardViewModel extends Observable {
  constructor(private pet: Pet) {
    super();
  }

  onLike(args: EventData) {
    this.notify({
      eventName: 'petLiked',
      object: this,
      pet: this.pet
    });
  }

  onReject(args: EventData) {
    this.notify({
      eventName: 'petRejected',
      object: this,
      pet: this.pet
    });
  }
}