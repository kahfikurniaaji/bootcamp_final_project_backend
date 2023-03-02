const pool = require("../../src/config/db");
const {
  insertImage,
  selectAllImages,
  selectImageById,
  updateImageById,
  deleteImageById,
} = require("../../src/repository/image-repository");

const truncate = async () => {
  await pool.query("TRUNCATE TABLE images");
};

const image1 = {
  id: "image-1",
  url: "image1",
};

const image2 = {
  id: "image-2",
  url: "image2",
};

const image3 = {
  id: "image-3",
  url: "image3",
};

test("Insert image", async () => {
  await truncate();
  const result = await insertImage(image1);
  await expect(result).toMatchObject(image1);

  await truncate();
});

test("Insert image with same id or url", async () => {
  await truncate();
  await insertImage(image1);

  let invalidImage = { ...image2 };
  invalidImage.id = image1.id;

  try {
    await insertImage(invalidImage);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  invalidImage = { ...image2 };
  invalidImage.url = image1.url;

  try {
    await insertImage(invalidImage);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  await truncate();
});

test("Select All images or empty images", async () => {
  await truncate();
  await insertImage(image1);
  await insertImage(image2);

  const images = await selectAllImages();
  await expect(images.length > 0).toBeTruthy;
  await truncate();
  await expect(images.length < 1).toBeTruthy;
  await truncate();
});

test("Select image by id", async () => {
  await truncate();
  await insertImage(image1);

  const result = await selectImageById(image1);
  expect(result).toMatchObject(image1);

  await truncate();
});

test("Select image by id with wrong id", async () => {
  await truncate();
  await selectImageById(image1);

  try {
    await selectImageById(image2);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  await truncate();
});

test("Update image", async () => {
  await truncate();
  await insertImage(image1);
  const image = { ...image2 };
  image.id = image1.id;

  const result = await updateImageById(image);
  await expect(result).toMatchObject(image);

  await truncate();
});

test("Update image with wrong id and same url", async () => {
  await truncate();
  await insertImage(image1);
  await insertImage(image2);

  let invalidImage = { ...image3 };
  invalidImage.id = "image-999";
  try {
    await updateImageById(invalidImage);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  invalidImage = { ...image2 };
  invalidImage.url = image1.url;
  try {
    await updateImageById(invalidImage);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  await truncate();
});

test("Delete image", async () => {
  await truncate();
  await insertImage(image1);

  const result = await deleteImageById({ id: "image-1" });

  await expect(result).toMatchObject({
    id: image1.id,
    url: image1.url,
  });

  await truncate();
});

test("Delete image with wrong id", async () => {
  await truncate();
  await insertImage(image1);

  try {
    await deleteImageById({ id: "image-2" });
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  await truncate();
});
