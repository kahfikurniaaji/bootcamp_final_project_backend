const Joi = require("joi");

const addEmployeeSchema = Joi.object({
  image_url: Joi.string().trim().required(),
  name: Joi.string().trim().alphanum().min(1).max(255).required(),
  gender: Joi.string()
    .trim()
    .valid("laki-laki", "perempuan")
    .insensitive()
    .required(),
  birth_date: Joi.date().required(),
  phone: Joi.string().trim().pattern(new RegExp("^[0-9]{9,14}$")).required(),
  email: Joi.string().trim().email(),
  address: Joi.string().trim().min(2).required(),
  job_name: Joi.string().trim().min(2).required(),
  username: Joi.string().trim().alphanum().min(5).max(30).required(),
  password: Joi.string().trim().min(5).required(),
  hire_date: Joi.date().required(),
});

const validatorAddEmployee = async (employee) => {
  await addEmployeeSchema.validate(employee, { abortEarly: false });
};
