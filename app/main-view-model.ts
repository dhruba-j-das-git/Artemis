import { Observable } from '@nativescript/core';
import { BreedDetectionService } from './services/breed-detection.service';
import { PetMatchingService } from './services/pet-matching.service';
import { Pet } from './models/pet.model';
import { showPetDetailsDialog } from './components/dialogs/pet-details-dialog';
import { getCurrentLocation } from './utils/location-utils';
import { imageToBase64 } from './utils/image-utils';

export class MainViewModel extends Observable {
    private breedDetectionService: BreedDetectionService;
    private petMatchingService: PetMatchingService;
    private _potentialMatches: Pet[] = [];

    constructor() {
        super();
        this.breedDetectionService = new BreedDetectionService();
        this.petMatchingService = new PetMatchingService();
    }

    initialize() {
        this.updatePotentialMatches();
    }

    get potentialMatches(): Pet[] {
        return this._potentialMatches;
    }

    set potentialMatches(value: Pet[]) {
        if (this._potentialMatches !== value) {
            this._potentialMatches = value;
            this.notifyPropertyChange('potentialMatches', value);
        }
    }

    async onAddPet() {
        try {
            const image = await this.breedDetectionService.takePicture();
            const breed = await this.breedDetectionService.detectBreed(image);
            const petDetails = await showPetDetailsDialog();
            const location = await getCurrentLocation();
            
            const newPet: Pet = {
                id: Date.now().toString(),
                name: petDetails.name,
                breed: breed,
                age: petDetails.age,
                gender: 'male',
                imageUrl: imageToBase64(image),
                owner: {
                    name: 'Current User',
                    contact: 'user@email.com'
                },
                location: location
            };

            this.petMatchingService.addPet(newPet);
            this.updatePotentialMatches();
        } catch (error) {
            console.error('Error adding pet:', error);
        }
    }

    private updatePotentialMatches() {
        this.potentialMatches = this.petMatchingService.getPotentialMatches();
    }
}