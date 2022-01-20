import { IDynamicForm, IHTMLFormControl, ISelectItem, SelectInput } from "../core/components/dynamic-inputs/core";

type ResponseData<T> = {

    items: {

        data: T[];

    };

};

export const rebuild_select_control_items = (

    form: IDynamicForm,

    name: string,



    items: ISelectItem[]

) => {

    // console.log(items);

    // TODO: Select the control matching hr_level_id form control name

    const controls = [...((form.controlConfigs ?? []) as IHTMLFormControl[])];

    // TODO : SELECT CONTROL INDEX MATCHING hr_level_id

    const index = controls.findIndex(

        (control) => control.formControlName === name

    );

    let levelSelect = controls[index] as SelectInput;

    if (levelSelect) {

        // Set the items of the select control to equal the data values

        levelSelect = {

            ...levelSelect,

            items,



        };

        controls[index] = levelSelect;

        return createDynamicForm({

            ...form,

            controlConfigs: controls,

        });

        // return cloneDynamicForm({

        // ...form,

        // controlConfigs: controls,

        // });

        // return form;

    }

    // return createDynamicForm(form);

};
function createDynamicForm(arg0: { controlConfigs: IHTMLFormControl[]; id: string | number; title: string; description?: string | undefined; forms?: IDynamicForm[] | undefined; endpointURL?: string | undefined; appcontext?: string | undefined; }) {
    throw new Error("Function not implemented.");
}

