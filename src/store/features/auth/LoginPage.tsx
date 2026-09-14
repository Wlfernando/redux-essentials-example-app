import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";
import { userLoggedIn } from "./authSlice";

interface LoginPageFormFields extends HTMLFormControlsCollection {
  username: HTMLSelectElement;
};

interface LoginPageFormElements extends HTMLFormElement {
  readonly elements: LoginPageFormFields;
};

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);
  const nav = useNavigate();

  const onSubmit = (e: React.FormEvent<LoginPageFormElements>) => {
    e.preventDefault();

    const userName = e.currentTarget.elements.username.value;

    dispatch(userLoggedIn(userName));
    nav('/posts');
  }

  return <section>
    <h2>Welcome to Tweeter!</h2>
    <h3>Please log in:</h3>
    <form onSubmit={onSubmit}>
      <select name="username" id="username" required>
        <option value="">-----</option>
        {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
      </select>
      <button type="submit">Log In</button>
    </form>
  </section>
}