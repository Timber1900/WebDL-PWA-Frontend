import React from 'react';
import Progress from '../Progress';
import Queue from '../Queue';
import InfoLabel from '../InfoLabel';
// import Search from '../Search/index';

const Layout = () => {
  return (
    <>
      <Progress />
      <Queue />
      <InfoLabel />
      {/* <Search /> */}
    </>
  );
};

export default Layout;
