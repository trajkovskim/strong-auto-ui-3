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

export const parseCheckboxValue = (checkbox: HTMLInputElement) => {
  // if (allCheckboxesByName && allCheckboxesByName?.length > 1) {
  //   return Array.from(allCheckboxesByName.values()).map((checkbox) => mapToValue(checkbox as HTMLInputElement));
  // } else if (allCheckboxesByName?.length === 1) {
  //   return mapToValue(checkbox);
  // }

  return undefined;
};
