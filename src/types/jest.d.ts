import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveAttribute(attr: string, value?: string): R;
      toBeChecked(): R;
      toHaveValue(value: string | number | string[]): R;
      toBeVisible(): R;
      toBeInvalid(): R;
    }
  }
} 