import React, { useState } from "react";
import foodData from "../data.json";
import "./App.css";

const App = () => {
  const [data, setData] = useState(foodData);
  console.log("Data: ", data);

  const [orderConfirmationPopup, setOrderConfirmationPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [cart, setCart] = useState(
    data.reduce((acc, item) => {
      acc[item.name] = 0;
      return acc;
    }, {})
  );

  const handleAddToCart = (itemName) => {
    setCart((prevCart) => ({
      ...prevCart,
      [itemName]: prevCart[itemName] + 1,
    }));
  };

  const handleIncrementItem = (itemName) => {
    setCart((prevCart) => ({
      ...prevCart,
      [itemName]: prevCart[itemName] + 1,
    }));
  };

  const handleDecrementItem = (itemName) => {
    setCart((prevCart) => ({
      ...prevCart,
      [itemName]: Math.max(prevCart[itemName] - 1, 0),
    }));
  };

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const handleConfirmOrder = () => {
    setOrderConfirmationPopup(true);
    console.log(cart);
    const itemsToOrder = Object.keys(cart).filter(
      (itemName) => cart[itemName] > 0
    );
    setIsOpen(true);
  };

  const handleStartNewOrder = () => {
    setOrderConfirmationPopup(false);
    setCart(
      data.reduce((acc, item) => {
        acc[item.name] = 0;
        return acc;
      }, {})
    );
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && <div className="overlay"></div>}
      <main className={`p-6 bg-[hsl(20,50%,98%)] lg:flex lg:items-start`}>
        <div>
          <header className="text-[hsl(14,65%,9%)] text-[2.5rem] md:pl-[150px] lg:pl-[23px] font-bold mb-7">
            Desserts
          </header>

          <section className="flex flex-col items-center gap-7 lg:flex-row lg:flex-wrap lg:justify-start lg:pl-6 lg:w-[915px]">
            {data.map((da) => {
              return (
                <div key={da.name}>
                  <picture>
                    <source
                      srcSet={da.image.desktop}
                      media="(min-width: 1100px)"
                      className="rounded-lg w-[100px]"
                    />
                    <source
                      srcSet={da.image.tablet}
                      media="(min-width: 600px)"
                      className="rounded-lg"
                    />
                    <img
                      src={da.image.mobile}
                      alt={`${da.image.mobile.slice(8)}`}
                      className="rounded-lg lg:w-[270px]"
                    />
                  </picture>

                  {cart[da.name] === 0 ? (
                    <div
                      onClick={() => handleAddToCart(da.name)}
                      className="cursor-pointer flex gap-2 justify-center border-[1px] border-[hsl(12,20%,44%)] bg-white w-[9rem] mx-auto relative bottom-[20px] rounded-full px-4 py-2 text-sm"
                    >
                      <img
                        src="/images/icon-add-to-cart.svg"
                        alt="icon-add-to-cart"
                      />
                      <span className="text-sm text-[hsl(14,65%,9%)] font-semibold">
                        Add to Cart
                      </span>
                    </div>
                  ) : (
                    <div className="cursor-pointer flex justify-between bg-[hsl(14,86%,42%)] w-[9rem] mx-auto relative bottom-[20px] rounded-full px-4 py-2 text-sm">
                      <img
                        src="./images/icon-decrement-quantity.svg"
                        alt="icon-decrement-quantity"
                        onClick={() => handleDecrementItem(da.name)}
                      />
                      <span className="text-[hsl(13,31%,94%)] font-semibold">
                        {cart[da.name]}
                      </span>
                      <img
                        src="./images/icon-increment-quantity.svg"
                        alt="icon-increment-quantity"
                        onClick={() => handleIncrementItem(da.name)}
                      />
                    </div>
                  )}

                  <p className="text-sm text-[hsl(12,20%,44%)] font-normal mb-[3px]">
                    {da.category}
                  </p>
                  <p className="text-[hsl(14,65%,9%)] font-semibold mb-[2px]">
                    {da.name}
                  </p>
                  <span className="text-[hsl(14,86%,42%)] font-medium">
                    ${da.price.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </section>
        </div>

        <section className="bg-white lg:w-[23rem] md:mx-auto rounded-lg p-6 mt-8 shadow-md">
          <h2 className="text-[hsl(14,86%,42%)] font-bold text-2xl">
            Your Cart ({totalItems})
          </h2>

          {totalItems === 0 ? (
            <div className="flex flex-col gap-3 justify-center items-center mt-8">
              <img
                src="/images/illustration-empty-cart.svg"
                alt="illustration-empty-cart"
              />
              <p className="text-[hsl(7,20%,60%)] font-medium">
                Your added items will appear here
              </p>
            </div>
          ) : (
            <div>
              {Object.keys(cart)
                .filter((itemName) => cart[itemName] > 0)
                .map((itemName) => (
                  <div
                    key={itemName}
                    className="flex justify-between items-center border-b-[1px] border-[hsl(13,31%,94%)] pb-3"
                  >
                    <div className="mt-4">
                      <p className="text-[hsl(14,65%,9%)] font-semibold text-sm">
                        {itemName}
                      </p>
                      <div className="mt-[1px]">
                        <span className="text-[hsl(14,86%,42%)] font-semibold text-sm">
                          {cart[itemName]}x
                        </span>
                        <span className="text-[hsl(7,20%,60%)] font-semibold text-sm ml-3">
                          @
                          {data
                            .find((item) => item.name === itemName)
                            .price.toFixed(2)}
                        </span>
                        <span className="text-[hsl(12,20%,44%)] font-semibold text-sm ml-2">
                          $
                          {(
                            data.find((item) => item.name === itemName).price *
                            cart[itemName]
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <img
                      src="./images/icon-remove-item.svg"
                      alt="icon-remove-item"
                      className="border-[1px] border-[hsl(7,20%,60%)] rounded-full w-4 h-4 cursor-pointer"
                      onClick={() => handleDecrementItem(itemName)}
                    />
                  </div>
                ))}

              <div className="flex items-center justify-between mt-2">
                <p className="text-[hsl(12,20%,44%)] font-semibold text-sm">
                  Order Total
                </p>
                <span className="text-[hsl(14,65%,9%)] font-bold text-2xl">
                  $
                  {Object.keys(cart)
                    .reduce(
                      (total, itemName) =>
                        total +
                        data.find((item) => item.name === itemName).price *
                          cart[itemName],
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-center gap-2 bg-[hsl(13,31%,94%)] py-3 rounded-sm mt-8 text-sm">
                <img
                  src="./images/icon-carbon-neutral.svg"
                  alt="icon-carbon-neutral"
                />
                <p className="text-sm text-[hsl(12,20%,44%)]">
                  This is a{" "}
                  <span className="text-sm text-[hsl(14,65%,9%)] font-semibold">
                    carbon-neutral
                  </span>{" "}
                  delivery
                </p>
              </div>

              <div>
                {totalItems > 0 && (
                  <button
                    onClick={() => handleConfirmOrder()}
                    className="w-[100%] h-[3.5rem] bg-[hsl(14,86%,42%)] text-[hsl(13,31%,94%)] cursor-pointer rounded-full mt-9 font-semibold"
                  >
                    Confirm Order
                  </button>
                )}
              </div>
            </div>
          )}
        </section>
      </main>

      {orderConfirmationPopup && (
        <div className="absolute z-50 bg-white rounded-t-lg mx-auto px-[24px] lg:px-[36px] py-[48px] sm:w-[375px] md:w-[360px] lg:w-[600px]  top-[6.5rem] lg:top-[18rem] lg:left-[23rem] md:left-[12.8rem] lg:rounded-lg md:rounded-lg">
          <img
            src="/images/icon-order-confirmed.svg"
            alt="icon-ordered-confirmed"
          />
          <h1 className="text-[hsl(14,65%,9%)] text-[2.5rem] leading-[3rem] font-bold mt-6">
            Order Confirmed
          </h1>
          <p className="text-[hsl(12,20%,44%)] mt-1">
            We hope you enjoy your food!
          </p>

          <div className="p-6 flex flex-col gap-5 bg-[hsl(20,50%,98%)] rounded-md mt-8">
            {Object.keys(cart)
              .filter((itemName) => cart[itemName] > 0)
              .map((itemName) => {
                const item = data.find((item) => item.name === itemName);
                return (
                  <div
                    className="flex items-center gap-4 border-b-[1px] border-[hsl(13,31%,94%)] pb-5"
                    key={itemName}
                  >
                    <img
                      src={
                        data.find((item) => item.name === itemName)?.image
                          .thumbnail
                      }
                      alt={`${itemName} thumbnail`}
                      className="w-[50px] rounded-md"
                    />

                    <div className="flex flex-col">
                      <p className="text-[hsl(14,65%,9%)] text-[12px] font-semibold w-[130px] sm:truncate">
                        {itemName}
                      </p>
                      <div className="flex gap-5">
                        <span className="text-[hsl(14,86%,42%)] font-semibold text-[10px]">
                          {cart[itemName]}x
                        </span>
                        <span className="text-[hsl(12,20%,44%)] text-[10px]">
                          @${item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <span className="text-[hsl(14,65%,9%)] ml-[36px] lg:ml-[14rem] font-semibold">
                      ${(item.price * cart[itemName]).toFixed(2)}
                    </span>
                  </div>
                );
              })}

            <div className="flex items-center justify-between mt-2">
              <p className="text-[hsl(12,20%,44%)] font-semibold text-sm">
                Order Total
              </p>
              <span className="text-[hsl(14,65%,9%)] font-bold text-2xl">
                $
                {Object.keys(cart)
                  .reduce(
                    (total, itemName) =>
                      total +
                      data.find((item) => item.name === itemName).price *
                        cart[itemName],
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={() => handleStartNewOrder()}
            className="w-[100%] h-[3.5rem] bg-[hsl(14,86%,42%)] text-[hsl(13,31%,94%)] cursor-pointer rounded-full mt-9 font-semibold"
          >
            Start New Order
          </button>
        </div>
      )}
    </>
  );
};

export default App;
