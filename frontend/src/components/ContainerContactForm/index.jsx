import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect } from 'react';
import { sendContactForm } from '../../api/api';


export const ContainerConctactForm = ({children, onSuccess}) => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(1, 'Слишком короткое'),
        social: Yup.string().min(1, 'Слишком короткое'),
        agree: Yup.boolean().oneOf([true], 'Необходимо согласие'),
    });

    const formik = useFormik({
        initialValues: {name: '', social: '', agree: false},
        validationSchema,
        onSubmit: async (values, { setSubmitting, setStatus, resetForm }) => {
            try {
                if (!values.name || !values.social || !values.agree) {
                throw new Error('Заполните все поля');
                }
                
                await sendContactForm(values); 
                console.log("values", values);
                
                resetForm({
                    values: { name: '', social: '', agree: false },
                });
                setStatus({ success: true });
                onSuccess?.();
            } catch (error) {
                setStatus({ error: error.message });
            } finally {
                setSubmitting(false);
            }
        }
    })  

    useEffect(() => {
        if (formik.status?.success) {
            const timer = setTimeout(() => {
            formik.setStatus({}); 
            }, 3000);

            return () => clearTimeout(timer);
        }
        }, [formik.status?.success]); 

    return children(formik);
}