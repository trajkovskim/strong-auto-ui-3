export const triggerChange = (input: HTMLElement, newValue: string | undefined) => {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
  nativeInputValueSetter?.call(input, newValue);
};

export const triggerChangeCheckbox = (input: HTMLElement, newValue: boolean | undefined) => {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'checked')?.set;
  nativeInputValueSetter?.call(input, newValue);
};

export const parseInputValue = (input: HTMLInputElement) => {
  const inputType = input.getAttribute('type');

  if (inputType === 'number') {
    return input.valueAsNumber;
  }

  return input.value;
};
