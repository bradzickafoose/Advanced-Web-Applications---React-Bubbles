import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [newColor, setNewColor] = useState(initialColor);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const addColor = event => {
    event.preventDefault();

    axiosWithAuth()
      .post('/colors', newColor)
      .then(() => {
        updateColors();
        setNewColor(initialColor);
      })
      .catch(error => console.error(error.message));
  }

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = event => {
    event.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(() => {
        updateColors();
        setColorToEdit(initialColor);
        setEditing(false);
      })
      .catch(error => console.error(error.message))
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(response => updateColors(colors.filter(color => color.id !== response.data)))
      .catch(error => console.error(error));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={event => {
                event.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={event => setColorToEdit({ ...colorToEdit, color: event.target.value })}
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={event => setColorToEdit({ ...colorToEdit, code: { hex: event.target.value } })}
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <form onSubmit={addColor}>
        <legend>add color</legend>
        <label>
          color:
          <input
            onChange={event => setNewColor({ ...newColor, color: event.target.value })}
            value={newColor.color}
          />
        </label>
        <label>
          hex:
          <input
            onChange={event => setNewColor({ ...newColor, code: { hex: event.target.value }})}
            value={newColor.code.hex}
          />
        </label>
        <div className="button-row">
            <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;
