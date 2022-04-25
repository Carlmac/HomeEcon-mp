import cache from '../enum/cache'

export default function wxToPromise(method, options = {}) {
  return new Promise((resolve, reject) => {
    options.success = resolve;
    options.fail = err => {
      reject(err);
    }
    wx[method](options);
  })
}

const setTabBarBadge = async function (unreadCount) {
  try {
    if (unreadCount > 0) {
      await wx.setTabBarBadge({
        index: 2,
        text: unreadCount + ''
      })
      wx.setStorageSync(cache.UNREAD_COUNT, unreadCount)
    } else {
      await wx.removeTabBarBadge({
        index: 2
      })
      wx.setStorageSync(cache.UNREAD_COUNT, 0)
    }

  } catch (err) {
    wx.setStorageSync(cache.UNREAD_COUNT, unreadCount)
  }
};

export {setTabBarBadge}