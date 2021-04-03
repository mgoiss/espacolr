import Login from 'pages/Auth/Login';
import Scheduling from 'pages/Scheduling';
import React from 'react'
import { Redirect, Route, Switch } from 'react-router';
import './styles.scss';

type Props = {
  img: React.ReactNode;
  title: string;
  subTitle: string;
}

const BaseScreen = ({ img, title, subTitle }: Props) => {
  return (
    <div className="base-screen-container">
      <div className="base-screen-info">
        <h1 className="base-screen-info-title">
          {title}
        </h1>
        <p className="base-screen-info-subtitle" dangerouslySetInnerHTML={{ __html: `${subTitle}` }} />
        {img}
      </div>
      <div className="base-screen-content">
        <Switch>
          <Redirect from="/auth" to="/auth/login" exact />
          <Route path="/auth/login">
            <Login />
          </Route>
          <Route path="/auth/recover">
            <h1>RECUPERAÇÃO</h1>
          </Route>
          <Route path="/scheduling">
            <Scheduling />
          </Route>
        </Switch>
      </div>
    </div >
  );
}

export default BaseScreen;