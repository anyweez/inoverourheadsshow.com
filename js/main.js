/* jslint browser: true */
var moment = require('moment');

/**
 * Update the main content pane with data from the specified episode.
 */
function loadContent(episode) {
    'use strict'
    var heading = document.querySelector('#show-notes h2');
    heading.innerHTML = "Episode " + episode.number + ": " + episode.title;

    var timestamp = document.querySelector('#show-notes .recording-ts');
    timestamp.innerHTML = "Recorded on " + moment(episode.timestamp).format('ddd, MMM D, YYYY');

    var player = document.getElementById('audio-player');
    player.src = episode.audio;

    var notes = document.querySelector('#show-notes #notes-content');
    notes.innerHTML = episode.content;
}

function highlight(one, all) {
    for (var i = 0; i < all.length; i++) {
        all[i].classList.remove('selected');
    }

    one.classList.add('selected');
}

/**
 * On page load, fetch all content via AJAX and load the most recent page as soon
 * as it comes back. Set up some other event handlers as well.
 */
window.addEventListener('load', function () {
    var content = {};

    var req = new XMLHttpRequest();
    // Update the content object once the response comes back.
    req.onload = function (response) {
        JSON.parse(req.responseText).forEach(function (episode) {
            content[episode.id] = episode;
        });

        // Set up some event handlers on each episode item.
        var episodeItems = document.querySelectorAll('#episode-list li');

        for (var i = 0; i < episodeItems.length; i++) {
            episodeItems[i].addEventListener('click', function () {
                loadContent(content[this.id]);
                highlight(this, episodeItems);
            });
        }

        // The header should reset to the default state.
        document.querySelector('header h1').addEventListener('click', function () {
            // Remove selected class from anyone who might already have it.
            for (var j = 0; j < episodeItems.length; j++) {
                episodeItems[j].classList.remove("selected");
            }

            for (var key in content) {
                if (content[key].latest) {
                    loadContent(content[key]);
                    highlight(document.getElementById(key), episodeItems);
                }
            }
        });
    };

    req.open('GET', '/content.json');
    req.send();
});