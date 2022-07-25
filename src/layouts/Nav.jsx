/* eslint-disable react/no-unused-state */
import React from 'react';
import TweenOne from 'rc-tween-one';
import { Menu } from 'antd';
import { Link } from 'umi';
import { getChildrenToRender } from '../Home/utils';
// import './less/nav.less';

const { Item, SubMenu } = Menu;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneOpen: undefined,
      top: false,
    };
  }

  phoneClick = () => {
    const phoneOpen = !this.state.phoneOpen;
    this.setState({
      phoneOpen,
    });
  };

  scrollHandler = () => {
    // console.log("window.pageYOffset ->"+ window.pageYOffset);
    // eslint-disable-next-line no-unused-expressions
    this.setState({
      top: window.pageYOffset > 10,
    });
  };

  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler);
  }

  // componentDidUpdate() {
  //   console.warn("componentDidUpdate");
  //   if (window.pageYOffset > 10) {
  //     window.removeEventListener('scroll', this.scrollHandler);
  //   } else {
  //     window.addEventListener('scroll', this.scrollHandler);
  //   }
  // }

  render() {
    const { dataSource, isMobile } = this.props;
    const { phoneOpen } = this.state;
    const navData = dataSource.Menu.children;

    // if (window.pageYOffset > 10) {
    //   window.removeEventListener('scroll', this.scrollHandler);
    // } else {
    //   window.addEventListener('scroll', this.scrollHandler);
    // }

    const navChildren = navData.map((item) => {
      const { children: a, subItem, ...itemProps } = item;
      if (subItem) {
        return (
          <SubMenu
            key={item.name}
            {...itemProps}
            title={(
              <div {...a}
                className={`header-item-block ${a.className}`.trim()}
              >
                {a.children.map(getChildrenToRender)}
              </div>
            )}
            popupClassName="header-item-child"
          >
            {subItem.map(($item, ii) => {
              const { children: childItem } = $item;
              const child = childItem.href ? (
                <a {...childItem}>
                  {childItem.children.map(getChildrenToRender)}
                </a>
              ) : (
                <div {...childItem}>
                  {childItem.children.map(getChildrenToRender)}
                </div>
              );
              return (
                <Item key={$item.name || ii.toString()} {...$item}>
                  {child}
                </Item>
              );
            })}
          </SubMenu>
        );
      }
      return (
        <Item key={item.name} {...itemProps}>
          <Link {...a} className={`header-item-block ${a.className}`.trim()}>
            {a.children.map(getChildrenToRender)}
          </Link>
        </Item>
      );
    });

    // -----------------------
    const moment = phoneOpen === undefined ? 300 : null;
    const { top } = this.state;
    return (
      <TweenOne
        component="header"
        animation={{ opacity: 0, type: 'from' }}
        className={`header home-page-wrapper ${top ? 'bg-white' : ''}`}
      >
        <div style={{ position: '', zIndex: 999 }}
          className={`home-page  ${phoneOpen ? ' open' : ''}`}
        >
          <TweenOne
            animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }}
            className="header-logo"
          >
            {/* logo img */}
            <img width="100%" src="https://gw.alipayobjects.com/zos/basement_prod/b30cdc2a-d91c-4c78-be9c-7c63b308d4b3.svg" alt="img" />
          </TweenOne>
          {isMobile && (
            <div
              className="header-mobile-menu"
              onClick={() => {
                this.phoneClick();
              }}
            >
              <em />
              <em />
              <em />
            </div>
          )}
          <TweenOne
            {...dataSource.Menu}
            animation={
              isMobile
                ? {
                  x: 0,
                  height: 0,
                  duration: 300,
                  onComplete: (e) => {
                    if (this.state.phoneOpen) {
                      e.target.style.height = 'auto';
                    }
                  },
                  ease: 'easeInOutQuad',
                }
                : null
            }
            moment={moment}
            reverse={!!phoneOpen}
          >
            <Menu
              mode={isMobile ? 'inline' : 'horizontal'}
              defaultSelectedKeys={['sub0']}
              theme="light"
            >
              {navChildren}
            </Menu>
          </TweenOne>
        </div>
      </TweenOne>
    );
  }
}

export default Header;
