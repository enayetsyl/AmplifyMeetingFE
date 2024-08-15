
export const generatePasscode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let passcode = "";
  for (let i = 0; i < 6; i++) {
    passcode += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return passcode;
};
