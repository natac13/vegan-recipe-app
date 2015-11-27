import React, { Component } from 'react';
import { Link }             from 'react-router';

export default class Home extends Component{
    render(){
        return (
          <h2 className="">
            <Link to={`/recipes`}> Go See the List of Recipes</Link>
          </h2>
        );
    }
}
