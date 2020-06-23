import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ToolBar from './Toolbar';
import Viewer from './Viewer';
import Preview from './Preview';
import Footer from './Footer';
import { AppBar, Toolbar } from '@material-ui/core';
import { Rectangle } from '../model/rectangle';
import { useDispatch } from 'react-redux'
import { add, update, redo, undo } from '../store/actions'
import { store } from '../store/store'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    title: {
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 450,
    },
}));


interface MainProps {
    images: string[]
}

export default function Main(props: MainProps) {
    const classes = useStyles();
    const [currentImg, setCurrentImg] = React.useState<string>('');
    const [rectangles, setRectangles] = React.useState<Rectangle[]>([]);
    const dispatch = useDispatch();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    function onPreviewChanged(img: string) {
        setCurrentImg(img)
        setRectangles([])
    }

    function onUndo() {
        dispatch(undo(currentImg))
        const box = store.getState().boxes.find(b => b.url == currentImg)
        setRectangles([...box!.past, box!.present])

    }

    function onRedo() {
        dispatch(redo(currentImg))
        const box = store.getState().boxes.find(b => b.url == currentImg)
        setRectangles([...box!.past, box!.present])
    }

    function updateRectanges(news: Rectangle[]) {
        setRectangles(news.map(r => ({ ...r })))
        const box = store.getState().boxes.find(b => b.url == currentImg)
        if (!box) {
            const newPast = news.slice(0, news.length - 1)
            dispatch(add({
                url: currentImg,
                future: [],
                past: newPast,
                present: news[news.length - 1]
            }))
        }
        else {
            const present = news[news.length - 1]
            const newPast = news.slice(0, news.length - 1)

            dispatch(update({
                url: currentImg,
                future: [],
                past: newPast,
                present: present
            }))
        }
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Bounding Box
          </Typography>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* MainView */}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={fixedHeightPaper}>
                                <ToolBar onUndo={onUndo} onRedo={onRedo} ></ToolBar>
                                <Viewer img={currentImg} rectanges={rectangles} updateRectanges={updateRectanges} ></Viewer>
                            </Paper>
                        </Grid>
                        {/* Preview */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <Preview onChanged={onPreviewChanged} imgList={props.images}></Preview>
                            </Paper>
                        </Grid>
                        {/* Recent Submmited */}
                        {/* <Grid item xs={12}>
              <Paper className={classes.paper}>
              </Paper>
            </Grid> */}
                    </Grid>
                    <Box pt={4}>
                        <Footer />
                    </Box>
                </Container>
            </main>
        </div>
    );
}