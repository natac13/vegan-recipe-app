import React, { createClass } from 'react';
import Firebase       from 'firebase';
import ReactFireMixin from 'reactfire';
import moment         from 'moment';

/*** helper ***/
import _ from 'lodash';

/*** Components ***/
import RecipeInput    from './RecipeInput';


const AddRecipe = createClass({
    mixins: [ReactFireMixin],

    getInitialState() {
        return {
            name: '',
            directions: [],
            ingredients: []
        }
    },

    init() {
        this.ref = new Firebase('https://vegan-recipes.firebaseio.com/listOfRecipes');
    },

    componentWillMount() {
        this.init();
    },

    update(event) {
        let { value, id: property } = event.target;
        // the className will be the same as the property of the state I want to
        // update, so grabbing the className 'as' property
        value = this.changeFormat(property, value);
        this.setState({
            [property]: value
        });
        console.log(JSON.stringify(this.state, null, 4));
    },

    changeFormat(property, value) {
        if(property === 'directions') {
            return value.split(',').map(_.trim);
        }
        if(property === 'ingredients') {
            // return list of objects that are the ingredients for the recipe
            return value.split(',').map((ingredient) => {
                const [ item, amount ] = ingredient.split(':').map(_.trim);
                return {
                    item,
                    amount
                }
            })
        }
        // was the name property so just pass through
        return _.trim(value);
    },

    makeDate() {
        return moment().format('MMMM Do, YYYY');
    },

    handleSubmit(e) {
        e.preventDefault();
        // create the recipe object from data
        let created = this.makeDate();
        let { name, directions, ingredients } = this.state;
        let obj = {
            name,
            ingredients,
            directions,
            created
        };
        // send to Firebase
        this.ref.push(obj);
        // change to the list view
        this.props.history.pushState(null, '/recipes');

    },

    render() {
        let outputDirections = this.state.directions.map((direction, index) => {
            return (
                <li key={index}> {direction}</li>
            )
        });

        let outputIngredients = this.state.ingredients.map((ingredient, index) => {
            return (
                <li>
                    <p>Item: {ingredient.item} </p>
                    <p>Amount: {ingredient.amount} </p>
                </li>
            )
        });

        return (
            <div>
                <form role="form" className="col span_4_of_8 recipe-input"
                    onSubmit={this.handleSubmit}>
                    <RecipeInput name="name" update={this.update} />
                    <RecipeInput name="directions" update={this.update} />
                    <RecipeInput name="ingredients" update={this.update} />
                    <div className="group"></div>
                    <div className="col span_1_of_8">

                    </div>
                    <button className="col span_4_of_8" type="submit" value="submit"> submit</button>

                </form>
                <div className="col span_4_of_8 recipe-output">
                    <p>Name: {this.state.name}</p>
                    Directions:
                    <ul>
                        {outputDirections}
                    </ul>
                    Ingredients
                    <ul>
                        {outputIngredients}
                    </ul>

                </div>

            </div>
        );
    }
});

export default AddRecipe;