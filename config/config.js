const Cloudant = require("@cloudant/cloudant");
const uri = process.env.DB_URL;
// const cloudant = Cloudant(uri)
let cloudant, db;
function ConnectDB() {
  cloudant = Cloudant(uri);
  if (!cloudant) {
    console.log("Cloudant DB not connected");
    return;
  } else {
    cloudant.db.create(process.env.DB_NAME, function (err) {
      if (err) {
        console.log(
          "Could not create new db: " +
            process.env.DB_NAME +
            ", it might already exist."
        );
      }
    });

    db = cloudant.use(process.env.DB_NAME);
  }
  console.log(`Connected to Cloudant DB`);
  return db;
}
module.exports = {
    ConnectDB
};
