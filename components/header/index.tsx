import React from 'react'
import Link from 'next/link'
import { fade, makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, InputBase, IconButton, Badge } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import NotificationsIcon from '@material-ui/icons/Notifications'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  appBar: {
    boxShadow: 'none',
    borderBottom: '1px solid lightgrey',
    color: 'rgb(158, 158, 158)',
    backgroundColor: 'white',
    '& a': {
      color: 'inherit',
      textDecoration: 'none',
    },
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    border: '1px solid grey',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

export const Header: React.FC = () => {
  const classes = useStyles()
  return (
    <>
      <AppBar color='default' className={classes.appBar} position='static'>
        <Toolbar>
          <Typography variant='h6'>
            <Link href='/'>
              <a>Next.JS</a>
            </Link>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <IconButton aria-label='show 3 new notifications' color='inherit'>
            <Badge badgeContent={3} color='secondary'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Link href='/profile'>
            <IconButton
              edge='end'
              aria-label='account of current user'
              // aria-controls={menuId}
              aria-haspopup='true'
              // onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header