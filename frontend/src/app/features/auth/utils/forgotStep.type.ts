import { ForgotStep } from './forgotStep.dictionary';

export type TForgotStep = (typeof ForgotStep)[keyof typeof ForgotStep];
