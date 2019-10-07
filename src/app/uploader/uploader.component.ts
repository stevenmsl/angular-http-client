import { UploaderService } from './uploader.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-uploader',
    templateUrl: './uploader.component.html',
    providers: [ UploaderService ]
})
export class UploaderComponent {
    message: string;

    constructor(private uploaderService: UploaderService) {}

    onPicked(input: HTMLInputElement) {
        const file = input.files[0];
        if (file) {
            this.uploaderService.upload(file).subscribe(
                msg => {
                    input.value = null;
                    this.message = msg;    
                }
            );    
        }
    }

}