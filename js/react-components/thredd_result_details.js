class ThreddResultDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: null,
            showTooltip: false
        };

        this.showTooltip = this.showTooltip.bind(this);
        this.closeTooltip = this.closeTooltip.bind(this);
        this.tooltip = React.createRef();
    }

    componentWillMount() {
        let this_ = this;
        if (this.props.thredd_result_type != 'link post') {
            const details_style = {
                className: 'ckueCN',
                style: {
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    padding: '10px'
                }
            }
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tabs) {
                const url_raw = tabs[0].url;
                let url = url_raw
                    .split('://')[1]
                    .split('#')[0]
                    .split('?')[0];
                const url_start_index = this_.props.body.indexOf(url);
                const url_end_index = url_start_index + url.length;
                const truncated_start = url_start_index - 200;
                const truncated_end = url_end_index + 100;
                const is_truncated_start = truncated_start < 0 ? '' : '...';
                const is_truncated_end = truncated_end > this_.props.body.length ? '' : '...';
                const output_html = is_truncated_start +
                    this_.props.body.substring(truncated_start, url_start_index) +
                    "<span style='background-color:yellow;'>" +
                    this_.props.body.substring(url_start_index, url_end_index) +
                    "</span>" +
                    this_.props.body.substring(url_end_index, truncated_end) +
                    is_truncated_end;

                this_.setState ({
                    details: React.createElement('div', Object.assign(details_style, {
                        dangerouslySetInnerHTML: {__html: output_html}
                    }))
                });
            });
        }
    }

    showTooltip(event) {
        this.setState({ showTooltip: true });
    }

    closeTooltip(event) {
        this.setState({ showTooltip: false });
    }

    renderReason() {
        const verb = this.props.thredd_result_type == 'link post' ?
            ' started a discussion about this URL.' :
            ' mentioned your URL in the thread:';
        return React.createElement('div', {
            className: 'hPglCh',
            style: {paddingBottom: '2%'}
        }, [
            React.createElement('a', {
                className: 'RVnoX',
                href: 'https://www.reddit.com/user/' + this.props.author,
                target: "_blank"
            }, this.props.author),
            React.createElement('span', {
                className: 'cFQOcm'
            }, verb)
        ]);
    }

    renderTooltip(showTooltip) {
        return (
            showTooltip ? (
                React.createElement('div', {
                    className: 'links-background'
                }, [
                    React.createElement('a', {
                        href: buildCommentUrl({
                            id: this.props.link_id.indexOf('_') != -1 ?
                                this.props.link_id.split('_')[1] :
                                this.props.link_id,
                            num_comments: this.props.num_comments
                        }) + `#${this.props.id}`
                    }, [
                        this.renderReason(),
                        this.state.details
                    ])
                ])
            ) : null
        );
    }

    render () {
        let tooltip = this.renderTooltip(this.state.showTooltip);
        return React.createElement('span', {
            onClick: this.showTooltip,
            style: {cursor: 'pointer'}
        }, [
            React.createElement("span", {
                className: "s1461iz-1 icon icon-info RVnoX",
                title: "Search for the most relevant comment in this post"
            }, React.createElement('span', {
                style: {display: this.props.display ? 'inline' : 'none'}
            }, '  Why is this post relevant?')),
            React.createElement('div', {
                className: 'dMZkik',
                onMouseLeave: this.closeTooltip,
                ref: this.tooltip
            }, tooltip)
        ]);
    }
}
