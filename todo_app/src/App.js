import React, { useState } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [item, setItem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Math.random(),
      item,
      isComplete: false,
      edit: false,
    };
    if (item) {
      setList([...list, newItem]);
      setItem("");
    }
  };

  const editItem = (id) => {
    setList(
      list.map((it) => {
        if (it.id === id) {
          return {
            ...it,
            edit: !it.edit,
          };
        }
        return it;
      })
    );
  };

  const updateItem = (id) => {
    console.log("editing");
  };

  const checked = (id) => {
    setList(
      list.map((it) => {
        if (it.id === id) {
          return {
            ...it,
            isComplete: !it.isComplete,
          };
        }
        return it;
      })
    );
  };
  const remove = (id) => {
    setList(list.filter((el) => el.id !== id));
  };
  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <button>Add Item</button>
      </form>
      <div
        style={{
          maxHeight: "70vh",
          overflow: "scroll",
          maxWidth: "40vw",
          margin: "0 auto",
        }}
      >
        {list &&
          list
            .sort((a, b) => (a.isComplete < b.isComplete ? 1 : -1))
            .map((el) => {
              return (
                <div key={el.id}>
                  <input
                    type="checkbox"
                    onChange={() => checked(el.id)}
                  ></input>
                  <p>{el.item}</p>
                  <button onClick={() => editItem(el.id)}>Edit</button>
                  {el.edit && (
                    <div>
                      <form>
                        <input
                          type="text"
                          value={el.item}
                          onChange={() => updateItem(el.id)}
                        />
                        <button>Submit</button>
                      </form>
                    </div>
                  )}
                  <button onClick={() => remove(el.id)}>Delete</button>
                </div>
              );
            })}
      </div>
      <div>
        <button onClick={() => setList("")}>Clear Items</button>
      </div>
    </div>
  );
}

export default App;
