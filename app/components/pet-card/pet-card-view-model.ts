import { Observable, EventData } from '@nativescript/core';
import { Pet } from '../../models/pet.model';

export class PetCardViewModel extends Observable {
    private _pet: Pet;

    constructor(pet: Pet) {
        super();
        this._pet = pet;
    }

    get pet(): Pet {
        return this._pet;
    }

    onLike(args: EventData) {
        this.notify({
            eventName: 'petLiked',
            object: this,
            pet: this._pet
        });
    }

    onReject(args: EventData) {
        this.notify({
            eventName: 'petRejected',
            object: this,
            pet: this._pet
        });
    }
}