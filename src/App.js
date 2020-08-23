import React, { useState } from 'react';
import Login from './pages/login/Login'
import Empresas from './pages/empresas/Empresas';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import EmpresaDetalhe from './pages/empresa-detalhe/EmpresaDetalhe';

const serverUrl = `https://empresas.ioasys.com.br/api/v1`;

function PrivateRoute({ children, accessToken, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        accessToken ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

export default function App() {
  const [accessToken, setAccessToken] = useState('');
  const [client, setClient] = useState('');
  const [uid, setUid] = useState('');
  return (
    <Switch>
      <Route path="/login">
        <Login serverUrl={serverUrl} setClient={setClient} setAccessToken={setAccessToken} setUid={setUid} />
      </Route>
      <PrivateRoute path="/empresas/:id" accessToken={accessToken}>
        <EmpresaDetalhe accessToken={accessToken} client={client} uid={uid} serverUrl={serverUrl}/>
      </PrivateRoute>
      <PrivateRoute path="/empresas" accessToken={accessToken}>
        <Empresas accessToken={accessToken} client={client} uid={uid} serverUrl={serverUrl}/>
      </PrivateRoute>
      <Route path="/">
        <Redirect to={{ pathname: "/login" }} />
      </Route>
    </Switch>
  );
}
