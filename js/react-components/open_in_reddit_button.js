function OpenInRedditButton(props) {
    function onOpen() {
        const comment_id = props.comment_id || '';
        let link = 'https://www.reddit.com/' + props.permalink + comment_id + '?context=10000';
        let reddit_window = window.open(link, '_blank');
        reddit_window.opener = null;
    }

    return React.createElement('div', {
        className: 's1o44igr-1 hNfrQO'
    }, React.createElement('button', {
        className: 's1o44igr-0 hlpDWs',
        onClick: onOpen
    }, React.createElement('i', {
        className: 'icon icon-reddit xwmljjCrovDE5C9MasZja _1GQDWqbF-wkYWbrpmOvjqJ'
    }),
    React.createElement('span', {
        className: '_6_44iTtZoeY6_XChKt5b0'
    }, 'Open In Reddit')));
}
