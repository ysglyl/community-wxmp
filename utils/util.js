export const post = function(props) {
  wx.showLoading({
    title: props.loadingTitle || '加载中...',
  })
  wx.request({
    url: "http://10.10.10.204:8899/" + props.url,
    method: 'POST',
    header: { ...props.header,
      openId: wx.getStorageSync("open-id")
    },
    data: props.data,
    success: function(res) {
      if (res.data.code === 200) {
        props.success(res.data.data);
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    },
    complete: function() {
      wx.hideLoading();
    }
  })
}

export const max = function(list) {
  var max = 0;
  for (var data of list) {
    if (data.rowId > max) {
      max = data.rowId;
    }
  }
  return max;
}

export const min = function(list) {
  var min = 0;
  for (var data of list) {
    if (min === 0) {
      min = data.rowId;
    }
    if (data.rowId < min) {
      min = data.rowId;
    }
  }
  return min;
}

export const nowDate = function() {
  var now = new Date();
  var month = now.getMonth();
  if (month < 10) {
    month = '0' + month;
  }
  var date = now.getDate();
  if (date < 10) {
    date = '0' + date;
  }
  return now.getFullYear() + "-" + month + "-" + date;
}