import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
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
import { timeout } from "src/app/lib/core/rxjs/helpers";

@Component({
  selector: "app-form-control-preview",
  templateUrl: "./form-control-preview.component.html",
  styleUrls: ["./form-control-preview.component.scss"],
})
export class FormControlPreviewComponent {
  // #region outputs
  @Output() submit = new EventEmitter<{ [index: string]: any }>();
  @Output() remove = new EventEmitter<void>();
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
    ComponentReactiveFormHelpers.validateFormGroupFields(
      this.formViewComponent?.formgroup
    );
    if (this.formViewComponent?.formgroup.valid) {
      if (this.formViewComponent?.formgroup.valid) {
        this.submit.emit({
          body: this.formViewComponent?.formgroup.getRawValue(),
          requestURL: this.form.endpointURL,
          id: this.control ? this.control.id : undefined,
        });
      }
    }
  }

  onComponentReadyStateChanges() {
    timeout(() => {
      this.fillForm();
    }, 1000);
  }

  fillForm() {
    if (this.control) {
      for (const [k, value] of Object.entries(formControlViewModelBindings())) {
        if (this.formViewComponent?.getControl(k)) {
          if (k === "required_if") {
            this.formViewComponent
              ?.getControl("control_is_conditionned")
              .setValue(this.control[value] ? "1" : "0");
            this.formViewComponent
              ?.getControl("required_if")
              .setValue(this.control[value]);
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
              this.formViewComponent
                ?.getControl("model_filters")
                .setValue(filters.replace("filters:", "").trim());
            }
            if (tableFilters) {
              const v = tableFilters.replace("table:", "").trim();
              this.formViewComponent?.getControl("data_source").setValue("2");
              this.formViewComponent
                ?.getControl("selectable_model")
                .setValue(v);
            }
            continue;
          }
          if (k === "min_date" || k === "max_date") {
            this.formViewComponent
              ?.getControl(k)
              .setValue(
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
            this.formViewComponent?.getControl("data_source").setValue("1");
          }
          this.formViewComponent?.getControl(k).setValue(this.control[value]);
        }
      }
    }
    this.formViewComponent
      ?.getControl("data_source")
      .valueChanges.subscribe((state) => {
        if (state && +state === 1) {
          this.formViewComponent?.getControl("selectable_model").setValue(null);
          ComponentReactiveFormHelpers.clearControlValidators(
            this.formViewComponent?.getControl("selectable_model")
          );
          ComponentReactiveFormHelpers.setValidators(
            this.formViewComponent?.getControl("selectable_values"),
            Validators.compose([Validators.required])
          );
        } else {
          this.formViewComponent
            ?.getControl("selectable_values")
            .setValue(null);
          ComponentReactiveFormHelpers.clearControlValidators(
            this.formViewComponent?.getControl("selectable_values")
          );
          ComponentReactiveFormHelpers.setValidators(
            this.formViewComponent?.getControl("selectable_model"),
            Validators.compose([Validators.required])
          );
        }
      });
  }
}
