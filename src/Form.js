import React, { useState, useEffect } from "react";
import "./form.css";
import * as yup from "yup";
import pizzaPic from "./Assets/Pizza.jpg";

let schema = yup.object().shape({
  isim: yup.string().required("İsim en az 2 karakter olmalıdır"),
  boyut: yup.string().required("Required"),
  malzeme1: yup.string().required("Required"),
  malzeme2: yup.string().required("Required"),
});

export default function Form(props) {
  const [form, setForm] = useState({
    isim: "",
    boyut: "",
    malzeme1: "",
    malzeme2: "",
  });

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    schema.isValid(form).then((valid) => {
      setDisabled(!valid);
    });
  }, [form]);

  const handleInputChange = (event) => {
    console.log(event);
    const valueToUse =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    const fieldName = event.target.name;
    setForm({ ...form, [fieldName]: valueToUse });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("form", form);
  };

  return (
    //1) id'si pizza form olan bir form tag ile başladım.
    <div className="pizzasec">                                      
      <form id="pizza-form">
        <h1>Build Your Own Pizza: </h1>
        <img src={pizzaPic} className="pizzaPic" />

        <div className="title">
          <label htmlFor="name-input">
            <h2>İsim</h2>
          </label>
        </div>

        <div className="form-field">
          <input
            placeholder="İsim"
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
          disabled={disabled}
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}
