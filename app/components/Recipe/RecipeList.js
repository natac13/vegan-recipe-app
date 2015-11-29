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
        this.ref = new Firebase('https://vegan-recipes.firebaseio.com/');
        const childRef = this.ref.child('listOfRecipes');
        this.bindAsArray(childRef, 'recipes');
    },

    componentWillMount() {
        this.init();
    },

    // componentWillUnmount() {
    //     this.unbind('recipes');
    // },

    render() {
        let recipes = this.state.recipes.map((recipe) => {
            const key = recipe['.key'];
            return <ListItem key={key} data={recipe} location={key}/>
        });
        return (
            <ul className="col span_4_of_8 recipe-list">
                {recipes}
            </ul>
        );
    }
});

const ListItem = (props) => {
    return (
        <li className="recipe-item">
            <Link to={`recipes/${props.location}`}>{props.data.name}</Link>
        </li>
    )
};

export default RecipeList;