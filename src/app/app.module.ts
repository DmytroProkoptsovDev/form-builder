import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { TextFieldModule } from '@angular/cdk/text-field';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContainerComponent } from './components/container/container.component';
import { HeaderComponent } from './components/header/header.component';
import { SectionComponent } from './components/section/section.component';
import { DropSectionComponent } from './components/drop-section/drop-section.component';
import { DragSectionComponent } from './components/drag-section/drag-section.component';
import { InputComponent } from './components/drop-section/input/input.component';
import { TextAreaComponent } from './components/drop-section/textarea/textarea.component';
import { ButtonComponent } from './components/drop-section/button/button.component';
import { CheckboxWithLabelComponent } from './components/drop-section/checkbox-with-label/checkbox-with-label.component';
import { SelectOptionComponent } from './components/drop-section/select-option/select-option.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { StoreModule } from '@ngrx/store';
import { dropSectionReducer } from './components/drop-section/drop.section.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { NormalizeCasePipe } from './pipes/normalize-case/normalize-case.pipe';
import { accordionReducer } from './components/accordion/accordion.reducers';
import { dragSectionReducer } from './components/drag-section/drag-section.reducers';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToStringPipe } from './pipes/to-string/to-string.pipe';
import { ToggleClassDirective } from './directives/toggle-class/toggle-class.directive';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    HeaderComponent,
    SectionComponent,
    DropSectionComponent,
    DragSectionComponent,
    InputComponent,
    TextAreaComponent,
    ButtonComponent,
    CheckboxWithLabelComponent,
    SelectOptionComponent,
    AccordionComponent,
    NormalizeCasePipe,
    ToStringPipe,
    ToggleClassDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    CdkAccordionModule,
    TextFieldModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    StoreModule.forRoot({
      dropSection: dropSectionReducer,
      accordion: accordionReducer,
      dragSection: dragSectionReducer
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [ToStringPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
