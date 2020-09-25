import React from "react";
import { Route, Link } from "react-router-dom";

import Home from "./home";
import FileUpload from "./file-upload";
import ImageDetail from "./imageDetail";

function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          ImageGallery
        </Link>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <Link class="nav-link" to="/images">
                Images <span class="sr-only">(current)</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Route path="/" exact="true" component={FileUpload} />
      <Route path="/images" component={Home} />
      <Route path="/imageDetail/:value" component={ImageDetail} />
    </div>
  );
}

export default Header;
