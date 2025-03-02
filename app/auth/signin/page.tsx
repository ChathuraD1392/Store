import { getCurrentSession, loginUser, registerUser } from "@/app/actions/auth";
import Signin from "@/app/components/auth/Signin";
import Signup from "@/app/components/auth/Signup";
import { redirect } from "next/navigation";
import React from "react";
import { z } from "zod";

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

const SignInPage = async () => {
  const { user } = await getCurrentSession();

  if (user) {
    return redirect("/");
  }

  const action = async (prevState: any, formData: FormData) => {
    "use server";

    const validation = SignInSchema.safeParse(Object.fromEntries(formData));
    if (!validation.success) {
      return {
        message: "Invalid form Data",
      };
    }

    const { email, password } = validation.data;
    const { user, error } = await loginUser(email, password);
    if (error) {
      return { message: error };
    } else if (user) {
      return redirect("/");
    }
  };
  return <Signin action={action} />;
};

export default SignInPage;
