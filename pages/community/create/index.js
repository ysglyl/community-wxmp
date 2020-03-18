import {
  post
} from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    communityAvatar: '/assets/images/default-avatar.png',
    communityType: ['社区', '家园', '团体'],
    selectedType: 0,
    selectedRegion: ['江苏省', '南京市', '浦口区']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  },
  bindFormSubmit: function(e) {
    const $this = this;
    post({
      url: 'community/insert',
      data: {
        ...e.detail.value,
        avatar: $this.data.communityAvatar,
        type: $this.data.selectedType,
        province: $this.data.selectedRegion[0],
        city: $this.data.selectedRegion[1],
        county: $this.data.selectedRegion[2]
      },
      success: function(res) {
        wx.navigateBack({})
      }
    })
  },
  bindSelectAvatar: function(e) {
    const $this = this;
    wx.chooseImage({
      success: function(res) {
        $this.setData({
          communityAvatar: res.tempFilePaths[0]
        });
      },
    })
  },
  bindSelectType: function(e) {
    this.setData({
      selectedType: e.detail.value
    })
  },
  bindSelectRegion: function(e) {
    this.setData({
      selectedRegion: e.detail.value
    })
  }
})