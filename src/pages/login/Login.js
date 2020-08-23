import { Backdrop, Button, CircularProgress, Grid, IconButton, makeStyles, TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Error, LockOpen, MailOutline, Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import logo from '../../../assets/img/logo-home.png';
import './Login.css';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: 'rgba(255, 255, 255, 0.6)'
    },
}));

export default function Login(props) {
    const { setClient, setAccessToken, setUid, serverUrl } = props;

    const classes = useStyles();

    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
        backdropOpen: false,
        invalidCredentials: false,
        redirect: false
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const getAuthorization = (response) => {
        if (!response.ok) {
            throw new Error('invalid credentials');
        }
        const accessToken = response.headers.get('access-token');
        const client = response.headers.get('client');
        const uid = response.headers.get('uid');
        if (accessToken) {
            setAccessToken(accessToken);
            setClient(client);
            setUid(uid);
        }
        return response.json();
    }

    const handleLoginButton = () => {
        const loginInfo = JSON.stringify({ email: values.email, password: values.password });
        setValues({ ...values, backdropOpen: true });
        fetch(`${serverUrl}/users/auth/sign_in`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: loginInfo
        })
            .then(res => getAuthorization(res))
            .then(
                () => {
                    setValues({ ...values, backdropOpen: false, redirect: true });
                },
                () => {
                    setValues({ ...values, backdropOpen: false, invalidCredentials: true });
                }
            )
    };

    const returnEmailEndAdornment = () => {
        if (values.invalidCredentials) {
            return (
                <InputAdornment position="end">
                    <Error className="error-icon" />
                </InputAdornment>);
        }
        return "";
    };
    const returnPasswordEndAdornment = () => {
        if (values.invalidCredentials) {
            return (
                <InputAdornment position="end">
                    <Error className="error-icon" />
                </InputAdornment>);
        }
        return (
            <InputAdornment position="end">
                <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
            </InputAdornment>
        );
    };

    if (values.redirect) {
        return <Redirect to='/empresas' />;
    }

    return (
        <Grid className="main-container" container direction="column" justify="center" alignItems="center">
            <div className="secondary-container">
                <Grid container spacing={8} justify="center" alignItems="center">
                    <Grid className="logo_home" item md={true} sm={true} xs={true}>
                        <img src={logo} alt="logo home" />
                    </Grid>
                </Grid>
                <Grid container spacing={8} justify="center" alignItems="center">
                    <Grid className="Bem-vindo-ao-empresa" item md={true} sm={true} xs={true}>
                        <h1>BEM-VINDO AO EMPRESAS</h1>
                    </Grid>
                </Grid>
                <Grid container spacing={4} justify="center" alignItems="center">
                    <Grid className="Lorem-ipsum-dolor-si" item md={true} sm={true} xs={true}>
                        <span>Lorem ipsum dolor sit amet, contetur adipiscing elit. Nunc accumsan.</span>
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="email" type="email" fullWidth autoFocus required
                            error={values.invalidCredentials}
                            placeholder="E-mail"
                            onChange={(event) => setValues({ ...values, email: event.target.value })}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MailOutline color="secondary" />
                                    </InputAdornment>
                                ),
                                endAdornment: returnEmailEndAdornment()
                            }} />
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="senha" placeholder="Senha"
                            type={values.showPassword ? 'text' : 'password'} fullWidth required
                            error={values.invalidCredentials}
                            onChange={(event) => setValues({ ...values, password: event.target.value })}
                            FormHelperTextProps={{
                                className: "helper-text"
                            }}
                            helperText={values.invalidCredentials ? "Credenciais informadas são inválidas, tente novamente." : ""}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOpen color="secondary" />
                                    </InputAdornment>
                                ),
                                endAdornment: returnPasswordEndAdornment()
                            }} />
                    </Grid>
                </Grid>
                <Grid container justify="center" style={{ marginTop: '20px' }}>
                    <Button disabled={values.email === '' || values.password === ''} onClick={handleLoginButton} className="Login-button" size="large" variant="contained" color="primary" style={{ textTransform: "none" }}>Entrar</Button>
                </Grid>
            </div>
            <Backdrop className={classes.backdrop} open={values.backdropOpen}>
                <CircularProgress size={120} thickness={4} color="primary" />
            </Backdrop>
        </Grid>
    );
}
