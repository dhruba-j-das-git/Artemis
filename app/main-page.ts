import { EventData, Page, NavigatedData } from '@nativescript/core';
import { MainViewModel } from './main-view-model';

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new MainViewModel();
}

export function onNavigatedTo(args: EventData) {
    const page = <Page>args.object;
    const vm = page.bindingContext as MainViewModel;
    vm.initialize();
}