import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useStyles from './styles';

import { createPost, updatePost } from '../../actions/posts';

const Container = styled.div`
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  width: 600px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 3px;
  padding: 20px;
`;

const Form = ({ currentId, setCurrentId, increaseOffset }) => {
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();

    useEffect(() => {
        if (post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        }
        else {
            increaseOffset();
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }

        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    }

    if (!user?.result?.name) {
        return (
            <Container>
                <Typography variant="h6" align="center">
                    Zaloguj się, aby móc tworzyć posty.
                </Typography>
            </Container>
        )
    }

    return (
        <Container>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? 'Edytuj' : 'Napisz'} czego ci sie nie chce</Typography>
                <TextField name='title' variant='outlined' label='Tytuł' fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name='message' variant='outlined' label='Detale' fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name='tags' variant='outlined' label='Tagi' fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}>
                    <FileBase type='file' multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})} />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Zatwierdź</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Wyczyść</Button>
            </form>
        </Container>
    );
}

export default Form;
