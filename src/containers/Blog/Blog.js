import React, { Component } from 'react';
import axios from '../../axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts : [],
        selectedPostId: null,
        error: false
    }
    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updateData = posts.map(post => ({
                    ...post,
                    author: 'Max'
                }))
                this.setState({posts: updateData})
            })
            .catch(error => {this.setState({error: true})});
    }

    selectedPostHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>
        if(!this.state.error){
            posts = this.state.posts.map(post => {
            return <Post key={post.id} 
                        title={post.title} 
                        postId={post.id}
                        author={post.author}
                        clicked={() => this.selectedPostHandler(post.id)}/>
                    });
        }
        return (
            <div>
                <section className="Posts">
                    {posts} 
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;