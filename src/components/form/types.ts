import { StyledContainerProps, StyledInputProps } from 'components/form/Input.styled';
import { FontSize } from 'components/typography/types';
import { Validator } from 'validators';

export type Size = FontSize;

export type DropdownOption = {
  value: string;
  label?: string;
};

export type AutocompleteOption = {
  label?: React.ReactNode;
  value: string;
};

export type FormFieldProps<T extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<unknown>> = Omit<
  React.ComponentProps<T>,
  keyof StyledInputProps
> &
  StyledInputProps &
  StyledContainerProps & {
    label?: string;
    rightContainer?: React.ReactNode;
    validate?: Validator;
    clearButton?: boolean;
  };
