import { Component, ViewChild, OnDestroy, Inject, Input } from "@angular/core";
import { ClrDatagrid, ClrDatagridStateInterface } from "@clr/angular";
import { Router } from "@angular/router";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  shareReplay,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from "rxjs/operators";
import { mapPaginatorStateWith } from "src/app/lib/core/pagination/helpers";
import { createSubject, observableOf } from "src/app/lib/core/rxjs/helpers";
import { doLog } from "src/app/lib/core/rxjs/operators";
import { partialConfigs } from "src/app/lib/views/partials/partials-configs";
import { FormV2 } from "../../../../../core/components/dynamic-inputs/core/v2/models/form";
import { httpServerHost } from "src/app/lib/core/utils/url/url";
import { environment } from "src/environments/environment";
import { AppUIStateProvider } from "src/app/lib/core/ui-state";
import { isDefined } from "src/app/lib/core/utils";
import { writeStream } from "src/app/lib/core/utils/io";
import {
  ComponentReactiveFormHelpers,
  FORMS_PROVIDER,
} from "src/app/lib/core/components/dynamic-inputs/angular";
import {
  FormsProvider,
  FormStoreActions,
  IDynamicForm,
  IHTMLFormControl,
} from "src/app/lib/core/components/dynamic-inputs/core";
import { FormGroup } from "@angular/forms";
import {
  ConfigurationManager,
  CONFIG_MANAGER,
} from "src/app/lib/core/configuration";
import { formViewModelBindings } from "src/app/lib/core/components/dynamic-inputs/core/compact";

@Component({
  selector: "app-listforms",
  templateUrl: "./listforms.component.html",
  styles: [
    `
      .app-content-container {
        padding: 0 16px;
      }
      .submit-btn {
        display: block;
        position: absolute;
        float: right;
        top: 0;
        padding: 0;
        margin: 1.2rem 0;
        right: 0;
        border: none;
        min-width: 2.5rem !important;
      }

      .cell-last {
        position: relative;
      }

      :host ::ng-deep .clr-control-container {
        width: 95% !important;
      }

      :host ::ng-deep .clr-input {
        width: 95% !important;
      }
    `,
  ],
})
export class ListformsComponent implements OnDestroy {
  public selectedValues: { [index: string]: any }[] = [];
  // #region List of component inputs
  @Input()
  dashboardHomeRoute = `/${partialConfigs.routes.commonRoutes.dashboardHomeRoute}`;
  @Input() initialGridState = { page: 1, per_page: 20 };
  @Input() formState!: {
    formgroup: FormGroup;
    controlConfigs: { [index: string]: IHTMLFormControl };
    url: string;
  };
  // List of control names to bind on the view
  @Input() controlNames = [
    "appcontext",
    "title",
    "endpoint_url",
    "description",
  ];
  @Input() formID: string | number = this.config.get("forms.forms");
  // #endregion List og component inputs
  isSelectionEnabled = true;
  selected: FormV2 | undefined = undefined;
  // tslint:disable-next-line: variable-name
  private _destroy$ = createSubject<{}>();

  // #region State observables
  state$ = this.provider.state$.pipe(
    takeUntil(this._destroy$),
    map((state) => ({
      dataSource: {
        ...state.collections,
        data: state?.collections?.data.filter((value) => value.cached !== true),
      },
      performingAction: state.performingAction,
    })),
    doLog("Forms data source: ")
  );

  // tslint:disable-next-line: variable-name
  private _datagridState$ = createSubject<ClrDatagridStateInterface | any>();
  gridState$ = this._datagridState$.pipe(startWith(this.initialGridState));

  // tslint:disable-next-line: variable-name
  formsDatagridState$ = this.gridState$
    .pipe(
      takeUntil(this._destroy$),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((state: ClrDatagridStateInterface) => observableOf(state)),
      shareReplay(1)
    )
    .pipe(
      map((state) => {
        this.provider.paginate(
          `${httpServerHost(this.host)}/${this.path}`,
          state
        );
      }),
      doLog("Forms Datagrid state: ")
    );
  // #endregion State observables

  @ViewChild("clrDataGrid", { static: false }) dataGrid: ClrDatagrid;

  constructor(
    @Inject(FORMS_PROVIDER) private provider: FormsProvider,
    @Inject("FORM_RESOURCES_PATH") private path: string,
    @Inject("FORM_SERVER_HOST") private host: string,
    private _uiState: AppUIStateProvider,
    @Inject(CONFIG_MANAGER) private config: ConfigurationManager
  ) {
    this.formsDatagridState$.subscribe();
  }

  // tslint:disable-next-line: typedef
  navigateToEditView(item: FormV2) {
    this.selected = item;
    this.isSelectionEnabled = false;
    this.selectedValues = undefined;
    this.fillForm();
  }

  fillForm() {
    if (this.selected && this.formState) {
      const formgroup = this.formState?.formgroup;
      for (const [key, value] of Object.entries(formViewModelBindings())) {
        if (formgroup.get(key)) {
          formgroup.get(key).setValue(this.selected[value]);
        }
      }
      this.formState = {
        ...this.formState,
        formgroup,
      };
    }
  }

  onDgHeaderRefresh = () => {
    this._datagridState$.next(this.initialGridState);
  };

  // tslint:disable-next-line: typedef
  onCreateButtonClicked() {
    this.isSelectionEnabled = false;
    this.selectedValues = undefined;
  }

  onCancelFormAction() {
    this.isSelectionEnabled = true;
    this.selectedValues = [];
    this.resetFormState();
  }

  resetFormState() {
    // Get Reference to the form group
    const formgroup = this.formState?.formgroup;
    // Clear/Reset the formgroup
    formgroup.reset();
    this.formState = {
      ...this.formState,
      formgroup,
    };
  }

  onDgRefresh = (state: ClrDatagridStateInterface) =>
    this._datagridState$.next(mapPaginatorStateWith([])(state));

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  onCreateFormStateChange(state: { form: IDynamicForm; formgroup: FormGroup }) {
    this.formState = {
      ...state,
      url: state?.form?.endpointURL,
      controlConfigs: (
        state?.form?.controlConfigs as IHTMLFormControl[]
      ).reduce((carry, curr) => {
        carry[curr.formControlName] = curr;
        return carry;
      }, {}),
    };
  }

  create(requestURL: string, formgroup: FormGroup) {
    ComponentReactiveFormHelpers.validateFormGroupFields(formgroup);
    if (formgroup.valid) {
      this.provider.create(
        `${httpServerHost(this.host)}/${requestURL || this.path}`,
        formgroup.getRawValue()
      );
    }
  }

  async onExportToExcelEvent() {
    this._uiState.startAction();
    await this.provider
      .getAll({
        _query: JSON.stringify({
          whereIn: [
            "id",
            this.selectedValues
              .filter((value) => isDefined(value?.id))
              .map((value) => value?.id),
          ],
        }),
        with_controls: true,
      })
      .pipe(
        tap(async (values) => {
          await writeStream(JSON.stringify(values), "jsonforms.json");
        })
      )
      .toPromise();
    this.selectedValues = [];
    this._uiState.endAction();
  }
}
