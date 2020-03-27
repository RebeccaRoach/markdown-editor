//Using Marked library to render html as markdown
const renderer = new marked.Renderer();

//To open links in new window in Codepen
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
}

//interprets breaks as new lines (explicitly change false default)
marked.setOptions({
  breaks: true,
});

//Our React component to be rendered
class MrGingerMarkDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
handleChange(event) {
  this.setState({
    markdown: event.target.value
  })
}
    
  render() {
    return (
      <div>
        <Editor
          markdown= { this.state.markdown }
          onChange= { this.handleChange } />
        <h4>...to see it displayed with html!</h4>
        <Preview
          markdown= { this.state.markdown }
          onChange= { this.handleChange } />
        <footer>Made by Becca 12/19</footer>
      </div>
    );
  }
};

//Creating Editor functional component
const Editor = (props) => {
  return (
    <textarea id="editor"
      value={ props.markdown }
      onChange={ props.onChange }
      type="text"/>
    )
}

//Creating Preview functional component
const Preview = (props) => {
  return (
  <div id="preview"
    dangerouslySetInnerHTML={
        {__html: marked(props.markdown, { renderer: renderer })
        }
    } />
  )
}

//Valid markdown text initially in editor & preview
const placeholder = 
`# Welcome to Markdown Becca's Way!

## This is a sub-heading in html ...

Be _bright_, be **bold**!

Some code, \`<div></div>\`, between backticks.

\`\`\`
// this is multi-line code:

function codeExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

Here's [links](https://www.freecodecamp.com), and
> Block Quotes!

- List items galore.
  - Some are bulleted.
     - With different indentation levels.

1. Numberered lists!
1. Use just 1s! 

* Embedded images:
![React Logo w/ Text](https://images.unsplash.com/photo-1506891536236-3e07892564b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=430&q=80)

> Tada!
`

ReactDOM.render(
  <MrGingerMarkDown/>, document.getElementById("root")
);
