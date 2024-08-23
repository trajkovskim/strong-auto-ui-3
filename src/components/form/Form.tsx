import React from 'react';

type Props<T> = Omit<React.ComponentProps<'form'>, 'onSubmit'> & {
  initValues?: T;
  onSubmit?: (values: T) => void;
};

// const getFormValues = (element: HTMLFormElement) => {
//   const formData = new FormData(element);
//   const keysCount: Map<string, number> = new Map();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const values: Record<string, any> = {};

//   for (const [key] of formData.entries()) {
//     if (!keysCount.has(key)) {
//       keysCount.set(key, 0);
//     }

//     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//     keysCount.set(key, keysCount.get(key)! + 1);
//   }

//   for (const [key, value] of formData.entries()) {
//     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//     if (keysCount.get(key)! > 1) {
//       if (!values[key]) {
//         values[key] = [];
//       }

//       values[key] = [...values[key], value];
//     } else {
//       values[key] = value;
//     }
//   }

//   return values;
// };

const Form = <T extends object>(props: Props<T>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const values = (props.initValues ?? {}) as Record<string, any>;

  const events: {
    onChange: React.FormEventHandler<HTMLFormElement>;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
  } = {
    onSubmit: (event) => {
      event.preventDefault();
      props.onSubmit && props.onSubmit(values as T);
    },
    onChange: (event) => {
      const targetElement = event.target as HTMLInputElement;
      const name = targetElement.getAttribute('name');

      if (!name) {
        return;
      }

      if (targetElement.getAttribute('type') === 'checkbox') {
        if (!(name in values)) {
          values[name] = targetElement.value;
          return;
        }

        if (Array.isArray(values[name])) {
          if (targetElement.checked) {
            values[name].push(targetElement.value);
          } else if (values[name].length > 1) {
            const targetElementValueIndex = values[name].indexOf(targetElement.value);
            values[name].splice(targetElementValueIndex, 1);
          } else {
            delete values[name];
          }
        } else {
          if (targetElement.checked) {
            values[name] = [values[name] as string, targetElement.value];
          } else {
            delete values[name];
          }
        }

        return;
      }

      values[name] = targetElement.value;
      props.onChange && props.onChange(event);
    },
  };

  const initForm = (form: HTMLFormElement | null) => {
    if (!form) {
      return;
    }

    for (const [key, value] of Object.entries(values)) {
      const inputFields = form.querySelectorAll(`input[name=${key}]`);
      if (!inputFields.length) {
        break;
      }

      for (const [_, inputField] of inputFields.entries()) {
        const input = inputField as HTMLInputElement;
        const inputType = input.getAttribute('type');
        const inputValue = input.value;

        if (inputType === 'checkbox') {
          input.checked = (Array.isArray(value) && value.includes(inputValue)) || value === inputValue;
        } else {
          input.value = value as string;
        }
      }
    }
  };

  return <form {...props} {...events} ref={initForm} />;
};

export default Form;
