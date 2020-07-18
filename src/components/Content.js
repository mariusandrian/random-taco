import React, { Component } from 'react'
const ReactMarkdown = require('react-markdown')

export class Content extends Component {
    constructor (props) {
        super(props);
        this.state = {
            baseURL: "https://taco-randomizer.herokuapp.com/random/",
            taco: null
        }
    }

    getRandomTaco = () => {
        this.setState({}, async () => {
            try {
                const response = await fetch(this.state.baseURL);
                const result = await response.json();
                this.setState({taco: result})
            } catch (err) {
                console.log(err);
            }
        })
    }

    async componentDidMount () {
        this.getRandomTaco();
    }

    render() {
        return (
            <div className="content-container">
                <button onClick={this.getRandomTaco}>Give me a random taco!</button>
                {this.state.taco === null ? '' : 
                <React.Fragment>
                    <div className="taco-shell">
                        <h1><span className="ingredient-title">Shell : </span></h1>
                        <ReactMarkdown source={this.state.taco.shell.recipe} />
                    </div>
                    <div className="taco-base">
                        <h1><span className="ingredient-title">Base : </span></h1>
                        <ReactMarkdown source={this.state.taco.base_layer.recipe} />
                    </div>
                    <div className="taco-mixin">
                        <h1><span className="ingredient-title">Mixin : </span></h1>
                        <ReactMarkdown source={this.state.taco.mixin.recipe} />
                    </div>
                    <div className="taco-seasoning">
                        <h1><span className="ingredient-title">Seasoning : </span></h1>
                        <ReactMarkdown source={this.state.taco.seasoning.recipe} />
                    </div>
                    <div className="condiment">
                        <h1><span className="ingredient-title">Condiment : </span></h1>
                        <ReactMarkdown source={this.state.taco.condiment.recipe} />
                    </div>
                </React.Fragment>
                }
                
            </div>
        )
    }
}

export default Content
