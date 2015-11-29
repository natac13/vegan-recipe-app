import React, { createClass } from 'react';
import { capitalize } from '../../utils/helpers';

/**
 * Base off the prop.name with is the field matching the recipe info, I can set
 * what type of input I want to render. If is is for the name then show a text
 * input, else show a larger textarea input
 */
const RecipeInput = createClass({
    render() {
        return (
            <div>
                <label>{capitalize(this.props.name)}</label>
                {this.props.name !== 'name' ?
                    <textarea
                        className={this.props.name}
                        onChange={this.props.update}>
                    </textarea> :
                    <input type="text"
                        className={this.props.name}
                        onChange={this.props.update} />}
            </div>
        );
    }
});

export default RecipeInput;