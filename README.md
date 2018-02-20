# React Expand

Component for controlling expand state of each elements on page.

## Usage

Somewhere in code
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
        <button 
          onClick={this.context.changeExpandState("custom-expand-string")}
// Highly recommended use data attribute for elements outside controlled element
          data-expand="custom-expand-string" 
        />
// In this case expand state changing on click button 
// and click on zone without data attribute "custom-expand-string"
            <div
              className={this.context.isExpanded("custom-expand-string") ? "visible" : "hidden"}
              data-expand="custom-expand-string"
            >
                <button onClick={this.context.changeExpandState("custom-expand-string")}/>
            </div>
 // In this case expand state changing only on click button
            <div data-expand-keep="more-custom-expand-string">
              <button onClick={this.context.changeExpandState("more-custom-expand-string")}/>
            </div>
        </React.Fragment>
      );
    }
  }
```
### Pesets

Modal
```JavaScript
 <ModalOpenButton modalId="some-id" {...HTMLButtonElementProps}/>
 <Modal modalId="some-id" defaultOpened closeOnOutside {...HTMLDivElementProps}>
    ...
    <ModalCloseButton {...HTMLButtonElementProps}/>
 </Modal>
```

Collapse
```JavaScript
 <Collapse 
    controlElement={({state: boolean, onClick: () => void}) => ...someComponent} 
    wrapperProps={...HTMLDivElementProps}
    defaultOpened 
 >
    ...
 </Collapse>
```

Tabs
```JavaScript
 <TabsController>
    <Header tabId="tab_1" {...HTMLDivElementProps} > // Click on header to activate according tab
      ...
    </Header>
    <Header tabId="tab_2" {...HTMLDivElementProps} >
      ...
    </Header>
    <Tab tabId="tab_1" {...HTMLDivElementProps} >
      ...
    </Tab>
    <Tab tabId="tab_2" {...HTMLDivElementProps}>
      ...
    </Tab>
 </TabsController>
```
