/*
Helper functions for frontend
*/
import jsonschema from "../../backend/node_modules/jsonschema";
import jobNewSchema  from "../../backend//schemas/jobNew.json";
import JoblyApi from "./api";

const capitalizeWord = (word) => {
  const firstLetter = word.charAt(0);

  const firstLetterCap = firstLetter.toUpperCase();

  const remainingLetters = word.slice(1);

  const final = firstLetterCap + remainingLetters;
  return final;
};

const formatSalary = (salary) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(salary);
};

const validateNewJobFormData = async (data) => {
  try {
    const {company_handle} = data
    const validCompany = await JoblyApi.getCompany(company_handle)
    if (!validCompany || validCompany.length === 0) throw new Error('Try again: Non-existent Company');
    const validator = jsonschema.validate(data, jobNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new Error(errs);
    }
  } catch (error) {
    console.error("form submission validation error", error);
    return false;
  }
  return true;
};
const showFlashMessage = (
    message,
    type,
    setFlashMessageFunc,
    messageInterval = 5000
  ) => {
    setFlashMessageFunc({ message, type });
    setTimeout(() => setFlashMessageFunc(null), messageInterval); // Auto-hide after 5 seconds
  };

  const dismissFlashMessage = (setFlashMessageFunc) => {
    setFlashMessageFunc(null)
  }


export { capitalizeWord, formatSalary, validateNewJobFormData, showFlashMessage, dismissFlashMessage };
