import React, { Component } from 'react';

export default class Main extends Component {
    render() {
        return (
            <div className="">
             <h1>Vegan Recipes</h1>
             <div>
                {this.props.children}
            </div>
            </div>
        );
    }
}