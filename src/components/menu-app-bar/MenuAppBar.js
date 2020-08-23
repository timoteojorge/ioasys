import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { Clear } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import logoNav from '../../../assets/img/logo-nav.png';
import './MenuAppBar.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    cssOutlinedInput: {
        borderColor: `#fff !important`,
        color: `#fff !important`,
    },
    focused: {
        color: `#fff !important`,
    },

}));

export default function MenuAppBar(props) {
    const classes = useStyles();

    const { showSearchInput, setShowSearchInput, searchValue, onSearch } = props;

    const getToolbarContent = () => {
        if (showSearchInput) {
            return (
                <Grid direction="row" container spacing={1} justify="space-between" alignItems="center">
                    <Grid item className="search-input-container">
                        <TextField id="search" placeholder="Pesquisar"
                            type="text"
                            fullWidth
                            className="search-input"
                            value={searchValue}
                            autoFocus
                            onChange={(event) => onSearch(event.target.value)}
                            InputProps={{
                                classes: {
                                    root: classes.cssOutlinedInput,
                                    focused: classes.focused
                                },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton
                                            onClick={() => onSearch(searchValue)}>
                                            <SearchIcon className="form-toolbar" />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => onSearch('')}>
                                            <Clear className="form-toolbar" />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }} />
                    </Grid>
                </Grid>
            )
        } else {
            return (
                <Grid direction="row" container spacing={1} justify="space-between" alignItems="center">
                    <Grid item>
                    </Grid>
                    <Grid item>
                        <img className="logo-nav" src={logoNav} alt="logo nav" />
                    </Grid>
                    <Grid item>
                        <IconButton
                            onClick={() => setShowSearchInput(true)}>
                            <SearchIcon className="form-toolbar" />
                        </IconButton>
                    </Grid>
                </Grid>
            )
        }
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    {getToolbarContent()}
                </Toolbar>
            </AppBar>
        </div>
    );
}
