var ViewIdSubscriptionMap = {};

var socket = void 0;

/*subscribe the viewInfo to the server - @sourbh*/
var subscribeSocket = viewInfo => {
  socket.emit("subscribe", viewInfo);
};

/*unsubscribe the viewInfo to the server - @sourbh*/
var unSubscribeSocket = viewName => {
  socket.emit("unsubscribe", viewName);
};

/** save the map of every viewInfo with callback @sunil*/
var saveSubscriptionInfo = (viewInfo, callback) => {
    ViewIdSubscriptionMap[viewInfo.imei]= ViewIdSubscriptionMap[viewInfo.imei] || {}
    ViewIdSubscriptionMap[viewInfo.imei]= {
      callback
    }
  subscribeSocket(viewInfo);
};
/** delete the viewInfo from cache on unmount of view @sunil*/
var deleteSubscriptionInfo = viewName => {
  delete ViewIdSubscriptionMap[viewName.imei];
  unSubscribeSocket(viewName);
};

var connectToSocket = (_) => {
  var io = require("socket.io-client");
  let socketUrl = "http://127.0.0.1:7071";
  socket = io.connect(socketUrl, {
    transports: ["websocket"]
  });

  socket.on("connect", _ => {
    console.log("socket connected", socket.id);
    /*SubScribeSocket in connect is used for case of reconnect socket on change socket mappings on sever to resubscribe subscriptions on server - sachin*/

  });

  socket.on("re_conn", _ => {
    /*on disconnect again connect the socket and resubscribes the view with new socket id @sunil*/
    socket.close();
    socket.open();
  });

  socket.on("disconnect", _ => {
    /*on disconnect again connect the socket and resubscribes the view with new socket id @sunil*/
    socket.io.reconnect();
  });

  socket.on("error", err => {
    console.log("Error in on connect socket :::" + err);
    return;
  });

  socket.on("connect_error", function(err) {
    console.log("socket connect_error: " + err);
  });

  socket.on("updateInRow", data => {
    /*if any update comes mergeData callback will be called for reflect data @sunil*/
    if(data && ViewIdSubscriptionMap[data.imei]){
        ViewIdSubscriptionMap[data.imei].callback(data);
    }
  });
};

module.exports = {
  connectToSocket,
  saveSubscriptionInfo,
  deleteSubscriptionInfo
};
