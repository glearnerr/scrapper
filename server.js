const CronJob = require("cron").CronJob;
const Initiate = require("./main");

let timeZone = "Asia/Kolkata";
let date = new Date();

try {
  console.log("Trying to deploy on: " + date);
  let Job = new CronJob(
    "0 0 0 * * *", //Starting at 11:00 ( 24 hr Timezone ) everyday and Starting at 22:00 ( 23 hr ) everyday midnight
    () => {
      console.log("Running Job for Backup at " + date);
      Initiate.callMain();
    },
    () => {
      console.log("Job for Backup stopped !!!");
    },
    true /* Start the job right now */,
    timeZone /* Time zone of this job. */
  );

  Job.start();
  console.log("Job for updating database running.....", Job.running); // Job_for_mongo_Dump starts true
} catch (e) {
  console.log(e);
}
