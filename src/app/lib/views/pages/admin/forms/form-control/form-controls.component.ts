import { CdkDragDrop } from "@angular/cdk/drag-drop";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
} from "@angular/core";
import { filter, map, take } from "rxjs/operators";
import {
  FORMS_PROVIDER,
  FORM_CLIENT,
  FORM_CONTROL_RESOURCES_PATH,
  FORM_FORM_CONTROL_RESOURCES_PATH,
} from "src/app/lib/core/components/dynamic-inputs/angular";
import {
  createSerializedFormControlRequest,
  DynamicFormHelpers,
  FormsClient,
  FormsProvider,
  sortRawFormControls,
} from "src/app/lib/core/components/dynamic-inputs/core";
import {
  ControlInterface,
  FormInterface,
} from "src/app/lib/core/components/dynamic-inputs/core/compact";
import {
  ConfigurationManager,
  CONFIG_MANAGER,
} from "src/app/lib/core/configuration";
import { httpHost } from "src/app/lib/core/http/helpers";
import { createSubject } from "src/app/lib/core/rxjs/helpers";
import { TranslationService } from "src/app/lib/core/translator";
import { AppUIStateProvider } from "src/app/lib/core/ui-state";

@Component({
  selector: "app-form-controls",
  templateUrl: "./form-controls.component.html",
  styleUrls: ["./form-controls.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlsComponent {

  // Dynamic form state
  formState$ = this.client.get(this.config.get("forms.controls")).pipe(
    filter((state) => (state ? true : false)),
    take(1),
    map((state) => DynamicFormHelpers.buildFormSync(sortRawFormControls(state)))
  );

  private _destroy$ = createSubject();

  // #region
  private _form: FormInterface;
  @Input() set form(value: FormInterface) {
    this._form = value;
    if (value && value?.controls?.length === 0) {
      // Get list of controls if the value does not have control
    }
  }
  get form() {
    return this._form;
  }
  @Input() performingAction: boolean = false;
  @Input() showCreatePreview = false;
  // #endregion

  // #region Outputs
  @Output() showCreatePreviewChange = new EventEmitter<boolean>();
  // #endregion Outputs

  constructor(
    private uiState: AppUIStateProvider,
    private translate: TranslationService,
    @Inject(FORMS_PROVIDER)
    private provider: FormsProvider,
    @Inject(FORM_CLIENT)
    private client: FormsClient,
    @Inject(CONFIG_MANAGER)
    private config: ConfigurationManager,
    @Inject(FORM_FORM_CONTROL_RESOURCES_PATH) private fFormControlsPath: string,
    @Inject(FORM_CONTROL_RESOURCES_PATH) private formControlsPath: string,
    @Inject("FORM_SERVER_HOST") private host: string
  ) {}

  onRemoveCreatePreview() {
    this.showCreatePreviewChange.emit(false);
  }

  onControlDropped(event: CdkDragDrop<any>, control: ControlInterface) {
    if (!(event.previousIndex === event.currentIndex)) {
      this.provider.updateControl(
        `${httpHost(this.host)}/${this.formControlsPath}/${control.id}`,
        {
          form_form_controls: createSerializedFormControlRequest({
            form_id: control.formId ?? this.form.id,
            index: event.currentIndex + 1,
          }),
        }
      );
    }
  }
}
