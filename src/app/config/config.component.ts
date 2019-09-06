import { Component } from '@angular/core';
import { Config, ConfigService } from './config.service';


@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    /*
    - eagerly load a module that needs a service all to itself
    - other components in the same module can’t access it
    */
    providers: [ConfigService],
    styles:[`.error {color: red;}`]    
})
export class ConfigComponent {
    error: any;
    headers: string[];
    config: Config;

    constructor(private configService: ConfigService) {}

    clear() {
        this.config = undefined;
        this.error = undefined;
        this.headers = undefined;    
    }
    showConfig() {
        this.showConfig_v1();
    }

    showConfig_v1() {
        this.configService.getConfig_1()
        .subscribe((data: Config) =>
            this.config = {
                heroesUrl: data['heroesUrl'],
                textfile: data['textfile']
            });
    
    }

}