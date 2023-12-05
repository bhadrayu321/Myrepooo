import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card"; // Import the new Card component here
import Carousal from "../components/Carousal";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5001/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                {/* <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900x700/?burger"
                className="d-block w-100"
                style={{ filter: "brightness(30%)", maxHeight: "400px" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?french fries"
                className="d-block w-100"
                style={{ filter: "brightness(30%)", maxHeight: "400px" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?pizza"
                className="d-block w-100"
                style={{ filter: "brightness(30%)", maxHeight: "400px" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container">
        {foodCat.map((data) => (
          <div className="row mb-3" key={data._id}>
            <div className="fs-3 m-3">{data.CategoryName}</div>
            <hr />
            {foodItems.length > 0 ? (
              foodItems
                .filter(
                  (item) =>
                    item.CategoryName === data.CategoryName &&
                    typeof search === "string" && // Check if search is a string
                    item.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((filterItems) => (
                  <div
                    key={filterItems._id}
                    className="col-12 col-md-6 col-lg-3"
                  >
                    <Card
                      foodItem={filterItems}
                      options={filterItems.options[0]}
                      option={filterItems.options[0]}
                    />
                  </div>
                ))
            ) : (
              <div> No such data found</div>
            )}
          </div>
        ))}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
