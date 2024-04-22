"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Spinner from "../../components/utils/spinner";
import { useCreateOrderMutation } from "@/redux/features/ordersApiSlice";
import { toast } from "react-toastify";
import { useState, ChangeEvent, FormEvent } from "react";

function CreateOrder() {
  const router = useRouter();
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const [formData, setFormData] = useState({
    size: "SMALL",
    quantity: 1,
  });

  const { size, quantity } = formData;

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createOrder({ size, quantity })
      .unwrap()

      .then(() => {
        toast.success("Successfully create order");
        router.push("/dashboard");
        router.refresh();
      })

      .catch(() => {
        toast.error("Failed to create order");
      });
  };

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const quantityOptions = Array.from({ length: 20 }, (_, i) => i + 1);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("auth/login");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return (
      <div className="flex flex-col justify-center">
        <h2 className="mb-10 text-4xl ">Make your order here !</h2>

        <div className="w-2/5 border rounded-box flex-col justify-center">
          <form className="flex flex-col mt-4 " onSubmit={onSubmit}>
            <div className="flex-col justify-center">
              <div className="mb-2 flex justify-center">
                <label htmlFor="size" className="font-extrabold text-xl mr-4">
                  Size{" "}
                </label>
                <select
                  id="size"
                  name="size"
                  className="rounded-md ml-6"
                  value={size}
                  onChange={onChange}
                >
                  <option value="SMALL">Small</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LARGE">Large</option>
                  <option value="EXTRA_LARGE">Extra_Large</option>
                </select>
              </div>

              <div className="mb-5 flex justify-center">
                <label
                  htmlFor="quantity"
                  className="font-extrabold text-xl mr-4"
                >
                  Quantity{" "}
                </label>
                <select
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={onChange}
                  className="w-28 mr-4 rounded-md"
                >
                  {quantityOptions.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="flex w-2/3 m-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? <Spinner sm /> : "Make order"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateOrder;
