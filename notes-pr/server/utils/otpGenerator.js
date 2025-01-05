const otpGen = require("otp-generator");
const jwt = require("jsonwebtoken");

const createOtp = (userInfo) => {
  const otp = otpGen.generate(6, {
    digits: true,
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  const token = jwt.sign({ otp, userInfo }, process.env.JWT_SECRET);
  return { otp, token };
 
};

module.exports = createOtp;
