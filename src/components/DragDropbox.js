import React from "react";

class DragDropbox extends React.Component {
  state = { isDraging: false };
  dropRef = React.createRef();

  handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    if (e.dataTransfer.items) {
      this.setState({ isDraging: true });
    }
  };

  handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter === 0) {
      this.setState({ isDraging: false });
    }
  };

  handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ isDraging: false });
    if (e.dataTransfer.files) {
      this.props.handleDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  };

  componentDidMount() {
    let dropDiv = this.dropRef.current;
    dropDiv.addEventListener("dragenter", this.handleDragIn);
    dropDiv.addEventListener("dragleave", this.handleDragOut);
    dropDiv.addEventListener("dragover", this.handleDrag);
    dropDiv.addEventListener("drop", this.handleDrop);
  }

  componentWillUnmount() {
    let dropDiv = this.dropRef.current;
    dropDiv.removeEventListener("dragenter", this.handleDragIn);
    dropDiv.removeEventListener("dragleave", this.handleDragOut);
    dropDiv.removeEventListener("dragover", this.handleDrag);
    dropDiv.removeEventListener("drop", this.handleDrop);
  }

  render() {
    return (
      <div
        style={{ display: "inline-block", position: "relative" }}
        ref={this.dropRef}
      >
        {this.state.isDraging && (
          <div
            style={{
              border: "dashed grey 4px",
              backgroundColor: "rgba(255,255,255,.8)",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 10000000,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: 0,
                left: 0,
                textAlign: "center",
                color: "grey",
                fontSize: 36,
              }}
            >
              dropping here
            </div>
          </div>
        )}
        {this.props.children}
      </div>
    );
  }
}

export default DragDropbox;
