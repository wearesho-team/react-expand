# React Expand
[![codecov](https://codecov.io/gh/wearesho-team/react-expand/branch/master/graph/badge.svg)](https://codecov.io/gh/wearesho-team/react-expand)
[![Build Status](https://travis-ci.org/wearesho-team/react-expand.svg?branch=master)](https://travis-ci.org/wearesho-team/react-expand)

Component for controlling expand state of each elements on page.

## Usage

Somewhere in code
```jsx
<ExpandController>
    <SomeComponent/>
</ExpandController>
```
Controlling expand state
```jsx
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
### Presets

#### Expand control
```jsx
<ExpandControl
    expandId="some-id"
    // Event for triggering state change (value from exist enum list)
    triggerEvent={TriggerEvents.click}
    // New state indicator. Default value is `true`.
    state={true}
>
    // Any element
    <span>Change expand state to true on trigger event</span>
</ExpandControl>
```

#### Modal
```jsx
<ModalOpenButton modalId="some-id" {...HTMLButtonElementProps}/>
<Modal modalId="some-id" defaultOpened closeOnOutside {...HTMLDivElementProps}>
    ...
    <ModalCloseButton {...HTMLButtonElementProps}/>
</Modal>
```

#### Collapse
```jsx
<Collapse 
    controlElement={({state: boolean, onClick: () => void}) => <i className={state ? "open": "closed"} onClick={onClick}/>} 
    defaultOpened
    {...HTMLDivElementProps}
>
      ...
</Collapse>
```

#### Tabs
```jsx
<TabsController>
   <Header activeClassName="is-active" tabId="tab_1" {...HTMLDivElementProps} > // Click on header to activate according tab
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

#### Popup
```jsx
<ExpandControl expandId="popup-id" triggerEvent={TriggerEvents.hover}>
    ...
</ExpandControl>
<Popup popupId="popup-id" {...HTMLDivElementProps}>
    ...
</Popup>
```
