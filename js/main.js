/* jslint browser: true */

/**
 * On page load, fetch all content via AJAX and load the most recent page as soon
 * as it comes back. Set up some other event handlers as well.
 */
window.addEventListener('load', function () {
    var content = {
        'ep1-power-steering': {
            body: 'Episode 1 text',
        },
        'ep2-yetis': {
            body: 'Episode 2 text',
        },
        'ep3-unknown': {
            body: 'Episode 3 text',
            latest: true,
        },
    };
    // Fetch content.

    // Set up some event handlers on each 
    var episodeItems = document.querySelectorAll('#episode-list li');

    for (var i = 0; i < episodeItems.length; i++) {
        episodeItems[i].addEventListener('click', function () {
            document.getElementById('show-notes').innerHTML = content[this.id].body;

            // Remove selected class from anyone who might already have it.
            for (var j = 0; j < episodeItems.length; j++) {
                episodeItems[j].classList.remove("selected");
            }

            // Add it back to just this <li>
            this.classList.add("selected");
        });
    }

    document.querySelector('header h1').addEventListener('click', function () {
        // Remove selected class from anyone who might already have it.
        for (var j = 0; j < episodeItems.length; j++) {
            episodeItems[j].classList.remove("selected");
        }

        for (var key in content) {
            if (content[key].latest) {
                document.getElementById('show-notes').innerHTML = content[key].body;
                document.getElementById(key).classList.add("selected");
            }
        }
    });
});