// pages/activity/notice/create/index.js
import {
  nowDate,
  post
} from '../../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    communityType: [{
      rowId: 0,
      name: '社区'
    }, {
      rowId: 1,
      name: '家园'
    }, {
      rowId: 2,
      name: '团体'
    }],
    communitys: [],
    selectedCommunity: [0, 0],
    permitDeadline: nowDate()
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
    this.loadAllCommunity();
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
  bindChangeType: function(e) {
    if (e.detail.column === 0) {
      this.setData({
        selectedCommunity: [e.detail.value, 0]
      });
    }
  },
  bindSelectCommunity: function(e) {
    if (this.data.communitys[this.data.selectedCommunity[0]].length === 0) {
      return;
    }
    this.setData({
      selectedCommunity: e.detail.value
    })
  },
  bindSelectPermitDeadline: function(e) {
    this.setData({
      permitDeadline: e.detail.value
    })
  },
  loadAllCommunity: function() {
    const $this = this;
    post({
      url: 'community/myAllList',
      success: function(res) {
        $this.setData({
          communitys: [res.filter(item => item.type === 0), res.filter(item => item.type === 1), res.filter(item => item.type === 2)]
        })
      }
    })
  },
  bindFormSubmit: function(e) {
    const $this = this;
    const community = this.data.communitys[this.data.selectedCommunity[0]][this.data.selectedCommunity[1]];
    if (community == undefined) {
      wx.showToast({
        title: '请选择社区',
        icon: 'none'
      })
      return;
    }
    post({
      url: 'activity/insert',
      data: {
        type: 6,
        communityId: community.rowId,
        demand: {
          ...e.detail.value,
          permitDeadline: $this.data.permitDeadline
        }
      },
      success: function(res) {
        wx.navigateBack({})
      }
    })
  },
})