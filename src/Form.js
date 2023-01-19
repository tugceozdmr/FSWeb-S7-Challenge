import React, { useState, useEffect } from "react";
import "./form.css";
import * as yup from "yup";
import pizzaPic from "./Assets/Pizza.jpg";
import axios from "axios";

let schema = yup.object().shape({
  isim: yup
    .string()
    .min(2, "İsim en az 2 karakter olmalıdır")
    .required("Required"),
  boyut: yup.string().required("Required"),
  malzeme1: yup.string().required("Required"),
  malzeme2: yup.string().required("Required"),
});

export default function Form(props) {
  const [form, setForm] = useState({
    isim: "",
    boyut: "",
    malzeme1: "false",
    malzeme2: "",
  });
  const [errors, setErrors] = useState({
    isim: "",
    boyut: "",
    malzeme1: "",
    malzeme2: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (formSubmitted) {
      schema
        .validate(form, { abortEarly: false })
        .then((valid) => {
          console.log(valid.inner);
        })
        .catch((err) => {
          const errors = {};
          err.inner.forEach((item) => {
            errors[item.path] = item.message;
          });
          setErrors(errors);
        });
    }
  }, [form, formSubmitted]);

  const handleInputChange = (event) => {
    const valueToUse =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    const fieldName = event.target.name;

    setForm({ ...form, [fieldName]: valueToUse });
  };

  const handleSubmit = (event) => {
    setFormSubmitted(true);
    event.preventDefault();

    if (schema.isValidSync(form)) {
      console.log("form", form);

      //yeni bir kullanıcı objesi
      const newUser = {
        isim: form.isim.trim(),
        boyut: form.boyut,
        malzeme1: form.malzeme1,
        malzeme2: form.malzeme2,
      };

      axios
        .post("https://reqres.in/api/user", newUser)
        .then((res) => {
          setUserId(res.data.id);

          setForm({
            isim: "",
            boyut: "",
            malzeme1: false,
            malzeme2: "",
          });
        })
        .catch((err) => {
          debugger;
        });
    } else {
      setDisabled(true);
    }
  };

  return (
    //1) id'si pizza form olan bir form tag ile başladım.
    <div className="pizzasec">
      <form id="pizza-form">
        <h1>Build Your Own Pizza: </h1>
        <img src={pizzaPic} className="pizzaPic" />

        <div className="title">
          <label htmlFor="name-input">
            <h2>Name</h2>
          </label>
          <div className="error">{errors.isim}</div>
        </div>

        <div className="form-field">
          <input
            placeholder="Name"
            id="name-input"
            name="isim"
            className="input-field"
            value={form.isim}
            onChange={handleInputChange}
          />
        </div>

        <div className="title">
          <label htmlFor="boyut">
            <h2>Choice of Size</h2>
          </label>
          <div className="error">{errors.boyut}</div>
        </div>
        <div className="form-field">
          <select
            id="size-dropdown"
            name="boyut"
            className="input-field"
            value={form.boyut}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="1">Small</option>
            <option value="2">Medium</option>
            <option value="3">Large</option>
          </select>
        </div>

        <div className="title">
          <h2>Choice of Sauce</h2>
          <div className="error">{errors.malzeme1}</div>
        </div>
        <div className="sossec">
          <label>
            <input
              type="radio"
              value={"Original Red"}
              name="malzeme1"
              checked={form.malzeme1 === "Original Red"}
              onChange={handleInputChange}
            />
            Original Red
          </label>
          <label>
            <input
              type="radio"
              value={"Garlic Ranch"}
              name="malzeme1"
              checked={form.malzeme1 === "Garlic Ranch"}
              onChange={handleInputChange}
            />
            Garlic Ranch
          </label>
          <label>
            <input
              type="radio"
              value={"BBQ Sauce"}
              name="malzeme1"
              checked={form.malzeme1 === "BBQ Sauce"}
              onChange={handleInputChange}
            />
            BBQ Sauce
          </label>
        </div>

        <div className="title">
          <h2>Add Topings</h2>
          <div className="error">{errors.malzeme2}</div>
        </div>
        <div className="topping">
          <label htmlFor="malzeme2">
            <input
              type="checkbox"
              name="malzeme2"
              id="malzeme2"
              onChange={handleInputChange}
            />
            Pepperoni
          </label>

          <label htmlFor="topping2">
            <input
              type="checkbox"
              name="topping2"
              id="topping2"
              onChange={handleInputChange}
            />
            Sausage
          </label>

          <label htmlFor="topping3">
            <input
              type="checkbox"
              id="topping3"
              name="topping3"
              onChange={handleInputChange}
            />
            Canadian Bacon
          </label>

          <label htmlFor="topping4">
            <input
              type="checkbox"
              name="topping4"
              id="topping4"
              onChange={handleInputChange}
            />
            Spinach Alfredo
          </label>

          <label htmlFor="topping5">
            <input
              type="checkbox"
              name="topping5"
              id="topping5"
              onChange={handleInputChange}
            />
            Spicy Italian Sausage
          </label>

          <label htmlFor="topping6">
            <input
              type="checkbox"
              name="topping6"
              id="topping5"
              onChange={handleInputChange}
            />
            Grilled Chicker
          </label>
        </div>

        <div className="title">
          <h2>Spacial instructions</h2>
        </div>

        <div className="title">
          <input
            type="text"
            name="pizza-form"
            placeholder="Anything else you like to add? "
          />
        </div>
        <input
          className="submit-button"
          id="order-button"
          type="submit"
          value="Siparişlere Ekle"
          onClick={handleSubmit}
          disabled={disabled}
        />
      </form>
    </div>
  );
}
