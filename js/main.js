/* jslint browser: true */

function EpisodeAudio(el, url) {
    this.el = el;
    this.url = url;
    this.audio = null;
}

EpisodeAudio.prototype.play = function () {
    this.audio = new Audio(this.url);
    this.audio.play();

    this.el.classList.remove('fa-play-circle');
    this.el.classList.add('fa-pause-circle');
}

EpisodeAudio.prototype.stop = function () {
    if (this.audio) {
        this.audio.pause();

        this.el.classList.remove('fa-pause-circle');
        this.el.classList.add('fa-play-circle');
        
        this.audio = null;
    }
}

EpisodeAudio.prototype.toggle = function () {
    if (this.audio) this.stop();
    else this.play();
}

window.addEventListener('load', function () {
    let trackEls = document.getElementsByClassName('play-button');
    let tracks = [];

    // Set up all audio tracks.
    for (let i = 0; i < trackEls.length; i++) {
        let track = new EpisodeAudio(trackEls[i], trackEls[i].dataset.src);
        
        trackEls[i].addEventListener('click', function () {
            tracks.forEach(track => track.stop);    // stop all other tracks
            track.toggle();                         // start this one
        });
        
        tracks.push(track);
    }
    
    // Add click handlers to all of the show notes buttons
    let episodes = document.getElementsByClassName('episode');
    for (let i = 0; i < episodes.length; i++) {
        let shownotesBtn = episodes[i].getElementsByClassName('shownotes')[0];
        let shownotesEl = episodes[i].getElementsByClassName('show-notes')[0];
        
        shownotesBtn.addEventListener('click', function () {
            if (shownotesEl.classList.contains('show')) shownotesEl.classList.remove('show');
            else shownotesEl.classList.add('show');
        })
    }
});