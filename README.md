# React Expand
[![codecov](https://codecov.io/gh/wearesho-team/react-expand/branch/master/graph/badge.svg)](https://codecov.io/gh/wearesho-team/react-expand)
[![Build Status](https://travis-ci.org/wearesho-team/react-expand.svg?branch=master)](https://travis-ci.org/wearesho-team/react-expand)
[![npm](https://img.shields.io/npm/dm/react-expand.svg)](https://www.npmjs.com/package/react-expand)

Component for controlling expand state of each elements on page.

## Usage

Somewhere in code
```jsx
<ExpandController>
    <SomeComponent/>
</ExpandController>
```
Controlling expand state
```tsx
import * as React from "react";

export class SomeComponent extends React.Component {
    ...
    public static readonly contextTypes = ExpandControllerContextTypes;
    public readonly context: ExpandContext;
    ...

    public componentDidMount() {
        this.context.changeExpandState("custom-expand-string", false, { someData: "data" })();
    }

    public componentWillUnmount() {
        console.log(this.context.getState("custom-expand-string")); // {someData: "data"}
    }

    public render(): JSX.Element {
        return (
            <React.Fragment>
                <button
                    onClick={this.context.changeExpandState("custom-expand-string")}
                    // Highly recommended use data attribute 
                    // for elements outside controlled element
                    data-expand="custom-expand-string"
                />
                <div
                    // In this case expand state changing on click button 
                    // and click on zone without data attribute "custom-expand-string"
                    className={this.context.isExpanded("custom-expand-string") ? "visible" : "hidden"}
                    data-expand="custom-expand-string"
                >
                    <button onClick={this.context.changeExpandState("custom-expand-string")} />
                </div>
                <div
                    // In this case expand state changing only on click button
                    data-expand-keep="more-custom-expand-string"
                >
                    <button onClick={this.context.changeExpandState("more-custom-expand-string")} />
                </div>
            </React.Fragment>
        );
    }
}
```

### Migration from 1.x.x to 2.x.x

###### Short overview

| v1.x.x               	| v2.x.x                                                                                	|
|----------------------	|------------------------------------------------------------------------------------------	|
| < Collapse />          	| < ExpandControl /> as controlElement < ControlledExpandElement /> as < Collapse /> 	|
| < Header />           	| tabId -> expandId                                                                 	|
| < Tab />              	| tabId -> expandId                                                                 	|
| < Popup />            	| < ControlledExpandElement /> as < Popup />                                        	|
| < ModalOpenButton />  	| < ExpandControl staticState={true} /> as < ModalOpenButton />                     	|
| < ModalCloseButton /> 	| < ExpandControl staticState={false}/> as < ModalCloseButton />                    	|

#### Collapse
`Collapse` component is depricated. Use `ExpandControl` and `ControlledExpandElement` instead

##### OLD
```jsx
<Collapse 
    controlElement={({state: boolean, onClick: () => void}) => <i className={state ? "open": "closed"} onClick={onClick}/>} 
    defaultOpened
    {...HTMLDivElementProps}
>
      ...
</Collapse>
```

##### NEW
```jsx
<ExpandControl 
    {...HTMLButtonElementProps} 
    expandId="collapse-id" 
    activeClassName="is-active"
    state={{myData: true}}
    activeOnMount
>
    ...
</ExpandControl>
<ControlledExpandElement 
    {...HTMLDivElementProps} 
    expandId="collapse-id"
    closeOnOutside
>
      ...
</ControlledExpandElement>
```

#### Tabs
Prop `tabId` is depricated. Use `expandId` instead

##### OLD
```jsx
<TabsController>
   <Header activeClassName="is-active" tabId="tab_1" {...HTMLDivElementProps} >
     ...
   </Header>
   <Header tabId="tab_2" {...HTMLDivElementProps} >
     ...
   </Header>
   <Tab activeClassName="is-active" tabId="tab_1" {...HTMLDivElementProps} >
     ...
   </Tab>
   <Tab tabId="tab_2" {...HTMLDivElementProps}>
     ...
   </Tab>
</TabsController>
```

##### NEW
```jsx
<TabsController>
   <Header activeClassName="is-active" expandId="tab_1" {...HTMLDivElementProps} >
     ...
   </Header>
   <Header expandId="tab_2" {...HTMLDivElementProps} >
     ...
   </Header>
   <Tab activeClassName="is-active" expandId="tab_1" {...HTMLDivElementProps} >
     ...
   </Tab>
   <Tab expandId="tab_2" {...HTMLDivElementProps}>
     ...
   </Tab>
</TabsController>
```

#### Popup
`Popup` component is depricated. Use `ExpandControl` and `ControlledExpandElement` instead

##### OLD
```jsx
<PopupControl popupId="popup-id" triggerEvent={TriggerEvents.hover}>
    // Single component
    ...
</PopupControl>
<Popup popupId="popup-id" {...HTMLDivElementProps}>
    ...
</Popup>
```

##### NEW
```jsx
<ExpandControl 
    {...HTMLButtonElementProps} 
    expandId="popup-id" 
    triggerEvent="hover" // or "click"
    activeClassName="is-active"
>
    ...
</ExpandControl>
<ControlledExpandElement 
    {...HTMLDivElementProps} 
    expandId="popup-id" 
    closeOnOutside
>
      ...
</ControlledExpandElement>
```

#### Modal

`ModalOpenButton` and `ModalCloseButton` components is depricated. Use `ExpandControl` instead

##### OLD
```jsx
<ModalOpenButton modalId="some-id" {...HTMLButtonElementProps}/>
<Modal modalId="some-id" defaultOpened closeOnOutside {...HTMLDivElementProps}>
    ...
    <ModalCloseButton {...HTMLButtonElementProps}/>
</Modal>
```

##### NEW
```jsx
<ExpandControl expandId="some-id" staticState={true} {...HTMLButtonElementProps}/>
<Modal modalId="some-id" defaultOpened closeOnOutside {...HTMLDivElementProps}>
    ...
    <ExpandControl expandId="some-id" staticState={false} {...HTMLButtonElementProps}/>
</Modal>
<ExpandControl expandId="some-id" staticState={false} {...HTMLButtonElementProps}/> // close button actualy can be outside modal
```

### Presets

NOTE: You must provide context to child nodes with `<ExpandController>`

#### HashListener
```jsx
// will expand element with expandId 'expandElementId1' and 'expandElementId2'
// when href will be 'somepath/#expandElementId2/anotherPathIfYouWant/#expandElementId1'
<HashListener>
    <ControlledExpandElement expandId="expandElementId1"/>
    <ControlledExpandElement expandId="expandElementId2"/>
</HashListener>
```

#### HashControl
```jsx
// same as html link, except activeClassName, that binds when element with
// href, that contains expand keys, is active
<HashControl 
    {...HTMLAnchorProps}
    activeClassName="active" 
    href="somepath/#expandElementId2/anotherPathIfYouWant/#expandElementId1"
 >
   ...
</HashControl>
```

#### Tabs
```jsx
<TabsController defaultOpened="tab_2">
   <Header activeClassName="is-active" expandId="tab_1" {...HTMLDivElementProps} > // Click on header to activate according tab
     ...
   </Header>
   <Header expandId="tab_2" {...HTMLDivElementProps} >
     ...
   </Header>
   <Tab activeClassName="is-active" expandId="tab_1" {...HTMLDivElementProps} >
     ...
   </Tab>
   <Tab expandId="tab_2" {...HTMLDivElementProps}>
     ...
   </Tab>
</TabsController>
```

#### Modal
```jsx
<ExpandControl expandId="some-id" staticState={true} {...HTMLButtonElementProps}/>
<Modal modalId="some-id" defaultOpened closeOnOutside {...HTMLDivElementProps}>
    ...
    <ExpandControl expandId="some-id" staticState={false} {...HTMLButtonElementProps}/>
</Modal>
<ExpandControl expandId="some-id" staticState={false} {...HTMLButtonElementProps}/>
```

#### Expand
```jsx
<ExpandControl 
    {...HTMLButtonElementProps} 
    expandId="some-expand-id" 
    triggerEvent="hover"
    activeClassName="is-active"
    staticState={true}
>
    show
</ExpandControl>
<ExpandControl 
    {...HTMLButtonElementProps} 
    expandId="some-expand-id" 
    triggerEvent="hover"
    activeClassName="is-active"
    staticState={false}
>
    hide
</ExpandControl>
<ExpandControl 
    {...HTMLButtonElementProps} 
    expandId="some-expand-id" 
    triggerEvent="click"
    activeClassName="is-active"
    activeOnMount
>
    hide
</ExpandControl>
<ControlledExpandElement 
    {...HTMLDivElementProps} 
    expandId="some-expand-id"
>
      ...
</ControlledExpandElement>
```

#### Slider
```jsx
<SliderController autoPlay autoPlayDelay={5000}>
    <Slide disableDrag {...HTMLDivElementProps}>
        ...
    </Slide>
    // Slide that will be displayed on mount
    <Slide initial {...HTMLDivElementProps}>
        ...
    </Slide>
    <Slide dragSensitive={500} {...HTMLDivElementProps}>
        ...
    </Slide>
    <Dots {...HTMLButtonElementProps}/>
</SliderController>
<SliderController>
    <SlideButton drection={Direction.prev} {...HTMLButtonElementProps}>
        ...
    </SlideButton>
    // will render [[some banner 1, some banner 2, some banner 3], [some banner 4, some banner 5, some banner 6], [some banner 7]]
    <SlideGroup groupSize={3}>
        <span>some banner 1</span>
        <span>some banner 2</span>
        <span>some banner 3</span>
        <span>some banner 4</span>
        <span>some banner 5</span>
        <span>some banner 6</span>
        <span>some banner 7</span>
    </SlideGroup>
    <SlideButton direction={Direction.next} {...HTMLButtonElementProps}>
        ...
    </SlideButton>
    <Dots activeClassName="active" {...HTMLButtonElementProps}>
        ...
    </Dots>
</SliderController>
```

### Server-side render

Because `ReactDOM.createPortal` does not support SSR, you must modify code for correct work of `<Modal/>` component

Client side
```jsx
export class Layout extends React.Component {
    public render(): React.ReactNode {
        return (
            <ExpandController>
                <Modal modalId="some-id" defaultOpened>
                    ...
                </Modal>
            </ExpandController>
        );
    }    
}
```

Server side
```tsx
app.get("*", (request, response) => {
    ReactDOMServer.renderToNodeStream(
        <html {...htmlAttrs} data-version={version}>
            <body className={StaticContainer.childrenLength ? Modal.defaultProps.activeBodyClassName : ""}>
                <div id="app">
                    <Layout />
                </div>
                <div id={ModalContainer.containerId}>
                    {StaticContainer.renderStatic()}
                </div>
            </body>
        </html>
    ).pipe(response);
})
```

You also can use [`<StaticContainer/>`](src/Components/StaticContainer/StaticContainer.tsx) and [`<OuterContextPorvider/>`](src/Components/StaticContainer/OuterContextProvider.tsx) in your needs.
