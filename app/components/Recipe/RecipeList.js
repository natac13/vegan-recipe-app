import React, { createClass } from 'react';
import { Link }             from 'react-router';

import Firebase       from 'firebase';
import ReactFireMixin from 'reactfire';



const RecipeList = createClass({
    mixins: [ReactFireMixin],
    getInitialState() {
        return {
            recipes: []
        };
    },

    init() {
        this.ref = new Firebase('https://vegan-reipes.firebaseio.com/');
        const childRef = this.ref.child('listOfRecipes');
        this.bindAsArray(childRef, 'recipes');
    },

    componentDidMount() {
        this.init();
    },

    render() {
        let recipes = this.state.recipes.map((recipe, index) => {
            return <li key={index}><Link to={`recipes/${index}`}>{recipe.name}</Link></li>;
        });
        return (
            <ul >
                {recipes}
            </ul>
        );
    }
});

export default RecipeList;