// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabTitles: ['主页', '我的'],
    typeTabTitles: ["全部", '公告', '话题', '投票', '团购', '需求'],
    currentTab: 0,
    currentType: 0
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
  changeTab: function(e) {
    this.setData({
      currentTab: e.detail.current
    })
  },
  switchTab: function(e) {
    if (this.data.currentTab == e.currentTarget.dataset.id) {
      return;
    }
    this.setData({
      currentTab: e.currentTarget.dataset.id
    });
  },
  changeTypeTab: function(e) {
    this.setData({
      currentType: e.detail.current
    });
  },
  switchTypeTab: function(e) {
    if (this.data.currentType == e.currentTarget.dataset.id) {
      return;
    }
    this.setData({
      currentType: e.currentTarget.dataset.id
    });
  }
})