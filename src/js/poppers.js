function createTogglablePopper(target, popper, options) {
    popper.style.display = 'none';
    options = Object.assign({placement: 'top'}, options);
    target.addEventListener('click', function(e) {
        this.toggled = !this.toggled;
        popper.style.display = this.toggled ? 'block' : 'none';
        this.popper = this.toggled ? new Popper(target, popper, options) : this.popper.destroy();
    });
}

// All podcast menus
var podcastMenuMoreButtons = document.body.querySelectorAll('.podcast-menu_more-button');
var podcastMenuTooltips = document.body.querySelectorAll('.podcast-menu-tooltip');
podcastMenuMoreButtons.forEach(function(node, i) {
    createTogglablePopper(node, podcastMenuTooltips[i], {placement: 'right'});
});

// Podcast player
var sharePodcastButtons = document.body.querySelectorAll('.share-podcast_btn');
var sharePodcastToolTips = document.body.querySelectorAll('.share-podcast-tooltip');
sharePodcastButtons.forEach(function(node, i) {
    createTogglablePopper(node, sharePodcastToolTips[i]);
})