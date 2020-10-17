import React, {Component} from 'react';
import gotService from '../../services/gotService';
import './randomChar.css';
import Spinner from '../spinner';

export default class RandomChar extends Component {

    constructor(){
        super();
        this.updateChar();
    }

    gotService = new gotService();

    state = {
        char: {},
        loading: true
    }

    onCharLoaded = (char) => {
        this.setState ({
            char,
            loading: false
        })
    }

    updateChar() {
        const id = Math.floor(Math.random()*140 + 25);  //25 - 140
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded);
        }
    
    render() {

        const { char, loading} = this.state;
        if(loading) {
            return <Spinner/>
        }

        return (
            <div className="random-block rounded">
                <View char={char}/>
            </div>
        );
    }
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender </span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born </span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died </span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture </span>
                        <span>{culture}</span>
                    </li>
                </ul>
        </>
    )
}
