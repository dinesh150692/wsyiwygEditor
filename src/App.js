import React, { Component } from 'react';
import './App.css';
class App extends Component {
  constructor(){
    super();
    this.state = {
      toollist: [
        {
          name: 'bold',
          title: 'Bold',
          className: 'button fa fa-bold',
          children: null
        },
        {
          name: 'italic',
          title: 'Italic',
          className: 'button fa fa-italic',
          children: null
        },
        {
          name: 'underline',
          title: 'Underline',
          className: 'button fa fa-underline',
          children: null
        },
        {
          name: 'strikethrough',
          title: 'Strike Through',
          className: 'button fa fa-strikethrough',
          children: null
        },
        {
          name: 'copy',
          title: 'Copy',
          className: 'button fa fa-copy',
          children: null
        },
        {
          name: 'cut',
          title: 'Cut',
          className: 'button fa fa-cut',
          children: null
        },
        {
          name: 'redo',
          title: 'Redo',
          className: 'button fa fa-repeat',
          children: null
        },
        {
          name: 'subscript',
          title: 'Sub Script',
          className: 'button fa fa-subscript',
          children: null
        },
        {
          name: 'superscript',
          title: 'Super Script',
          className: 'button fa fa-superscript',
          children: null
        },
        {
          name: 'subscript',
          title: 'Sub Script',
          className: 'button fa fa-subscript',
          children: null
        },
        {
          name: 'justifyLeft',
          title: 'Justify Left',
          className: 'button fa fa-align-left',
          children: null
        },
        {
          name: 'justifyCenter',
          title: 'Justify Center',
          className: 'button fa fa-align-center',
          children: null
        },
        {
          name: 'justifyRight',
          title: 'Justify Right',
          className: 'button fa fa-align-right',
          children: null
        },
        {
          name: 'justifyFull',
          title: 'Justify Full',
          className: 'button fa fa-align-justify',
          children: null
        },
        {
          name: 'insertOrderedList',
          title: 'Ordered List',
          className: 'button fa fa-list-ol',
          children: null
        },
        {
          name: 'insertUnorderedList',
          title: 'Unordered List',
          className: 'button fa fa-list-ul',
          children: null
        },
        {
          name: 'insertImage',
          title: 'Insert Image',
          className: 'button fa fa-image',
          children: null
        },
        {
          name: 'createLink',
          title: 'Insert Link',
          className: 'button fa fa-link',
          children: null
        },
        {
          name: 'unlink',
          title: 'Unlink',
          className: 'button fa fa-unlink',
          children: null
        },
        {
          name: 'fontSize',
          title: 'Font Size',
          className: 'button fa fa-text-height width',
          children: {
            name: 'fontSize',
            value: ['---', 1,2,3,4,5,6,7]
          }
        },
        {
          name: 'foreColor',
          title: 'Font Color',
          className: 'button fa fa-font width red',
          children: {
            name: 'foreColor',
            value: ['---', 'red', 'pink','white', 'yellow', 'green', 'black', 'blue', 'orange', 'grey']
          }
        },
        {
          name: 'hiliteColor',
          title: 'Higlight Color',
          className: 'button fa fa-font width yellowBack',
          children: {
            name: 'hiliteColor',
            value: ['---', 'red', 'pink','white', 'yellow', 'green', 'black', 'blue', 'orange', 'grey']
          }
        }
      ]
    };
    this.execCommand = this.execCommand.bind(this);
  }

  // componentDidMount(){
  //   window.document.execCommand( "styleWithCSS", false, "true" );
  // }

  // getSelection(){
  //   if (window.getSelection) {
  //     // text = window.getSelection().toString();
  //   } else if (document.selection && document.selection.type !== "Control"){
  //     // text = document.selection.createRange().text;
  //   }else{
  //     alert('no');
  //   }
  // }

  execCommand(event){
    let command = event.target.name;
    switch(command){
      case 'fontSize':
      case 'foreColor':
      case 'hiliteColor':
      case 'backColor':
      case 'heading':
      case 'fontName':
      case 'insertImage':
      case 'createLink':
        let value = this.state[command] || true;
        this.setState({[command]: value});
        let itemValue = event.target.value;
        if(command === 'backColor' && !document.execCommand( "hiliteColor", false, itemValue)){  
            window.document.execCommand(command, false, itemValue);          
        }else if (command === 'fontSize'){
          window.document.execCommand(command, false, parseInt(itemValue, 10));
        }else if( command === 'insertImage' || command === 'createLink'){
          value = prompt('Enter the url for the ' + command, 'https://');
          if(value){
            window.document.execCommand(command, false, value);
          }
        }else if(command === 'hiliteColor'){
          if(itemValue !== '---'){
            window.document.execCommand(command, false, itemValue); 
          }else{
            window.document.execCommand(command, false, 'white'); 
          }
        }else if(command === 'foreColor'){
          if(itemValue !== '---'){
            window.document.execCommand(command, false, itemValue); 
          }else{
            window.document.execCommand(command, false, 'black'); 
          }

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
      case 'insertOrderedList':
      case 'insertUnorderedList':
        window.document.execCommand( command, false, "" );
        console.log(command);                
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div>
        <header className="App-header">
          {this.state.toollist.map( (item) => {
            return (<button className={item.className} title={item.title} name={item.name} onClick={item.children === null ? this.execCommand : ''}>
             { item.children !== null && Object.keys(item.children).length > 0 && 
               <select name={item.children.name} onChange={this.execCommand}>
                 {item.children.value.map( element => 
                   {
                    return (<option value={element}>{element}</option>);
                   })
                 }
               </select>
             }
           </button>
          )})
        }
        </header>
        <p ref={(c) => this._element = c } className="App-intro" contentEditable={true} onMouseUp={this.getSelection}>
        </p>
      </div>
    );
  }
}

export default App;