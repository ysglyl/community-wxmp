// pages/index/index.js
import {
  post,
  min,
  max
} from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 100,
    pageSize: 10,
    communityLastId: 0,
    communityNewestId: 0,
    communityLoadingAll: false,
    activityLastId: 0,
    activityNewestId: 0,
    activityLoadingAll: false,
    tabTitles: ['社区', '活动', "我的"],
    currentTab: 0,
    communityList: [],
    activityType: ['全部', '公告', '话题', '投票', '统计', '团购', '需求'],
    currentType: 0,
    activityList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const $this = this;
    wx.getSystemInfo({
      success(res) {
        $this.setData({
          windowHeight: res.windowHeight
        })
      }
    });
    if (this.data.communityList.length == 0) {
      this.loadCommunity(0);
    }
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
    });
    if (this.data.currentTab == 1 && this.data.activityList.length == 0) {
      this.loadActivity(0);
    }
  },
  switchTab: function(e) {
    if (this.data.currentTab == e.currentTarget.dataset.id) {
      if (this.data.currentTab == 0) {
        this.loadCommunity(0);
      } else if (this.data.currentTab == 1) {
        this.loadActivity(0);
      }
      return;
    }
    this.setData({
      currentTab: e.currentTarget.dataset.id
    });
  },
  switchType: function(e) {
    if (this.data.currentType == e.currentTarget.dataset.id) {
      return;
    }
    this.setData({
      currentType: e.currentTarget.dataset.id,
      activityList: [],
      activityNewestId: 0,
      activityLastId: 0,
      activityLoadingAll: false
    });
    this.loadActivity(0);
  },
  loadMoreCommunity: function(e) {
    if (!this.data.communityLoadingAll) {
      this.loadCommunity(1);
    }
  },
  loadMoreActivity: function(e) {
    if (!this.data.activityLoadingAll) {
      this.loadActivity(1);
    }
  },
  loadCommunity: function(mode) {
    const $this = this;
    const pageSize = this.data.pageSize;
    post({
      url: 'community/loadingList',
      data: {
        loadMode: mode,
        referenceId: mode === 0 ? $this.data.communityNewestId : $this.data.communityLastId,
        pageSize
      },
      success: function(res) {
        if (res.code === 200) {
          if (res.data.records.length > 0) {
            const newData = {}
            if (mode === 0) { //刷新
              if ($this.data.communityNewestId == 0) {
                newData.communityList = [...res.data.records, ...$this.data.communityList];
                newData.communityLastId = min(res.data.records)
              } else {
                newData.communityList = [...res.data.records.reverse(), ...$this.data.communityList]
              }
              newData.communityNewestId = max(res.data.records);
            } else {
              newData.communityList = [...$this.data.communityList, ...res.data.records]
              newData.communityLastId = min(res.data.records);
            }
            $this.setData(newData);
          } else if (mode === 1) {
            $this.setData({
              communityLoadingAll: true
            })
          }
        }
      }
    })
  },
  loadActivity: function(mode) {
    const $this = this;
    const type = this.data.currentType;
    const pageSize = this.data.pageSize;
    post({
      url: 'activity/loadingList',
      data: {
        type,
        loadMode: mode,
        referenceId: mode == 0 ? this.data.activityNewestId : this.data.activityLastId,
        pageSize
      },
      success: function(res) {
        if (res.code === 200) {
          if (res.data.records.length > 0) {
            const newData = {}
            if (mode === 0) { //刷新
              if ($this.data.activityNewestId === 0) {
                newData.activityList = [...res.data.records, ...$this.data.activityList];
                newData.activityLastId = min(res.data.records)
              } else {
                newData.activityList = [...res.data.records.reverse(), ...$this.data.activityList]
              }
              newData.activityNewestId = max(res.data.records);
            } else {
              newData.activityList = [...$this.data.activityList, ...res.data.records]
              newData.activityLastId = min(res.data.records);
            }
            $this.setData(newData);
          } else if (mode === 1) {
            $this.setData({
              activityLoadingAll: true
            })
          }
        }
      }
    })
  }
})