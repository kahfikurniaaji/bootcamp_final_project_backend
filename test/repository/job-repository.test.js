const pool = require("../../src/config/db");
const {
  insertJob,
  selectAllJobs,
  selectJobById,
  updateJobById,
  deleteJobById,
} = require("../../src/repository/job-repository");

const truncate = async () => {
  await pool.query("TRUNCATE TABLE jobs");
};

const job1 = {
  id: "job-1",
  name: "job1",
  salary: "3000000",
};

const job2 = {
  id: "job-2",
  name: "job2",
  salary: "4000000",
};

const job3 = {
  id: "job-3",
  name: "job3",
  salary: "5000000",
};

test("Insert job", async () => {
  await truncate();
  const result = await insertJob(job1);
  await expect(result).toMatchObject(job1);

  await truncate();
});

test("Insert job with same id or name", async () => {
  await truncate();
  await insertJob(job1);

  let invalidJob = { ...job2 };
  invalidJob.id = job1.id;

  try {
    await insertJob(invalidJob);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  invalidJob = { ...job2 };
  invalidJob.name = job1.name;

  try {
    await insertJob(invalidJob);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  await truncate();
});

test("Select All jobs or empty jobs", async () => {
  await truncate();
  await insertJob(job1);
  await insertJob(job2);

  const jobs = await selectAllJobs();
  await expect(jobs.length > 0).toBeTruthy;
  await truncate();
  await expect(jobs.length < 1).toBeTruthy;
  await truncate();
});

test("Select job by id", async () => {
  await truncate();
  await insertJob(job1);

  const result = await selectJobById(job1);
  expect(result).toMatchObject(job1);

  await truncate();
});

test("Select job by id with wrong id", async () => {
  await truncate();
  await selectJobById(job1);

  try {
    await selectJobById(job2);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  await truncate();
});

test("Update job", async () => {
  await truncate();
  await insertJob(job1);
  const job = { ...job2 };
  job.id = job1.id;

  const result = await updateJobById(job);
  await expect(result).toMatchObject(job);

  await truncate();
});

test("Update job with wrong id and same name", async () => {
  await truncate();
  await insertJob(job1);
  await insertJob(job2);

  let invalidJob = { ...job3 };
  invalidJob.id = "job-999";
  try {
    await updateJobById(invalidJob);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  invalidJob = { ...job3 };
  invalidJob.name = job1.name;
  try {
    await updateJobById(invalidJob);
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  await truncate();
});

test("Delete job", async () => {
  await truncate();
  await insertJob(job1);

  const result = await deleteJobById({ id: "job-1" });

  await expect(result).toMatchObject({
    id: job1.id,
    name: job1.name,
  });

  await truncate();
});

test("Delete job with wrong id", async () => {
  await truncate();
  await insertJob(job1);

  try {
    await deleteJobById({ id: "job-2" });
  } catch (error) {
    expect(error instanceof Error).toEqual(true);
  }

  await truncate();
});
