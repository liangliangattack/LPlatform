

// export const  avatarUrl=state=>state.avatarUrl;
// export const  loginStatus=state=>state.loginStatus;

const getters = {
  getAvatarUrl(states) {//头像
    return states.avatarUrl;
  },
  getLoginStatus(states) {//登录 状态
    return states.loginStatus;
  },
};

export default getters;
