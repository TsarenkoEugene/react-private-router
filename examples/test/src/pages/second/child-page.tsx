import React from 'react';

export const ChildPage = ({ childRoutes }: { childRoutes: any }) => (
  <div>
    <h2 id="child-page">Test child page</h2>
    {childRoutes}
  </div>
);
