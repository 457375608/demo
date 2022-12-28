import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import { useState } from "react";

function getListFromStorage() {
  return JSON.parse(localStorage.getItem("react-app-formData")) || [];
}

function setListToStorage(data) {
  localStorage.setItem("react-app-formData", JSON.stringify(data));
}

function App() {
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");
  const [modal, showModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    mark: false,
  });
  const [list, setList] = useState(getListFromStorage);

  const handleClose = () => {
    setFormData({
      name: "",
      link: "",
      mark: false,
    });
    showModal(false);
  };

  const handleSave = () => {
    if (formData.name === "") {
      alert("请输入网站名称");
      return;
    }
    if (formData.link === "") {
      alert("请输入网站链接");
    }
    let copyList = getListFromStorage();
    let newList = [...copyList, { ...formData, id: Date.now() }];
    setList(newList);
    setListToStorage(newList);
    handleClose();
  };

  const handleMark = (item) => {
    let { id, mark } = item;
    let index = list.findIndex((item) => item.id === id);
    let copyList = [...list];
    copyList.splice(index, 1, { ...item, mark: !mark });
    setList(copyList);
    setListToStorage(copyList);
  };

  const handleSearch = () => {
    let copyList = getListFromStorage();
    if (search) {
      let result = copyList.filter((item) => item.name === search);
      setList(result);
      setSearch("");
    } else {
      setList(copyList);
    }
  };

  const showAllLit = () => {
    let copyList = getListFromStorage();
    setList(copyList);
    setType("all");
  };

  const showMarkLit = () => {
    let copyList = getListFromStorage();
    let result = copyList.filter((item) => item.mark);
    setList(result);
    setType("mark");
  };

  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-md-8">
          <h1>React App</h1>
        </div>
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-8 pt-10">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={search}
                  onChange={(e) => setSearch(e.currentTarget.value)}
                  placeholder="请输入名称搜索"
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={handleSearch}
                >
                  搜索
                </button>
              </div>
            </div>
            <div className="col-md-4 pt-10">
              <button
                className="btn btn-primary"
                onClick={() => showModal(true)}
              >
                添加网站
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className="mb-3">
        <button
          className={`btn btn-sm ${
            type === "all" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={showAllLit}
        >
          显示全部
        </button>
        <button
          className={`btn btn-sm ${
            type === "mark" ? "btn-primary" : "btn-outline-primary"
          }`}
          style={{ marginLeft: 15 }}
          onClick={showMarkLit}
        >
          显示收藏
        </button>
      </p>

      <ul className="list-group">
        {list.length ? (
          list.map((item) => (
            <li className="list-group-item" key={item.name}>
              <a href={item.link} target="_blank" rel="noreferrer">
                {item.name}
              </a>
              <i
                className={`bi bi-bookmark ${item.mark ? "active" : ""}`}
                onClick={() => handleMark(item)}
              ></i>
            </li>
          ))
        ) : (
          <p>暂无数据</p>
        )}
      </ul>

      <div className="modal" style={{ display: modal ? "block" : "none" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">添加网站</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  名称
                </label>
                <input
                  className="form-control"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.currentTarget.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  链接
                </label>
                <input
                  className="form-control"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      link: e.currentTarget.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                取消
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
