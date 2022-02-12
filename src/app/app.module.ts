import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { NgSelectModule } from '@ng-select/ng-select'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ClarityModule } from '@clr/angular'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NotfoundComponent } from './notfound/notfound.component'

// import modules

import { FullCalendarModule } from '@fullcalendar/angular'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'

import { NgxChartModule } from 'ngx-chart'
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core'
import { map } from 'rxjs/operators'
import { DropzoneDict, DropzoneModule, DROPZONE_DICT } from './core/components/dropzone'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HttpModule } from './core/http'
import { environment } from 'src/environments/environment'
import { parseV3HttpResponse } from './core/http/core/v3/http-response'
import { DynamicFormControlModule } from './core/components/dynamic-inputs/angular'

FullCalendarModule.registerPlugins([interactionPlugin, dayGridPlugin])

//
export const DropzoneDictLoader = async (translate: TranslateService) => {
  return await translate
    .get(
      [
        'dictAcceptedFilesLabel',
        'dictFallbackMessageLabel',
        'dictFileTooBigLabel',
        'dictInvalidFileTypeLabel',
        'dictCancelUploadLabel',
        'dictResponseErrorLabel',
        'dictCancelUploadConfirmationLabel',
        'dictRemoveFileConfirmationLabel',
        'dictRemoveFileLabel',
        'dictMaxFilesExceededLabel',
        'dictUploadCanceled',
      ],
      {
        maxFilesize: '{{maxFilesize}}',
        filesize: '{{filesize}}',
      },
    )
    .pipe(
      map(
        (translations) =>
          ({
            dictFallbackMessage: translations?.dictFallbackMessageLabel,
            dictFileTooBig: translations?.dictFileTooBigLabel,
            dictInvalidFileType: translations?.dictInvalidFileTypeLabel,
            dictResponseError: translations?.dictResponseErrorLabel,
            dictCancelUpload: translations?.dictCancelUploadLabel,
            dictCancelUploadConfirmation:
              translations?.dictCancelUploadConfirmationLabel,
            dictRemoveFile: translations?.dictRemoveFileLabel,
            dictRemoveFileConfirmation:
              translations?.dictRemoveFileConfirmationLabel,
            dictMaxFilesExceeded: translations?.dictMaxFilesExceededLabel,
            dictUploadCanceled: translations?.dictUploadCanceled,
            dictAcceptedFiles: translations?.dictAcceptedFilesLabel,
          } as DropzoneDict),
      ),
    )
    .toPromise()
}
//
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http)
}
//

@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    NgxChartModule,
    ToastrModule.forRoot(),
    //iport form
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    //
    HttpModule.forRoot({
      serverURL: '',
      requestResponseHandler: parseV3HttpResponse,
    }),
    //
    DropzoneModule.forRoot({
      dropzoneConfig: {
        url: '', // url vers lapi de gestion de fichier
        maxFilesize: 10,
        acceptedFiles: 'image/*',
        autoProcessQueue: false,
        uploadMultiple: false,
        maxFiles: 1,
        addRemoveLinks: true,
      },
    }),
    DynamicFormControlModule.forRoot({
      serverConfigs: {
        host: '',
      },
      formsAssets : 'assets/resources/forms.json'
    }),
  ],
  exports: [
    FullCalendarModule,
    NgxChartModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [
    {
      provide: DROPZONE_DICT,
      useFactory: async (translate: TranslateService) => {
        return await DropzoneDictLoader(translate)
      },
      deps: [TranslateService],
    },
  ],

  ////////////////
  bootstrap: [AppComponent],
})
export class AppModule {}
