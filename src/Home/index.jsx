/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React from 'react';
import { enquireScreen } from 'enquire-js';

import Nav from '@/layouts/Nav';
import Banner from './Banner';
import Content4 from './Content4';
import Feature0 from './Feature0';
import Feature6 from './Feature6';
import Feature3 from './Feature3';
import Content13 from './Content13';
import Footer from '../layouts/Footer';

import {
  Nav30DataSource,
  Banner10DataSource,
  Content40DataSource,
  Feature00DataSource,
  Feature60DataSource,
  Feature30DataSource,
  Content130DataSource,
  Feature31DataSource,
  Footer0DataSource,
} from './data.source';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const { location = {} } = typeof window !== 'undefined' ? window : {};

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
      // show: !location.port, // 如果不是 dva 2.0 请删除
    };
  }

  componentDidMount() {
    // 适配手机屏幕;
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
  }

  render() {
    const children = [
      <Nav
        id="Nav"
        key="Nav"
        dataSource={Nav30DataSource}
        isMobile={this.state.isMobile}
      />,
      <Banner
        id="Banner"
        key="Banner"
        dataSource={Banner10DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content4
        id="Content4_0"
        key="Content4_0"
        dataSource={Content40DataSource}
        isMobile={this.state.isMobile}
      />,
      <Feature0
        id="Feature0_0"
        key="Feature0_0"
        dataSource={Feature00DataSource}
        isMobile={this.state.isMobile}
      />,
      <Feature6
        id="Feature6_0"
        key="Feature6_0"
        dataSource={Feature60DataSource}
        isMobile={this.state.isMobile}
      />,
      <Feature3
        id="Feature3_0"
        key="Feature3_0"
        dataSource={Feature30DataSource}
        isMobile={this.state.isMobile}
      />,
      <Footer
        id="footer_0"
        key="footer_0"
        dataSource={Footer0DataSource}
        isMobile={this.state.isMobile}
      />,
    ];
    return (
      <div
        className="templates-wrapper"
        ref={(d) => {
          this.dom = d;
        }}
      >
        {children}
      </div>
    );
  }
}
