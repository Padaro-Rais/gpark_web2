import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatutPipe } from './pipes/state.pipe';
import { EtatPipe } from './pipes/etat.pipe';
import { MopPipe } from './pipes/Mop.pipe';
import { NullorNot } from './pipes/NullorNot.pipe';



@NgModule({
  declarations: [
    StatutPipe,EtatPipe,MopPipe,NullorNot
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StatutPipe,
    EtatPipe,
    MopPipe,
    NullorNot
  ]
})
export class PipeModule { }
