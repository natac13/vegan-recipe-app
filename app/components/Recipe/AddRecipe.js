import React, { createClass } from 'react';
import Firebase       from 'firebase';
import ReactFireMixin from 'reactfire';
import moment         from 'moment';

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

    },

    componentWillMount() {
        this.init();
    },

    update(event) {
        let { value, className: property } = event.target;
        // the className will be the same as the property of the state I want to
        // update
        value = this.changeValueFormat(property, value);
        this.setState({
            [property]: value
        });
        console.log(JSON.stringify(this.state, null, 4));
    },

    changeValueFormat(property, value) {
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
        return moment().format('MMMM YYYY');
    },

    handleSubmit(e) {
        e.preventDefault();
        console.log('before');
        this.ref = new Firebase('https://vegan-recipes.firebaseio.com/');
        const childRef = this.ref.child('listOfRecipes');
        // create the recipe object from data
        console.log('after');
        let created = this.makeDate();
        let { name, directions, ingredients } = this.state;
        let obj = {
            name,
            created,
            ingredients,
            directions
        }
        // send to Firebase
        childRef.push(obj)


    },

    render() {
        return (
            <div>
                <form role="form" onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <input type="text" ref="name" className="name" onChange={this.update}/>
                    <label>Directions</label>
                    <textarea ref="directions" className="directions" onChange={this.update}>
                    </textarea>
                    <label>Ingredients</label>
                    <textarea ref="ingredients" className="ingredients" onChange={this.update}>
                    </textarea>
                    <label>Created</label>
                    <input type="text" ref="created" readOnly="readOnly" value={this.makeDate()}/>
                    <button type="submit" value="submit"> submit</button>

                </form>
                <pre>
                    {this.state.name}

                </pre>

            </div>
        );
    }
});

export default AddRecipe;