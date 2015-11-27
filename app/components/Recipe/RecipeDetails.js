import React, { createClass } from 'react';
import Firebase       from 'firebase';
import ReactFireMixin from 'reactfire';



const RecipeDetails = createClass({
    mixins: [ReactFireMixin],

    getInitialState() {
        return {
            recipe: {}
        };
    },

    init() {
        const { nameOf } = this.props.params;
        this.ref = new Firebase('https://vegan-reipes.firebaseio.com/listOfRecipes/');
        const childRef = this.ref.child(nameOf);
        this.bindAsObject(childRef, 'recipe');
    },

    componentWillMount() {
        this.init();
    },


    render() {
        if(!!this.state.recipe.ingredients) {
            var ingredients = this.state.recipe.ingredients.map((ingredient, index) => {
                return <li key={index}>
                            <p>Item: {ingredient.item}</p>
                            <p>Amount: {ingredient.amount}</p>
                        </li>;
            });
        }
        console.log('11111', JSON.stringify(this.state.recipe, null, 4));
        return (
            <div >
                <h3> Name: {this.state.recipe.name} </h3>
                <ul>
                    {ingredients}

                </ul>
            </div>
        );
    }
});

export default RecipeDetails;