import React, { createClass } from 'react';
import _ from 'lodash'

/**
 * Base off the prop.name with is the field matching the recipe info, I can set
 * what type of input I want to render. If is is for the name then show a text
 * input, else show a larger textarea input
 */
const RecipeInput = createClass({
    render() {
        return (
            <div>
                <label className="col span_2_of_8">{_.capitalize(this.props.name)}</label>
                {this.props.name !== 'name' ?
                <textarea
                    className="col span_5_of_8"
                    id={this.props.name}
                    onChange={this.props.update}>
                </textarea> :
                <input type="text"
                    className="col span_5_of_8"
                    id={this.props.name}
                    onChange={this.props.update} />}
                <div className="group"></div>
            </div>
        );
    }
});

export default RecipeInput;