import * as React from "react";
import * as ReactDOM from "react-dom";
import * as PropTypes from "prop-types";

export interface ModalContainerProps {
    activeBodyClassName: string;
}

export const ModalContainerPropTypes: {[P in keyof ModalContainerProps]: PropTypes.Validator<any>} = {
    activeBodyClassName: PropTypes.string.isRequired
};

export class ModalContainer extends React.Component<ModalContainerProps> {
    public static readonly propTypes = ModalContainerPropTypes;
    public static readonly containerId = "modal-container";

    public static modalsList: Map<string, boolean> = new Map();

    private container: HTMLDivElement;

    constructor(props) {
        super(props);

        this.container = document.createElement("div");
        this.container.id = ModalContainer.containerId;
    }

    public componentDidMount() {
        const existContainer = document.getElementById(ModalContainer.containerId) as HTMLDivElement;

        if (!existContainer) {
            document.body.appendChild(this.container);
        } else {
            this.container = existContainer;
        }

        this.setBodyClassName();
    }

    public componentWillUnmount() {
        this.shouldBeRemoved && document.body.removeChild(this.container);
    }

    public componentDidUpdate() {
        this.setBodyClassName();
    }

    public render(): React.ReactNode {
        return ReactDOM.createPortal(
            this.props.children,
            this.container
        );
    }

    protected setBodyClassName = (): void => {
        if (document.body.classList.contains(this.props.activeBodyClassName) && !this.isSomeModalOpened) {
            document.body.classList.remove(this.props.activeBodyClassName);
        }

        if (!document.body.classList.contains(this.props.activeBodyClassName) && this.isSomeModalOpened) {
            document.body.classList.add(this.props.activeBodyClassName);
        }
    }

    protected get shouldBeRemoved(): boolean {
        return this.container
            && document.body.contains(this.container)
            && !this.container.childElementCount;
    }

    protected get isSomeModalOpened(): boolean {
        return !!Array.from(ModalContainer.modalsList.values()).find((opened) => opened);
    }
}
