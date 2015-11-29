import React, { createClass } from 'react';
import Firebase       from 'firebase';
import ReactFireMixin from 'reactfire';
import moment         from 'moment';

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
        let { value, className: property } = event.target;
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
            return value.split(',')
        }
        if(property === 'ingredients') {
            // return list of objects that are the ingredients for the recipe
            return value.split(',').map((ingredient) => {
                const [ item, amount ] = ingredient.split(':');
                return {
                    item,
                    amount
                }
            })
        }
        // was the name property so just pass through
        return value;
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
            created,
            ingredients,
            directions
        }
        // send to Firebase
        this.ref.push(obj);
        // change to the list view
        this.props.history.pushState(null, '/recipes');

    },

    render() {
        return (
            <div>
                <form role="form" onSubmit={this.handleSubmit}>
                    <RecipeInput name="name" update={this.update} />
                    <RecipeInput name="directions" update={this.update} />
                    <RecipeInput name="ingredients" update={this.update} />
                    <button type="submit" value="submit"> submit</button>

                </form>
                <pre>
                    {this.state.name}
{/*Add in a preview of the recipe to be submitted*/}
                </pre>

            </div>
        );
    }
});

export default AddRecipe;