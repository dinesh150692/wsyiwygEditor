import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {};
    this.getSelection = this.getSelection.bind(this);
    this.execCommand = this.execCommand.bind(this);
  }

  componentDidMount(){
    window.document.execCommand( "styleWithCSS", false, "true" );
  }
  getSelection(){
    let text = '';
    if (window.getSelection) {
      text = window.getSelection().toString();
      console.log(text)
    } else if (document.selection && document.selection.type !== "Control"){
      text = document.selection.createRange().text;
      console.log(text);
    }else{
      alert('no');
    }
  }

  execCommand = (command, itemValue) => {
    switch(command){
      case 'fontSize':
      case 'foreColor':
      case 'hiliteColor':
      case 'backColor':
      case 'heading':
      case 'fontName':
      case 'insertText':
      case 'insertImage':
      case 'createLink':
        this.setState({ [command]: itemValue});
        if(command === 'backColor' && !document.execCommand( "hiliteColor", false, itemValue)){  
            window.document.execCommand(command, false, itemValue);          
        }else if (command === 'fontSize'){
          window.document.execCommand(command, false, parseInt(itemValue, 10));
        }else{
          window.document.execCommand(command, false, itemValue);  
        }
        break;
      case 'cut':
      case 'bold':
      case 'copy':  
      case 'redo':
      case 'delete':
      case 'italic':
      case 'unlink':
      case 'subscript':
      case 'underline':
      case 'justifyFull':
      case 'justifyLeft':
      case 'superscript':
      case 'justifyRight':
      case 'removeFormat':
      case 'justifyCenter':
      case 'strikeThrough':
      case 'insertParagraph':
      case 'insertOrderedList':
      case 'insertUnorderedList':
      case 'insertHorizontalRule':
        window.document.execCommand( command, false, "" );
        console.log(command);                
        break;
      default:
        break;
    }

      // let value = this.state[command] ? this.state[command] : true;
        // this.setState({ [command]: !value});
        // window.document.execCommand(command, false, !value);
        // console.log(command);
        // break;
      
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <input type="button" value="B" onClick={() => this.execCommand('bold', '')}/>
          <input type="button" value="I" onClick={() => this.execCommand('italic', '')}/>
          <input type="button" value="U" onClick={() => this.execCommand('underline', '')}/>
          <input type="button" value="-S-" onClick={() => this.execCommand('strikeThrough', '')}/>
          <input type="button" value="Copy" onClick={() => this.execCommand('copy', '')}/>
          <input type="button" value="Cut" onClick={() => this.execCommand('cut', '')}/>
          <input type="button" value="Redo" onClick={() => this.execCommand('redo', '')}/>
          <input type="button" value="Delete" onClick={() => this.execCommand('delete', '')}/>
          <input type="button" value="Sub" onClick={() => this.execCommand('subscript', '')}/>
          <input type="button" value="Sup" onClick={() => this.execCommand('superscript', '')}/>
          <p>
            <label>aA</label>
          <select onChange={(event) => this.execCommand('fontSize', event.target.value)}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
          </select>
          </p>
        </header>
        <p ref={(c) => this._element = c } className="App-intro" contentEditable={true} onMouseUp={this.getSelection} onKeyDown={this.applyStyle}>
        </p>
      </div>
    );
  }
}

export default App;
