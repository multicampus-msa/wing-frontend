let axios = require("axios");

const ROOT_URL = "https://www.googleapis.com/youtube/v3/search";

module.exports = function(options, callback) {
  if (!options.key) {
    throw new Error("Youtube Search expected key, received undefined");
  }

  let params = {
    part: "snippet",
    key: options.key,
    q: options.term,
    eventType: "live",
    channelId:"UCJhjE7wbdYAae1G25m0tHAA", // 현재 테스트 페이지 : cafe Music BGM Channel 채널 
    type: "video",
    maxResults: 12
  };

  axios
    .get(ROOT_URL, { params: params })
    .then(function(response) {
      var arr = response.data.items;

      if (callback) {
        callback(arr); // 모든 영상 다 띄울 경우
      }
    })
    .catch(function(error) {
      console.error(error);
    });
};
