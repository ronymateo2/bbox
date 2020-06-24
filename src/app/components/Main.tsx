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
import Log from './Log'
import { AppBar, Toolbar } from '@material-ui/core';
import { Rectangle } from '../model/rectangle';
import { Box as BoxModel, canRedo, candUndo } from '../model/box';


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
    boxes: BoxModel[]
    box: BoxModel,
    log: BoxModel[]
    images: string[],
    currentImg: string,
    rectangles: Rectangle[],
    onUndo: (id: string) => void,
    onRedo: (id: string) => void,
    onSumbit: (id: string) => void
    onUpdate: (rects: Rectangle[], id: string) => void,
    onPreviewChanged: (id: string) => void
}

export default function Main(props: MainProps) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const rectangles = props.rectangles;
    const currentImg = props.currentImg;

    const disabledUndo = !candUndo(props.box);
    const disabeldRedo = !canRedo(props.box);

    function onPreviewChanged(img: string) {
        props.onPreviewChanged(img)
    }

    function onUndo() {
        props.onUndo(currentImg)
    }

    function onRedo() {
        props.onRedo(currentImg)
    }

    function updateRectanges(news: Rectangle[]) {
        props.onUpdate(news, currentImg)
    }

    function onSubmit(){
        props.onSumbit(currentImg)
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
                                <ToolBar onUndo={onUndo} onRedo={onRedo} disabeldRedo={disabeldRedo} disabledUndo={disabledUndo} ></ToolBar>
                                <Viewer img={currentImg} rectanges={rectangles} updateRectanges={updateRectanges} ></Viewer>
                            </Paper>
                        </Grid>
                        {/* Preview */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <Preview onChanged={onPreviewChanged} imgList={props.images}  onSubmit={onSubmit}></Preview>
                            </Paper>
                        </Grid>
                        {/* Recent Submmited */}
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Log list={props.log}></Log>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Footer />
                    </Box>
                </Container>
            </main>
        </div>
    );
}