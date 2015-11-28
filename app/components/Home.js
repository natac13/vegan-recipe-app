import React, { Component } from 'react';
import { Link }             from 'react-router';

export default class Home extends Component{
    render(){
        return (
          <div className="">
            <p>
                <Link to={`/recipes`}> Go See the List of Recipes</Link>
            </p>
            <p>
                <Link to={`/addnew`}> Add New Recipe </Link>
            </p>



          </div>
        );
    }
}
