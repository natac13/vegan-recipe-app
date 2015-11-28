import React, { createClass } from 'react';
import Firebase       from 'firebase';
import ReactFireMixin from 'reactfire';
import moment         from 'moment';

const AddRecipe = createClass({
    mixins: [ReactFireMixin],

    getInitialState() {
        return {
            recipes: []
        }
    },

    init() {

    },

    componentWillMount() {
        this.init();
    },

    makeDate() {
        return moment().format('MMMM YYYY');
    },

    handleSubmit(e) {
        e.preventDefault();
        console.log('submited');
        let name = this.refs.name.value;
        let created = this.refs.created.value;
        this.ref = new Firebase('https://vegan-recipes.firebaseio.com/');
        const childRef = this.ref.child('listOfRecipes');
        let obj = {
            name: name,
            created: created,
            ingredients: [{item: 'banana', amount: 5}],
            directions: ['test', 'testing']
        }
        childRef.push(obj)


    },

    render() {
        return (
            <div>
                <form role="form" onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <input type="text" ref="name"/>
                    <label>Created</label>
                    <input type="text" ref="created" readOnly="readOnly" value={this.makeDate()}/>
                    <button type="submit" value="submit"> submit</button>

                </form>

            </div>
        );
    }
});

export default AddRecipe;