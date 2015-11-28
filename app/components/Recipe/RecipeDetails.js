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
        const { index } = this.props.params;
        this.ref = new Firebase('https://vegan-recipes.firebaseio.com/listOfRecipes/');
        const childRef = this.ref.child(index);
        this.bindAsObject(childRef, 'recipe');
    },

    componentWillMount() {
        this.init();
    },

    // componentWillUnmount() {
    //     this.unbind('recipe');
    // },


    render() {
        if(!!this.state.recipe.ingredients) {
            var ingredients = this.state.recipe.ingredients.map((ingredient, index) => {
                return <li key={index}>
                            <p>Item: {ingredient.item}</p>
                            <p>Amount: {ingredient.amount}</p>
                        </li>;
            });
        }
        return (
            <div className="col span_8_of_8">
                <h3> Name: {this.state.recipe.name} </h3>
                <ul className="ingredients-list">
                {ingredients}

                </ul>
            </div>
        );
    }
});

export default RecipeDetails;