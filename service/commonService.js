const validateEmail = (email) => {
  let flag = false;
  if (email) {
    if (email.includes("@") && email.includes(".com")) {
      flag = true;
    }
  } else {
    flag = false;
  }
  return flag;
};

// const SecretKey = "mysecret";
const SecretKey = "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";

module.exports = { validateEmail  , SecretKey};
