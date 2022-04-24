export default function wxToPromise(method, options = {}) {
  return new Promise((resolve, reject) => {
    options.success = resolve;
    options.fail = err => {
      reject(err);
    }
    wx[method](options);
  })
}

const setTabBarBadge = function (unreadCount) {
  if (unreadCount > 0) {
    wx.setTabBarBadge({
      index: 2,
      text: unreadCount + ''
    })
  } else {
    wx.removeTabBarBadge({
      index: 2
    })
  }
};

export {setTabBarBadge}