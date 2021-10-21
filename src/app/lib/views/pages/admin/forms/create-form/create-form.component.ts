import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { combineLatest } from "rxjs";
import { filter, map, take, takeUntil, tap } from "rxjs/operators";
import {
  ANGULAR_REACTIVE_FORM_BRIDGE,
  ComponentReactiveFormHelpers,
  FORMS_PROVIDER,
  FORM_CLIENT,
  FORM_RESOURCES_PATH,
} from "src/app/lib/core/components/dynamic-inputs/angular";
import { AngularReactiveFormBuilderBridge } from "src/app/lib/core/components/dynamic-inputs/angular";
import {
  Form,
  FormsClient,
  FormsProvider,
  FormStoreActions,
  IDynamicForm,
  sortRawFormControls,
  DynamicFormHelpers,
} from "src/app/lib/core/components/dynamic-inputs/core";
import {
  ConfigurationManager,
  CONFIG_MANAGER,
} from "src/app/lib/core/configuration";
import { httpHost } from "src/app/lib/core/http/helpers";
import { createSubject, timeout } from "src/app/lib/core/rxjs/helpers";
import { TranslationService } from "src/app/lib/core/translator";
import {
  UIStateProvider,
  UIStateStatusCode,
  UI_STATE_PROVIDER,
} from "src/app/lib/core/ui-state";
import { CreateFormComponentInterface } from "./types";

@Component({
  selector: "app-create-form",
  templateUrl: "./create-form.component.html",
})
export class CreateFormComponent
  implements OnDestroy, CreateFormComponentInterface
{
  private _destroy$ = createSubject();

  @Input() set id(value: string | number) {
    this.client
      .get(value ?? this.config.get("forms.forms"))
      .pipe(
        filter((state) => (state ? true : false)),
        take(1),
        map((state) => ({
          form: DynamicFormHelpers.buildFormSync(sortRawFormControls(state)),
        })),
        map((state) => ({
          ...state,
          formgroup: this.builder.group(state.form) as FormGroup,
        })),
        takeUntil(this._destroy$),
        tap((state) => this.stateChange.emit(state))
      )
      .subscribe();
  }

  /**
   * @var EventEmitter<T>
   */
  @Output() stateChange = new EventEmitter<{
    form: IDynamicForm;
    formgroup: FormGroup;
  }>();
  @Output() actionCompleted = new EventEmitter();

  /**
   * @var Form
   */
  @Input() selected: Form;

  state$ = combineLatest([
    this.provider.state$,
    this.translate.translate([
      "invalidRequestParams",
      "serverRequestFailed",
      "successfulRequest",
    ]),
  ]).pipe(
    tap(([forms, translations]) => {
      if (forms.createResult) {
        this.uiState.endAction(
          translations.successfulRequest,
          UIStateStatusCode.OK
        );
        this.actionCompleted.emit();
        this.provider.handle(FormStoreActions.CREATE_RESULT_ACTION, {
          createResult: null,
        });
        timeout(() => {
          this.uiState.endAction();
        }, 3000);
      }
      if (forms.updateResult) {
        this.uiState.endAction(
          translations.successfulRequest,
          UIStateStatusCode.OK
        );
        this.actionCompleted.emit();
        this.provider.handle(FormStoreActions.UPDATE_RESULT_ACTION, {
          updateResult: null,
        });
        timeout(() => {
          this.uiState.endAction();
        }, 3000);
      }
    })
  );

  constructor(
    @Inject(FORM_CLIENT) private client: FormsClient,
    @Inject(CONFIG_MANAGER) private config: ConfigurationManager,
    @Inject(ANGULAR_REACTIVE_FORM_BRIDGE)
    private builder: AngularReactiveFormBuilderBridge,
    @Inject(FORM_RESOURCES_PATH) private path: string,
    @Inject("FORM_SERVER_HOST") private host: string,
    @Inject(FORMS_PROVIDER) private provider: FormsProvider,
    @Inject(UI_STATE_PROVIDER) private uiState: UIStateProvider,
    private translate: TranslationService
  ) {}

  handleSubmitButtonClick(requestURL: string, formgroup: FormGroup) {
    this.uiState.startAction();
    ComponentReactiveFormHelpers.validateFormGroupFields(formgroup);
    if (formgroup.valid) {
      this.selected
        ? this.provider.update(
            `${httpHost(this.host)}/${requestURL ?? this.path}/${
              this.selected?.id
            }`,
            formgroup.getRawValue()
          )
        : this.provider.create(
            `${httpHost(this.host)}/${requestURL ?? this.path}`,
            formgroup.getRawValue()
          );
    }
  }

  ngOnDestroy() {
    this._destroy$.next();
  }
}
