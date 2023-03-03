const addEmployee = async ({
  name,
  gender,
  birth_date,
  phone,
  email,
  address,
}) => {
  const id = await uuidv4();
  const profile = await profileRepository.insertProfile({
    id: id,
    image_id: id,
    name: name,
    gender: gender,
    birth_date: birth_date,
    phone: phone,
    email: email,
    address: address,
  });
  return { code: 201, data: profile };
};
