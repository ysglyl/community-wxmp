export const post = function(props) {
  wx.showLoading({
    title: props.loadingTitle || '加载中...',
  })
  wx.request({
    url: "http://10.10.10.89:8899/" + props.url,
    method: 'POST',
    header: { ...props.header,
      openId: wx.getStorageSync("open-id")
    },
    data: props.data,
    success: function(res) {
      props.success(res.data);
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