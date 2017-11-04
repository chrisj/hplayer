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
    l: 17 * 20
};

document.addEventListener('keypress', (evt) => {
    const timeChange = timeControls[evt.key];

    if (timeChange) {
        player.seek(player.getCurrentTime() + timeChange);
    }
});

var updateUrlTime = () => {
    window.location.hash = `t=${player.getCurrentTime()}`;
}

player.on(Clappr.Events.PLAYER_PAUSE, updateUrlTime);

setInterval(updateUrlTime, 1 * 1000);
