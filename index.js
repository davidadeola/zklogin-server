const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.get("/", async (request, response) => {
  const token = request.query["token"];
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      token,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const saltResponse = await fetch(
      "http://salt.api-devnet.mystenlabs.com/get_salt",
      requestOptions
    );
    const result = await saltResponse.json();
    response.json(result);
  } catch (error) {
    console.error(error);
    response.status(error.code || 500).send(error);
  }
});

app.listen(5000, () => {
  console.log("Example app listening on port 5000!");
});

module.exports = app;
