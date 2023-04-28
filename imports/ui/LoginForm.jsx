import React, { useState } from "react";
import { Meteor } from "meteor/meteor";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleForm(e) {
    e.preventDefault();

    Meteor.loginWithPassword(username, password);
  }

  return (
    <form onSubmit={handleForm} className="login-form">
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Username"
          name="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="text"
          placeholder="Password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
}
