import React, { Component } from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import {Route} from 'react-router-dom';
import FullPost from '../FullPost/FullPost';
// import { Link } from "react-router-dom";
import "./Posts.css";

class Posts extends Component {
  state = {
    posts: []
  };

  selectedPostHandler = id => {
    this.props.history.push({ pathname: `/posts/${id}` });
    // this.setState({ selectedPostId: id });
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get("/posts")
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updateData = posts.map(post => ({
          ...post,
          author: "Max"
        }));
        this.setState({ posts: updateData });
      })
      .catch(error => {
        console.log(error);
        // this.setState({ error: true });
      });
  }

  render = () => {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          //   <Link to={"/"+post.id} key={post.id}>
          <Post
            key={post.id}
            title={post.title}
            postId={post.id}
            author={post.author}
            clicked={() => this.selectedPostHandler(post.id)}
          />
          //   </Link>
        );
      });
    }
    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route path={`${this.props.match.url}/:id`} exact component={FullPost} />
      </div>
    );
  };
}

export default Posts;
