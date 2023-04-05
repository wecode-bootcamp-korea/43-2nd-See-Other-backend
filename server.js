const { createApp } = require("./app");
const dbDataSource = require("./api/models/dataSource");

const startServer = async () => {
  const app = createApp();

  await dbDataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((error) => {
      console.error("Error during Data Source initialization", error);
    });
  const PORT = process.env.PORT;
  const IPADDRESS = process.env.IPADDRESS;
  const LOCALADDRESS = process.env.LOCALADDRESS;

  app.listen(PORT, IPADDRESS, () => {
    console.log(
      `💕💕💕 Server Listening to request on ${IPADDRESS}:${PORT} 💕💕💕`
    );
  });
};

startServer();
