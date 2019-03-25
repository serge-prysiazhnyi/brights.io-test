import React, { Component } from 'react';
import {
  Container,
} from 'react-bootstrap';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import uuid from 'uuid';

import './Slider.css';

import SliderItem from './components/slider-item/slider-item';
import Button from './components/button/button';
import generatePath from './service/generate-path';



export default class Slider extends Component {
  constructor(props){
    super(props)
    this.state = {
      items: [
        { id: uuid(), path: generatePath()},
        { id: uuid(), path: generatePath()},
        { id: uuid(), path: generatePath()},
      ],
      shift: {
        active: false,
        direction: '',
        flexDirection: ''
      }
    }
  };

  onMoveRight = () => {
    this.setState(({ shift }) => {
      let newShift = shift;
      newShift.direction = 'right';
      newShift.flexDirection = 'start';
      return {
        shift: newShift
      }
    });

    setTimeout(() => {
      this.setState(({ items }) => {
        const newItems = [...items.slice(0, items.length - 1)];
        return {
          items: newItems
        }
      })
    }, 10);

    setTimeout(() => {
      this.setState(({ items }) => {
        const newItems = [ {id: uuid(),  path: generatePath()}, ...items];
        return {
          items: newItems
        }
      })
    }, 550);
  };

  onMoveLeft = () => {
  this.setState(({ shift }) => {
    let newShift = shift;
    newShift.direction = 'left';
    newShift.flexDirection = 'end';
    return {
      shift: newShift
    }
  })

  setTimeout(() => {
    this.setState(({ items }) => {
      const newItems = [...items.slice(1, items.length)];
      return {
        items: newItems
      }
    })
  }, 10);

  setTimeout(() => {
    this.setState(({ items }) => {
      const newItems =  [...items, {id: uuid(),  path: generatePath()}];
      return {
        items: newItems
        }
      })
    }, 550);
  };

  setShiftActive = () => {
    this.setState(({ shift }) => {
      let newShift = shift;
      newShift.active = true;
      return {
        shift: newShift
      }
    });
  };

  setShiftInactive = () => {
    this.setState(({ shift }) => {
      let newShift = shift;
      newShift.active = false;
      return {
        shift: newShift
      }
    });
  };

  render() {
    const itemsContainerStyle = this.state.shift.active ? 
      `items-container shift-${this.state.shift.direction}-animation justify-content-${this.state.shift.flexDirection}`
      : 
      'items-container';
    
    const animationName = `move-${this.state.shift.direction}`;

    return(
      <Container 
        fluid='true' 
        className="d-flex flex-row justify-content-between align-items-center mx-auto mt-5"
        >
        <Button 
          onClick={this.onMoveLeft} 
          text='‹ НАЗАД' 
          btnStyle="btn-left" 
        />
        <TransitionGroup className={itemsContainerStyle}>
          {this.state.items.map(({id, path}) => (
            <CSSTransition
              key={id}
              path={path}
              timeout={500}
              classNames={animationName}
              onExited={() => this.setShiftActive()}
              onEntered={() => this.setShiftInactive()}
            >
              <SliderItem path={path}/>
            </CSSTransition>
          ))}
        </TransitionGroup>
        <Button 
          onClick={this.onMoveRight} 
          text='ДАЛІ ›' 
          btnStyle="btn-right" 
        />
      </Container>
    )
  }
}