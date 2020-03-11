// pages/login/login.js
import {
  post
} from '../../utils/util.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    avatarUrl: "/assets/images/default-avatar.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const openid = wx.getStorageSync("open-id");
    const $this = this;
    if (openid == null || openid == '') {
      //查看是否授权
      wx.getSetting({
        success: function(res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              lang: 'zh_CN',
              success: function(response) {
                $this.login(response)
              }
            })
          }
        }
      });
    } else {
      $this.getCurrentUser(openid);
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
    const $this = this;

    wx.login({
      success: function(res) {
        post({
          loadingTitle: "登录中...",
          url: 'user/wxLogin',
          header:{
            "content-type": 'application/x-www-form-urlencoded'
          },
          data: {
            code: res.code,
            signature: userData.signature,
            rawData: userData.rawData,
            encryptedData: userData.encryptedData,
            iv: userData.iv
          },
          success: function(response) {
            if (response.code == 200) {
              wx.setStorageSync("open-id", response.data.openId);;
              app.globalData.userInfo = response.data;
              $this.avatarUrl = response.data.avatarUrl;
              wx.redirectTo({
                url: '/pages/index/index',
              });
            } else {
              wx.showToast({
                title: response.msg,
                icon: 'none'
              })
            }
          }
        })
      }
    })
  },
  getCurrentUser: function(openid) {
    const $this = this;
    post({
      loadingTitle: '登录中...',
      url: "user/getByOpenid",
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      data: {
        openid
      },
      success: function(response) {
        if (response.code == 200) {
          wx.setStorageSync("open-id", response.data.openId);
          app.globalData.userInfo = response.data;
          $this.avatarUrl = response.data.avatarUrl;
          wx.redirectTo({
            url: '/pages/index/index',
          });
        }
      }
    })
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