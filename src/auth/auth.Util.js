const JWT = require("jsonwebtoken");

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await JWT.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: "2 days",
    });
    const refreshToken = await JWT.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: "20 days",
    });
    jwt.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.log("err while verifing!",err);
      } else {
        console.log("decode:=>",decode);
      }
    });
    return { accessToken, refreshToken };
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createTokenPair };
