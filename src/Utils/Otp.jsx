export const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  alert(`Your OTP is: ${otp}`);
  const expiresAt = Date.now() + 30 * 1000;
  localStorage.setItem("otp", JSON.stringify({ otp, expiresAt }));
};

export const isOTPValid = (inputOtp) => {
  const data = JSON.parse(localStorage.getItem("otp"));
  if (!data) return false;
  return Date.now() <= data.expiresAt && parseInt(inputOtp, 10) === data.otp;
};

