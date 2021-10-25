import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnDestroy,
  ChangeDetectionStrategy,
} from "@angular/core";
import { Validators } from "@angular/forms";
import { IDynamicForm } from "src/app/lib/core/components/dynamic-inputs/core/contracts/dynamic-form";
import { MomentUtils } from "src/app/lib/core/utils";
import { startsWith } from "lodash";
import {
  ControlInterface,
  formControlViewModelBindings,
} from "src/app/lib/core/components/dynamic-inputs/core/compact";
import {
  ComponentReactiveFormHelpers,
  DynamicFormView,
} from "src/app/lib/core/components/dynamic-inputs/angular";
import { before } from "src/app/lib/core/utils/types/strings";
import { createSubject, timeout } from "src/app/lib/core/rxjs/helpers";
import { takeUntil, tap } from "rxjs/operators";
import { doLog } from "src/app/lib/core/rxjs/operators";
import { SelectableControlDataSource } from "src/app/lib/core/components/dynamic-inputs/core";

@Component({
  selector: "app-form-control-preview",
  templateUrl: "./form-control-preview.component.html",
  styleUrls: ["./form-control-preview.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlPreviewComponent implements OnDestroy {
  // Properties defintions
  _destroy$ = createSubject();
  // #region outputs
  @Output() submit = new EventEmitter<{ [index: string]: any }>();
  @Output() remove = new EventEmitter<void>();
  @Output() titleChange = new EventEmitter<string>();
  // #endregion outputs

  // #region Inputs Properties
  @Input() form: IDynamicForm;
  @Input() title: string;
  @Input() badge: string | number;
  @Input() control: ControlInterface | undefined;
  @Input() isExpanded: boolean = false;
  @Input() index: number;
  // #endregion Inputs Properties

  // #region View Children
  @ViewChild("simpleFormComponent", { static: false })
  formViewComponent: DynamicFormView;
  // #endregion

  async onSubmit() {
    const formgroup = this.formViewComponent.validateForm();
    if (formgroup.valid) {
      if (formgroup.valid) {
        this.submit.emit({
          body: formgroup.getRawValue(),
          requestURL: this.form.endpointURL,
          id: this.control ? this.control.id : undefined,
        });
      }
    }
  }

  onComponentReadyStateChanges() {
    this.fillForm();
    // #region Listen for data_source changes
    this.formViewComponent
      ?.getControl("data_source")
      .valueChanges.pipe(
        takeUntil(this._destroy$),
        doLog("Datasource control changes..."),
        tap((state) => {
          if (state && +state === SelectableControlDataSource.LIST) {
            this.formViewComponent?.setControlValue(
              "selectable_model",
              undefined
            );
            ComponentReactiveFormHelpers.clearControlValidators(
              this.formViewComponent?.getControl("selectable_model")
            );
            ComponentReactiveFormHelpers.setValidators(
              this.formViewComponent?.getControl("selectable_values"),
              Validators.compose([Validators.required])
            );
          } else if (state && +state === SelectableControlDataSource.MODEL) {
            this.formViewComponent?.setControlValue("selectable_values", null);
            ComponentReactiveFormHelpers.clearControlValidators(
              this.formViewComponent?.getControl("selectable_values")
            );
            ComponentReactiveFormHelpers.setValidators(
              this.formViewComponent?.getControl("selectable_model"),
              Validators.compose([Validators.required])
            );
          }
        })
      )
      .subscribe();
    // #endregion Listen for data_source changes
    // #region Listen for label control changes
    this.formViewComponent
      ?.getControl("label")
      .valueChanges.pipe(
        takeUntil(this._destroy$),
        tap((state) => {
          if (state) {
            this.title = state;
          }
        })
      )
      .subscribe();
    // #endregion Listen for label control changes
  }

  fillForm() {
    if (this.control) {
      for (const [k, value] of Object.entries(formControlViewModelBindings())) {
        if (this.formViewComponent?.getControl(k)) {
          if (k === "required_if") {
            this.formViewComponent?.setControlValue(
              "control_is_conditionned",
              this.control[value] ? "1" : "0"
            );
            this.formViewComponent?.setControlValue(
              "required_if",
              this.control[value]
            );
            continue;
          }
          if (k === "selectable_model" && this.control[value]) {
            const config: string = this.control[value] || "";
            const configParts = config.split("|");
            const filters = configParts.find((item) =>
              startsWith(item.trim(), "filters:")
            );
            const tableFilters = config.includes("table:")
              ? configParts.find((item) => startsWith(item.trim(), "table:"))
              : before("|filters", config);

            if (
              filters &&
              this.formViewComponent?.getControl("model_filters")
            ) {
              this.formViewComponent?.setControlValue(
                "model_filters",
                filters.replace("filters:", "").trim()
              );
            }
            if (tableFilters) {
              const v = tableFilters.replace("table:", "").trim();
              this.formViewComponent?.setControlValue("data_source", "2");
              this.formViewComponent?.setControlValue("selectable_model", v);
            }
            continue;
          }
          if (k === "min_date" || k === "max_date") {
            this.formViewComponent?.setControlValue(
              k,
              this.control[value]
                ? MomentUtils.parseDate(
                    this.control[value] as string,
                    null,
                    "YYYY-MM-DD"
                  )
                : null
            );
            continue;
          }
          if (k === "selectable_values" && this.control[value]) {
            this.formViewComponent?.setControlValue("data_source", "1");
          }
          this.formViewComponent?.setControlValue(k, this.control[value]);
        }
      }
    }
  }

  reset() {
    this.formViewComponent?.reset();
  }

  ngOnDestroy() {
    this._destroy$.next();
  }
}
