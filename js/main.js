var player;

function onYouTubeIframeAPIReady() {
  var videoId = document.getElementById("player").getAttribute("data-video-id");

  player = new YT.Player('player', {
    videoId: videoId,
    events: {
      'onReady': initSkipLinks
    }
  });
}

var initSkipLinks = function () {
  var skipLinks = document.querySelectorAll('.js-skip-to');

  for (var i = 0; i < skipLinks.length; i++) {
    skipLinks[i].addEventListener('click', function (ev) {
      ev.preventDefault();

      skipTo(ev.target.getAttribute("data-skip-to"))
    });
  }
};

var skipTo = function (timeCode) {
  var splitCode = timeCode.split(':');

  // Convert hour to seconds.
  var seconds = parseInt(splitCode[0], 10) * 3600;
  // Convert minutes to seconds.
  seconds += parseInt(splitCode[1], 10) * 60;
  // Add seconds.
  seconds += parseInt(splitCode[2], 10);

  player.seekTo(seconds, true);
};
