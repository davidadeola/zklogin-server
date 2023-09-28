const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", async (request, response) => {
  const token = request.query["token"];
  try {
    // First Request
    const myHeaders1 = new Headers();
    myHeaders1.append("Content-Type", "application/json");
    const raw1 = JSON.stringify({
      token,
    });
    const requestOptions1 = {
      method: "POST",
      headers: myHeaders1,
      body: raw1,
      redirect: "follow",
    };
    const saltResponse = await fetch(
      "http://salt.api-devnet.mystenlabs.com/get_salt",
      requestOptions1
    );
    const saltResult = await saltResponse.json();
    response.json(saltResult);
    console.log("this is the salt", saltResult);
  } catch (error) {
    console.error(error);
    response.status(error.code || 500).send(error);
  }
});

// app.get("/", async (request, response) => {
//   const requestData = {
//     jwt: request.query["token"],
//     extendedEphemeralPublicKey: request.query["eep"],
//     maxEpoch: request.query["maxEpoch"],
//     jwtRandomness: request.query["jwtRandomness"],
//   };
//   try {
//     // First Request
//     const myHeaders1 = new Headers();
//     myHeaders1.append("Content-Type", "application/json");
//     const raw1 = JSON.stringify({
//       token: requestData.jwt,
//     });
//     const requestOptions1 = {
//       method: "POST",
//       headers: myHeaders1,
//       body: raw1,
//       redirect: "follow",
//     };
//     const saltResponse = await fetch(
//       "http://salt.api-devnet.mystenlabs.com/get_salt",
//       requestOptions1
//     );
//     const saltResult = await saltResponse.json();
//     // console.log(saltResult);

//     // Second Request
//     const myHeaders2 = new Headers();
//     myHeaders2.append("Content-Type", "application/json");
//     const raw2 = JSON.stringify({
//       jwt: requestData.jwt,
//       extendedEphemeralPublicKey: requestData.extendedEphemeralPublicKey,
//       maxEpoch: requestData.maxEpoch,
//       jwtRandomness: requestData.jwtRandomness,
//       salt: saltResult.salt,
//       keyClaimName: "sub",
//     });
//     console.log(raw2);
//     const requestOptions2 = {
//       method: "POST",
//       headers: myHeaders2,
//       body: raw2,
//       redirect: "follow",
//     };
//     const zkProofResponse = await fetch(
//       "https://prover.mystenlabs.com/v1",
//       requestOptions2
//     );
//     const zkProofResult = await zkProofResponse.json();
//     response.json(zkProofResponse);
//     console.log("This is the response i need", zkProofResult);
//   } catch (error) {
//     console.error(error);
//     response.status(error.code || 500).send(error);
//   }
// });

app.listen(5000, () => {
  console.log("Example app listening on port 5000!");
});

module.exports = app;
