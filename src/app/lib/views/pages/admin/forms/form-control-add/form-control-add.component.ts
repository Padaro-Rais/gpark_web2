import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  Inject,
} from "@angular/core";
import { IDynamicForm } from "src/app/lib/core/components/dynamic-inputs/core";
import { FormGroup } from "@angular/forms";
import {
  AngularReactiveFormBuilderBridge,
  ANGULAR_REACTIVE_FORM_BRIDGE,
  cloneAbstractControl,
  ComponentReactiveFormHelpers,
} from "src/app/lib/core/components/dynamic-inputs/angular";
import { AppUIStateProvider } from "src/app/lib/core/ui-state";

@Component({
  selector: "app-form-control-add",
  templateUrl: "./form-control-add.component.html",
  styles: [],
})
export class FormControlAddComponent implements OnDestroy {
  @Input() public componentFormGroup: FormGroup;
  @Input() form: IDynamicForm;
  @Output() formSubmitted = new EventEmitter<{ [index: string]: any }>();
  @Output() cancelSubmission: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() set controlViewState(value: {
    form: IDynamicForm;
    formgroup: FormGroup;
  }) {
    const localValue = { ...value };
    if (value) {
      this.form = localValue.form || this.form;
      this.componentFormGroup = localValue.formgroup
        ? cloneAbstractControl(localValue.formgroup)
        : this.componentFormGroup ||
          (this.builder.group(this.form) as FormGroup);
    }
  }

  uiState$ = this.uiState.uiState;

  /**
   * @description Component object instance initializer
   * @param builder [[FormBuilder]] Angular ReactiveForm FormBuilder
   * @param appUIStoreManager [[AppUIStoreManager]]
   */
  constructor(
    private uiState: AppUIStateProvider,
    @Inject(ANGULAR_REACTIVE_FORM_BRIDGE)
    private builder: AngularReactiveFormBuilderBridge
  ) {}

  cancel() {
    this.cancelSubmission.emit(true);
  }

  onFormSubmit() {
    ComponentReactiveFormHelpers.validateFormGroupFields(
      this.componentFormGroup
    );
    if (this.componentFormGroup.valid) {
      // Fire formSubmitted event with the formGroup value
      this.formSubmitted.emit({
        body: this.componentFormGroup.getRawValue(),
        requestURL: this.form.endpointURL,
      });
    }
  }

  cancelFormSubmission() {
    this.resetFormGroup();
    this.cancelSubmission.emit(true);
  }

  onFormRequestSubmittedSuccessfully() {
    this.componentFormGroup = this.builder.group(
      this.form
    ) as FormGroup;
  }

  resetFormGroup() {
    this.onFormRequestSubmittedSuccessfully();
  }

  ngOnDestroy(): void {
    this.resetFormGroup();
  }
}
