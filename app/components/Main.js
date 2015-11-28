import React, { Component } from 'react';

export default class Main extends Component {
    render() {
        return (
            <div className="col span_8_of_8">
                <header>
                    <h1>Vegan Recipes</h1>
                </header>
            <div className="col span_8_of_8">
                {this.props.children}
            </div>
            </div>
        );
    }
}