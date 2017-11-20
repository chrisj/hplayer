const query = new URLSearchParams(window.location.search);
const src = query.get('src').replace(/\/$/, '');

console.log(src);

const player = new Clappr.Player({
	source: src,
	parentId: "#player",
	width: "100%",
	height: "100%",
	plugins: [ChromecastPlugin],
});

const timeControls = {
    j: 5,
    k: 120,
    l: 17 * 60
};

document.addEventListener('keypress', (evt) => {
    const timeChange = timeControls[evt.key];

    if (timeChange) {
        player.seek(player.getCurrentTime() + timeChange);
    }
});

const updateUrlTime = () => {
    const baseUrl = window.location.href.split('#')[0];
    window.location.replace(baseUrl + '#' + `t=${player.getCurrentTime()}`);
}

player.on(Clappr.Events.PLAYER_PAUSE, updateUrlTime);

let alreadyStarted = false;
player.on(Clappr.Events.PLAYER_PLAY, () => {
	if (alreadyStarted) return;
	alreadyStarted = true;
	setInterval(updateUrlTime, 1 * 1000);
});
