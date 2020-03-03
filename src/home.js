import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";

import App from './App';

function Home() {
  return (
    <div>
      <Switch>
        {/* If the current URL is /about, this route is rendered
            while the rest are ignored */}      
        {/* If none of the previous routes render anything,
            this route acts as a fallback.

            Important: A route with path="/" will *always* match
            the URL because all URLs begin with a /. So that's
            why we put this one last of all */}
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </div>
  );
}

export default Home;