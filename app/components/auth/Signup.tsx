"use client";
import React, { useActionState } from "react";
import Form from "next/form";
import { Loader2 } from "lucide-react";

type SignUpProps = {
  action: (
    prevState: any,
    formData: FormData
  ) => Promise<{ message: string } | undefined>;
};

const initialState = {
  message: "",
};

const Signup = ({ action }: SignUpProps) => {
  const [state, formAction, isPending] = useActionState(action, initialState);
  return (
    <Form
      action={formAction}
      className="max-w-md mx-auto my-16 p-8 bg-white rounded-lg shadow"
    >
      <h1 className="text-2xl font-bold text-center mb-2">
        Join the DEAL Revolution
      </h1>
      <p className="text-center text-sm text-amber-400 font-semibold mb-2">
        🔥 LIMITED TIME OFFER 🔥
      </p>
      <p className="text-center text-sm text-gray-600 font-semibold mb-2">
        Signup now and get 90% OFF your first order
      </p>

      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
            className="w-full px-4 py-3 border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
            placeholder="Enter your email"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="password"
            required
            className="w-full px-4 py-3 border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
            placeholder="Enter your Password"
          />
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">
            {"  "}
            🚀 Only 127 welcome bonus packages remaining
          </p>
          <p className="text-xs text-gray-500 mb-4">
            {"  "}⏰ Offer expires in : 13:45
          </p>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`w-full bg-cyan-500 text-white py-3 rounded-md hover:bg-cyan-600 transition-colors font-medium flex items-center justify-center gap-2 ${
            isPending ? "cursor-not-allowed" : ""
          }`}
        >
          {isPending ? (
            <React.Fragment>
              <Loader2 className="h-4 w-4 animate-spin" />
              CREATING...
            </React.Fragment>
          ) : (
            "CREATE ACCOUNT"
          )}
        </button>
        {state?.message && state.message.length > 0 && (
          <p className="text-center text-sm text-rose-600">{state.message}</p>
        )}
      </div>
    </Form>
  );
};

export default Signup;
