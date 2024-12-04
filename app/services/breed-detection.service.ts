import { Camera, ImageAsset } from '@nativescript/camera';
import { ImageSource } from '@nativescript/core';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { resizeImage } from '../utils/image-utils';

export class BreedDetectionService {
    private camera: Camera;

    constructor() {
        this.camera = new Camera();
    }

    async detectBreed(imageSource: ImageSource): Promise<string> {
        try {
            const resizedImage = await resizeImage(imageSource, 224, 224);
            const model = await mobilenet.load();
            const predictions = await model.classify(resizedImage);
            return predictions[0].className.split(',')[0].trim();
        } catch (error) {
            console.error('Error detecting breed:', error);
            throw error;
        }
    }

    async takePicture(): Promise<ImageSource> {
        const options = {
            width: 300,
            height: 300,
            keepAspectRatio: true,
            saveToGallery: false
        };

        const imageAsset: ImageAsset = await this.camera.takePicture(options);
        return await ImageSource.fromAsset(imageAsset);
    }
}