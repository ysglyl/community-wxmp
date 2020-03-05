// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    flagLogin: wx.getStorageSync("open-id") != null,
    avatarUrl: "/assets/images/default-avatar.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const openId = wx.getStorageSync("open-id");
    if(openId == null){
      //查看是否授权
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (response) {
                this.login(response)
              }
            })
          }
        }
      });
    } else {
      this.getCurrentUser(openId);
    }
  },

  bindGetUserInfo: function(res) {
    if (res.detail.userInfo) {
      this.login(res.detail);
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您拒绝了授权，将无法使用小程序!!!',
        showCancel: false,
        confirmText: '返回'
      });
    }
  },

  login: function(userData) {
    console.log(userData);
    wx.login({
      success: function(res) {
        wx.request({
          url: 'http://10.10.10.79:8899/user/wxLogin',
          data: {
            code: res.code,
            signature:userData.signature,
            rawData:userData.rawData,
            encryptedData: userData.encryptedData
          },
          success: function(response) {
            wx.setStorageSync("open-id", response.data.data.openId);;
            app.globalData.userInfo = response.data.data
            wx.redirectTo({
              url: '/pages/index/index',
            });
          }
        })
      }
    })
  },
  getCurrentUser:function(openId){
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})