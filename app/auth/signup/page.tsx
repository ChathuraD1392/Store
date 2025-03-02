import { getCurrentSession, loginUser, registerUser } from "@/app/actions/auth";
import Signup from "@/app/components/auth/Signup";
import { redirect } from "next/navigation";
import React from "react";
import { z } from "zod";

const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

const SignUpPage = async () => {
  const { user } = await getCurrentSession();

  if (user) {
    return redirect("/");
  }

  const action = async (prevState: any, formData: FormData) => {
    "use server";

    const validation = SignUpSchema.safeParse(Object.fromEntries(formData));
    if (!validation.success) {
      return {
        message: "Invalid form Data",
      };
    }

    const { email, password } = validation.data;
    const { user, error } = await registerUser(email, password);
    if (error) {
      return { message: error };
    } else if (user) {
      await loginUser(email, password);
      return redirect("/");
    }
  };
  return <Signup action={action} />;
};

export default SignUpPage;
