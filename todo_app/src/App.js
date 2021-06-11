import React, { useState } from "react";
import "./App.css";

const arr = () => {
  let data = localStorage.getItem("data");
  if (data) return JSON.parse(localStorage.getItem("data"));
  else return [];
};

function App() {
  const [list, setList] = useState(arr);
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

  React.useEffect(() => {
    localStorage.setItem("data", JSON.stringify(list));
  }, [list]);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={item}
          placeholder="Enter the task"
          className="input-item"
          onChange={(e) => setItem(e.target.value)}
        />
        <button className="btn">Add Item</button>
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
                <div key={el.id} className="item">
                  <input
                    type="checkbox"
                    onChange={() => checked(el.id)}
                  ></input>
                  <p className={el.isComplete ? "complete" : ""}>{el.item}</p>

                  <i
                    className="fa fa-pencil"
                    onClick={() => editItem(el.id)}
                  ></i>
                  {el.edit && (
                    <div>
                      <form>
                        <input
                          type="text"
                          value={el.item}
                          //onChange={{(e) =>{el.item:e.target.value}}}
                        />
                        <button>Submit</button>
                      </form>
                    </div>
                  )}

                  <i className="fa fa-trash" onClick={() => remove(el.id)}></i>
                </div>
              );
            })}
      </div>
      <div>
        <button className="btn" onClick={() => setList("")}>
          Clear Items
        </button>
      </div>
    </div>
  );
}

export default App;
