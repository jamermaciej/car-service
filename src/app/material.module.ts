import { NgModule } from '@angular/core';

import {
    MatFormFieldModule
} from '@angular/material/form-field';

const materialComponents = [
    MatFormFieldModule
];

@NgModule({
    imports: [
        ...materialComponents
    ],
    exports: [
        ...materialComponents
    ]
})
export class MaterialModule { }
