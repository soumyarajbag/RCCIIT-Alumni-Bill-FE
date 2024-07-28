
  export function clearSpaces(str:string) {
    return str.replace(/\s/g, '');
  }
  
  export const validateUserReg = (inputs: any) => {
    const errors = {
      name: "",
      phone: "",
      roll: "",
      gender: "",
    };
    const regexPhone =
      /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    if (inputs.name === "") {
      errors.name = "Name is required";
    }
    if (inputs.phone === "") {
      errors.phone = "Phone is required";
    } else if (!regexPhone.test(clearSpaces(inputs.phone).trim())) {
      errors.phone = "Invalid Phone Number";
    }
    if (inputs.gender === "") {
      errors.gender = "Gender is required";
    }
  
    return errors;
  };
  