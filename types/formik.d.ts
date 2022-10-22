/* eslint-disable no-unused-vars */
import { Formik } from 'formik';

declare module 'formik' {
  interface ErrorMessageProps {
    type: string;
  }
}
