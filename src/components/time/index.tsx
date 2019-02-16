import React, { Children } from 'react'
import { Component } from 'react';
import Number from '../number';


interface IProps {

}

interface IState {
    date: Date,    
}
let timeInterval = 0

export default class Time extends Component<IProps,IState> {
    
    constructor(props: IProps){
        super(props)
        this.state = {
            date: new Date(),            
        }
        
    }
    
    shouldComponentUpdate(nextProps: IProps, nextState: IState) {
        return this.state.date.getTime() !==  nextState.date.getTime()
    }

    componentDidMount() {
        this.colock()
    }

    componentWillUnmount() {    
        if (timeInterval) {
            clearTimeout(timeInterval);            
        }            
      }

    render() {
        let hour = this.state.date.getHours()    
        let minutes = this.state.date.getMinutes()
        let seconds = this.state.date.getSeconds()
        let text = `${hour}${(seconds%2) == 1 ? ':' : '|'}${minutes}`        
        return (
            <Number text={text}/>
        );
    }    

    colock = () => {
        timeInterval = setTimeout(() => {
            let date = new Date()
            this.setState({
                date,
            })      
            this.colock()
        }, 1000);        
    }    
}