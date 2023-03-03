const Joi = require("joi");
const BadRequestError = require("../src/exceptions/bad-request-error");
test("Joi", async () => {
  try {
    // const schema = Joi.object().keys({
    //   birth_date: Joi.date(),
    //   gender: Joi.string()
    //     .valid("laki-laki", "perempuan")
    //     .insensitive()
    //     .required(),
    // });
    const schema = Joi.string().empty().default("testgan");
    const payload = {
      birth_date: "1/122/2023",
      gender: "lAKi-lhaki",
    };
    const string = "";

    // const result = schema.validate(payload, { abortEarly: false });
    const result = schema.validate(string, { abortEarly: false });
    console.log(result.error.details);
  } catch (error) {
    // console.log(error.error);
  }
});
