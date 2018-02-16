# React Expand

Component for controlling expand state of each elements on page.

## Usage

Somwhere in code
```JavaScript
  <ExpandController>
      <SomeComponent/>
  </ExpandController>
```
Controlling expand state
```JavaScript
  class SomeComponent extends React.Component {
    ...
    public static readonly contextTypes = ExpandControllerContextTypes;
    public readonly context: ExpandContext;
    ...
    
    public componentDidMount() {
      this.context.changeExpandState("custom-expand-string", false, {someData: "data"})();
    }
    
    public componentWillUnmount() {
      console.log(this.context.getState("custom-expand-string")); // {someData: "data"}
    }
    
    public render(): JSX.Element {
      return (
        <React.Fragment>
            button 
               onClick={this.context.changeExpandState("custom-expand-string")}
               data-expand="custom-expand-string" // you must specify `data-expand` on elements outside controlled element
            />
            <div // controlled element
              className={this.context.isExpanded("custom-expand-string") ? "visible" : "hidden"}
              data-expand="custom-expand-string"
            >
                <button onClick={this.context.changeExpandState("custom-expand-string")}/>
            </div>
        </React.Fragment>
      );
    }
  }
```
