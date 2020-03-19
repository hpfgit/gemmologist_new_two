const setToken = token => {
  uni.setStorageSync("token", token);
};

const setUserInfo = user_info => {
  uni.setStorageSync("user_info", user_info);
}

const getUserInfo = () => {
  return uni.getStorageSync("user_info");
};

const getToken = () => {
  return uni.getStorageSync("token");
};

export default {
  setToken,
  getToken,
  setUserInfo,
  getUserInfo
};
