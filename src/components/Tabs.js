import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Item from './Item';
import { Type } from './../constants';
import { getOpenTabList } from './../lib/chrome';

export class Tabs extends Component {

    static propTypes = {
        tab: PropTypes.shape({
            id: PropTypes.number.isRequired,
            url: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            favIconUrl: PropTypes.string.isRequired,
        }).isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            tabs: [],
        }
    }

    componentDidMount() {
        this.getTabList();
    }

    /**
     * 開いているドキュメント一覧を取得する
     * @returns {Promise.<void>}
     */
    getTabList = async () => {
        const tabs = await getOpenTabList();
        this.setState({
            tabs: tabs,
        });
    };

    /**
     * 開いているドキュメント一覧のHTMLを生成
     * @returns {Array}
     */
    items = () => {
        const currentTab = this.props.tab;
        const { tabs } = this.state;
        return tabs.map((tab, idx) => {
            return (
                <Item key={'tab-' + idx}
                      id={tab.id}
                      url={tab.url}
                      title={tab.title}
                      favIconUrl={tab.favIconUrl}
                      currentId={currentTab.id}
                      type={Type.Tab}
                />
            );
        });
    };

    /**
     * データが見つからない場合
     * @returns {XML}
     */
    notFound = () => {
        return (
            <li className="list-group-item">
                <div className="media-body">
                    <p className="not-found">開いているドキュメントが表示されます。</p>
                </div>
            </li>
        );
    };

    render() {
        const items = this.items();
        return (
            <div className="tabs">
                <ul className="list-group">
                    {items.length ? items : this.notFound()}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tab: state.tab
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
