import { Grid, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import MenuAppBar from '../../components/menu-app-bar/MenuAppBar';
import './Empresas.css';

export default function Empresas(props) {
    const { accessToken, uid, client, serverUrl } = props;
    const [showSearchInput, setShowSearchInput] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [noCompaniesFound, setNoCompaniesFound] = useState(false);
    const [empresas, setEmpresas] = useState([]);
    let history = useHistory();
    const search$ = new Subject();

    const fetchEmpresas = (term) => {
        fetch(`${serverUrl}/enterprises?name=${term}`, {
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
                    if (response.enterprises.length === 0) {
                        setNoCompaniesFound(true);
                        setEmpresas([]);
                    } else {
                        setEmpresas(response.enterprises);
                    }
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    const subscription = search$
        .pipe(
            debounceTime(400),
            distinctUntilChanged(),
            filter(term => term && term.length > 1),
            tap(term => fetchEmpresas(term)))
        .subscribe();

    useEffect(() => {
        return () => subscription.unsubscribe();
    }, []);

    const onSearch = (value) => {
        setNoCompaniesFound(false);
        setSearchValue(value);
        search$.next(value);
    }

    const renderEmpresas = () => {
        return empresas.map(emp => {
            return (
                <Paper elevation={3} className="paper" key={emp.id} onClick={() => history.push(`/empresas/${emp.id}`)}>
                    <Grid container direction="row">
                        <Grid item className="company-logo">
                            <Grid container direction="column" justify="center" alignItems="center" className="logo-container">
                                <Grid item >
                                    <Typography variant="h3" className="logo-title">
                                        {emp.enterprise_name}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column" className="company-details">
                                <Grid item>
                                    <Typography variant="h3">
                                        {emp.enterprise_name}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h4" className="company-type">
                                        {emp.enterprise_type.enterprise_type_name}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5" className="company-type">
                                        {emp.country}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            );
        });
    }

    return (
        <div>
            <MenuAppBar showSearchInput={showSearchInput}
                setShowSearchInput={setShowSearchInput}
                onSearch={onSearch}
                searchValue={searchValue} />
            {
                empresas.length === 0 ?
                    <Grid className="main-container" container direction="column" justify="center" alignItems="center">
                        {!showSearchInput ? <span>Clique na busca para iniciar.</span> : null}
                        {noCompaniesFound ? <Typography variant="h5" className="no-companies-found">Nenhuma empresa foi encontrada para a busca realizada.</Typography> : null}
                    </Grid> :
                    <Grid container direction="column" alignItems="center" className="companies-container">
                        {renderEmpresas()}
                    </Grid>
            }
        </div>
    );
}


