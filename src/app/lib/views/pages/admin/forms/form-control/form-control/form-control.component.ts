import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { combineLatest } from "rxjs";
import { takeUntil, tap } from "rxjs/operators";
import {
  FORMS_PROVIDER,
  FORM_CONTROL_RESOURCES_PATH,
} from "src/app/lib/core/components/dynamic-inputs/angular";
import {
  FormsProvider,
  FormStoreActions,
} from "src/app/lib/core/components/dynamic-inputs/core";
import {
  createSerializedControlRequest,
  createSerializedFormControlRequest,
} from "src/app/lib/core/components/dynamic-inputs/core/v2/models";
import { httpHost } from "src/app/lib/core/http/helpers";
import { createSubject, timeout } from "src/app/lib/core/rxjs/helpers";
import { TranslationService } from "src/app/lib/core/translator";
import {
  AppUIStateProvider,
  UIStateStatusCode,
} from "src/app/lib/core/ui-state";
import { Dialog, MomentUtils } from "src/app/lib/core/utils";
import { FormControlPreviewComponent } from "../form-control-preview/form-control-preview.component";

@Component({
  selector: "app-form-control",
  templateUrl: "./form-control.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlComponent implements AfterViewInit {
  // #region Component inputs
  @Input() formID: string | number;
  @Input() id: number | string;
  // #endregion Component inputs
  // tslint:disable-next-line: variable-name
  private _destroy$ = createSubject();

  state$ = combineLatest([
    this.provider.state$,
    this.translate.translate([
      "successfulRequest",
      "prompt",
      "forms.createControlSuccess",
      "forms.deleteControlSuccess",
      "forms.updateControlSuccess",
    ]),
  ]).pipe(
    tap(([forms, translations]) => {
      if (forms.createControlResult) {
        this.uiState.endAction(
          `${translations.successfulRequest} ${translations["forms.createControlSuccess"]}`,
          UIStateStatusCode.OK
        );
        this.provider.handle(FormStoreActions.CONTROL_CREATE_RESULT_ACTION, {
          createControlResult: null,
        });
        timeout(() => {
          this.uiState.endAction();
        }, 3000);
      }

      if (forms.updateControlResult) {
        this.uiState.endAction(
          `${translations.successfulRequest} ${translations["forms.updateControlSuccess"]}`,
          UIStateStatusCode.OK
        );
        this.provider.handle(FormStoreActions.CONTROL_UPDATE_RESULT_ACTION, {
          updateControlResult: null,
        });
        timeout(() => {
          this.uiState.endAction();
        }, 3000);
      }

      if (forms.deleteControlResult) {
        this.uiState.endAction(
          `${translations.successfulRequest} ${translations["forms.deleteControlSuccess"]}`,
          UIStateStatusCode.OK
        );
        this.provider.handle(FormStoreActions.CONTROL_DELETE_RESULT_ACTION, {
          deleteControlResult: null,
        });
        timeout(() => {
          this.uiState.endAction();
        }, 3000);
      }
    })
  );

  @ViewChild(FormControlPreviewComponent)
  private previewComponent: FormControlPreviewComponent;

  // #region Outputs
  @Output() remove = new EventEmitter<void>();
  // #endregion Outputs

  constructor(
    private uiState: AppUIStateProvider,
    private translate: TranslationService,
    @Inject(FORMS_PROVIDER)
    private provider: FormsProvider,
    @Inject(FORM_CONTROL_RESOURCES_PATH) private formControlsPath: string,
    @Inject("FORM_SERVER_HOST") private host: string,
    private dialog: Dialog
  ) {}

  ngAfterViewInit() {
    timeout(() => {
      console.log("Executing delete action...", this.previewComponent);
      this.previewComponent?.remove
        ?.pipe(
          takeUntil(this._destroy$),
          tap((_) => this.deleteControl())
        )
        .subscribe();
    }, 2000);
  }

  async upsert(request: { [index: string]: any }) {
    let body = request?.body;
    const id = request.id;
    if (body) {
      this.uiState.startAction();
      body = { ...body, form_id: this.formID };
      const formControlRequest = createSerializedFormControlRequest(body);
      const controlsRequest = createSerializedControlRequest(body);
      body = {
        ...controlsRequest,
        min_date: controlsRequest.min_date
          ? MomentUtils.parseDate(controlsRequest.min_date, "YYYY-MM-DD")
          : null,
        max_date: controlsRequest.max_date
          ? MomentUtils.parseDate(controlsRequest.max_date, "YYYY-MM-DD")
          : null,
        multiple: controlsRequest?.multiple ?? false,
        form_form_controls: { ...formControlRequest },
      };
      if (id) {
        this.provider.updateControl(
          `${httpHost(this.host)}/${this.formControlsPath}/${id}`,
          body
        );
      } else {
        this.provider.createControl(
          `${httpHost(this.host)}/${this.formControlsPath}`,
          body
        );
      }
    }
  }

  async deleteControl() {
    if (this.id) {
      const translations = await this.translate
        .translate(["prompt"])
        .toPromise();
      if (this.dialog.confirm(translations.prompt)) {
        this.provider.deleteControl(
          `${httpHost(this.host)}/${this.formControlsPath}/${this.id}`,
          this.id
        );
      }
    } else {
      this.remove.emit();
    }
  }

  ngOnDestroy() {
    this.provider.handle(FormStoreActions.CONTROL_UPDATE_RESULT_ACTION, {
      createResult: null,
      currentForm: null,
    });
    this._destroy$.next();
  }
}
