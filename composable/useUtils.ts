export const useUtils = () => {
  const sayHello = () => console.log("Message");
  const validateName = (value: any) => {
    if (!value) {
      return "This field is required";
    }
    if (value.length <= 3) {
      return "Filed must be greater than 3";
    }
    return null;
  };
  const validateNameComputed = computed((value: any) => {
    if (!value) {
      return "This field is required";
    }
    if (value.length <= 3) {
      return "Filed must be greater than 3";
    }
    return null;
  });
  const validateConfirmPassword = (value: string, text: string) => {
    if (!value) {
      return "This field is required";
    }
    if (value.length <= 3) {
      return "Password must be greater than 3";
    }
    if (value !== text) {
      return `doesn't match file`;
    }
    return null;
  };
  const validatePassword = (value: any) => {
    if (!value) {
      return "This field is required";
    }
    if (value.length <= 6) {
      return "Password must be grater than 6";
    }
    return null;
  };
  const validateEmail = (value: any) => {
    if (!value) {
      return "This field is required";
    }
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(value)) {
      return "This field must be a valid email";
    }
    return null;
  };
  return {
    sayHello,
    validatePassword,
    validateEmail,
    validateName,
    validateConfirmPassword,
    validateNameComputed,
  };
};
