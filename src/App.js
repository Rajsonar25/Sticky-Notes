import React from 'react';
import "./App.css";

class App extends React.Component {
  componentDidMount() {
    this.createBox = document.getElementsByClassName("createBox")[0];
    this.notes = document.getElementsByClassName("notes")[0];
    this.input = document.getElementById("userInput");
    
    // Attach event listeners
    document.getElementById("create").addEventListener('click', this.handleCreateClick);
    this.input.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    // Clean up event listeners
    document.getElementById("create").removeEventListener('click', this.handleCreateClick);
    this.input.removeEventListener('keydown', this.handleKeyDown);
  }

  handleCreateClick = () => {
    this.createBox.style.display = "block";
    this.input.focus(); // Focus the textarea when shown
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default Enter key behavior (new line)
      const inputValue = this.input.value.trim();
      if (inputValue) {
        this.addNoteToDOM(inputValue);
        this.input.value = ""; // Clear the textarea
        this.createBox.style.display = "none";
      }
    }
  }

  addNoteToDOM = (text) => {
    const div = document.createElement("div");
    div.className = 'note';
    div.innerHTML = `<div class="details"><h3>${text}</h3></div>`;

    // Delete note on double-click
    div.addEventListener("dblclick", () => {
      div.remove();
    });

    // Fill random colors in the notes
    div.setAttribute('style', 'background:' + this.getColor());

    this.notes.appendChild(div);
  }

  getColor = () => {
    const randomColors =[    "#FF5733",    "#FF8D1A",    "#FFC300",    "#DAF7A6",    "#2ECC71",    "#1F77D0",    "#A32CC4",    "#E94E77",    "#F39C12",    "#C70039",    "#FF3377",    "#33FF77",    "#00BFFF",    "#FF1493",    "#FFD700",    "#7FFF00",    "#FF4500",    "#00CED1",    "#FF6347",    "#8A2BE2"];
      ;
    this.colorIndex = (this.colorIndex || 0) % randomColors.length;
    const color = randomColors[this.colorIndex++];
    return color;
  }

  render() {
    return (
      <>
      <div className="heading">
        Sticky Notes
      </div>
      <div className="container">
        <div className="notes">
          <div id="create">
            <i className="fa-solid fa-plus"></i>
            <div className="createBox">
              <div className="innerCreateBox">
                <textarea id="userInput" maxLength="160" placeholder="Write Here. . ."></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
}

export default App;
