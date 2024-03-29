import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io.react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url:'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const isSearched = searchTerm => item =>
 item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list,
      searchTerm: '',
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }
  onSearchChange (event) {
    this.setState({ searchTerm: event.target.value });
  }
  
  onDismiss(id){
    const updatedList = this.state.list.filter(item => item.objectID !== id);

    this.setState({list: updatedList});
  }

  render(){
    const {searchTerm, list} = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            >
            Search
          </Search>
        </div>
        <Table
          list={list} 
          pattern={searchTerm}
          onDismiss={this.onDismiss}
          />
      </div>
    );
  }
}

const Search = ({ value, onChange,children }) =>
      <form>
        {children} <input
        type='text'
        value={value}
        onChange={onChange}
        />
      </form>
  


  class Table extends Component{
    render(){
     const {list, pattern, onDismiss} = this.props;
     return (
       <div>
         {list.filter(isSearched(pattern)).map(item=>
          <div key ={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_contents}</span>
            <span>{item.points}</span>
            <span>
              <Button onClick={() => onDismiss(item.objectID)}>
                Dismiss
              </Button>
            </span>
          </div>
        )}
       </div>
     )
    }
  }

  class Button extends Component {
    render () {
      const {
        onClick,
        className = '',
        children,
      } = this.props;

      return (
        <button
          onClick={onClick}
          className={className}
          type="button"
        >
          {children}
        </button>
      )
    }
  }

  

export default App;
