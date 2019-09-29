// localStorage 和 sessionStorage 保存
export default {
  // 获取session
  getSession: function (name) {
    if (!name) {
      return
    }
    return JSON.parse(window.sessionStorage.getItem(name))
  },
  // 设置session
  setSession: function (name, context) {
    if (!name) {
      return
    }
    if (context !== 'String') {
      context = JSON.stringify(context)
    }
    window.sessionStorage.setItem(name, context)
  },
  // 删除session
  removeSession: function (name) {
    if (!name) {
      return
    }
    return window.sessionStorage.removeItem(name)
  },
  // 获取localStorage
  getLocal: function (name) {
    if (!name) {
      return
    }
    return JSON.parse(window.localStorage.getItem(name))
  },
  // 设置localStorage
  setLocal: function (name, context) {
    if (!name) {
      return
    } else if (context !== 'String') {
      context = JSON.stringify(context)
    }
    window.localStorage.setItem(name, context)
  },
  // 删除localStorage
  removeLocal: function (name) {
    if (!name) {
      return
    }
    window.localStorage.removeItem(name)
  }
}
