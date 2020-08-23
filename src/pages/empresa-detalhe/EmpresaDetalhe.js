import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Paper, IconButton, Typography, Grid } from '@material-ui/core';
import { Link, useParams } from "react-router-dom";
import { ArrowBack } from '@material-ui/icons';
import './EmpresaDetalhe.css';

export default function EmpresaDetalhe(props) {
    const { accessToken, uid, client, serverUrl } = props;
    let { id } = useParams();
    const [empresa, setEmpresa] = useState({});

    const fetchEmpresa = () => {
        fetch(`${serverUrl}/enterprises/${id}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "access-token": accessToken,
                "client": client,
                "uid": uid,
            }
        })
            .then(res => res.json())
            .then(
                (response) => {
                    if (response.enterprise) {
                        setEmpresa(response.enterprise);
                    }
                }
            )
    }

    useEffect(() => {
        fetchEmpresa();
        return () => { }
    }, []);

    return (
        <div>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Link to="/empresas">
                        <IconButton className="detail-toolbar">
                            <ArrowBack />
                        </IconButton>
                    </Link>
                    <Typography variant="h5" className="detail-toolbar detail-toolbar-title">
                        {empresa.enterprise_name}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Paper elevation={3} className="detail-paper">
                <Grid container direction="column">
                    <Grid item className="detail-company-logo">
                        <Typography variant="h4" className="detail-toolbar-title">
                            {empresa.enterprise_name}
                        </Typography>
                    </Grid>
                    <Grid item className="detail-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}