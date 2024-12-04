import { prompt } from '@nativescript/core/ui/dialogs';
import { Pet } from '../../models/pet.model';

export async function showPetDetailsDialog(): Promise<Partial<Pet>> {
    const nameResult = await prompt({
        title: 'Pet Name',
        message: 'Enter your pet\'s name',
        defaultText: '',
        okButtonText: 'Next',
        cancelButtonText: 'Cancel'
    });

    if (!nameResult.result) {
        throw new Error('Dialog cancelled');
    }

    const ageResult = await prompt({
        title: 'Pet Age',
        message: 'Enter your pet\'s age in years',
        defaultText: '1',
        keyboardType: 'number',
        okButtonText: 'Next',
        cancelButtonText: 'Cancel'
    });

    if (!ageResult.result) {
        throw new Error('Dialog cancelled');
    }

    return {
        name: nameResult.text,
        age: parseInt(ageResult.text, 10)
    };
}