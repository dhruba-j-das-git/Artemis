import { ImageSource } from '@nativescript/core';

export async function resizeImage(imageSource: ImageSource, targetWidth: number, targetHeight: number): Promise<ImageSource> {
    return ImageSource.fromNativeSource(
        imageSource.resize(targetWidth, targetHeight, true)
    );
}

export function imageToBase64(imageSource: ImageSource): string {
    return imageSource.toBase64String('jpg', 100);
}