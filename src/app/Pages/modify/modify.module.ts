import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyPageRoutingModule } from './modify-routing.module';

import { ModifyPage } from './modify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifyPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModifyPage]
})
export class ModifyPageModule {}
