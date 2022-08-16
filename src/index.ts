/* index.ts */

import express from 'express';
import cors from 'cors';
import {sequelize} from "./database/config/config";
import router from "./routes/router";

const app: express.Express = express();

app.use(cors({origin: true}));

app.use(express.json({limit: '7mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(express.static("static"));
app.use("/", router);

try {
  sequelize.authenticate()
    .then(() => {
      console.log('[index.ts] Connection has been established successfully.');
    });
} catch (error) {
  console.log('[index.ts] Unable to connect to the database:', error);
}

app.listen(process.env.PORT, () => {
  console.log(
    `server listening on port: ${process.env.PORT} and env: ${process.env.NODE_ENV}`
  );
});

export default app;
