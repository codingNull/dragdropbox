import React from "react";
import _ from "lodash";

import DragDropbox from "./DragDropbox";

class FilesList extends React.Component {
  state = { files: [] };
  handleDrop = (files) => {
    let filesList = this.state.files;
    _.chain(files)
      .each((file) => {
        filesList.push(file.name);
      })
      .value();
    const newFiles = _.chain(filesList).compact().sort().uniq().value();
    this.setState({ files: newFiles });
  };

  renderChildren = () => {
    return (
      <div style={{ height: 300, width: 250, backgroundColor: "#ffe6e6" }}>
        {this.state.files.length ? (
          _.map(this.state.files, (file) => {
            return <div key={file}>{file}</div>;
          })
        ) : (
          <div>drag to upload</div>
        )}
      </div>
    );
  };

  render() {
    return (
      <DragDropbox handleDrop={this.handleDrop}>
        {this.renderChildren()}
      </DragDropbox>
    );
  }
}

export default FilesList;
