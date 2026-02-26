import { Formik, FormikHelpers } from 'formik';
import { ReactNode } from 'react';


interface Props<T> {
    initialValues: any;
    children: ReactNode;
    validationSchema: any;
    onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void
}

const Form = <T extends object>(props: Props<T>) => {
    return <Formik
        onSubmit={props.onSubmit}
        initialValues={props.initialValues}
        validationSchema={props.validationSchema}
    >
        {props.children}
    </Formik>
};

export default Form;