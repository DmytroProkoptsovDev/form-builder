import { Component } from "@angular/core";

@Component({
    selector: 'app-form-builder-page',
    template: `
        <app-header title="Form builder"></app-header>
        <main>
            <app-container cdkDropListGroup>
                <app-accordion></app-accordion>
                <app-drop-section></app-drop-section>
                <app-drag-section></app-drag-section>
            </app-container>
        </main>
    `,
})
export class FormBuilderPage implements Component { }